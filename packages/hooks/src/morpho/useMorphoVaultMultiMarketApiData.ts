import { useQuery } from '@tanstack/react-query';
import { useChainId, usePublicClient } from 'wagmi';
import { TRUST_LEVELS, TrustLevelEnum } from '../constants';
import { ReadHook } from '../hooks';
import {
  MORPHO_API_URL,
  MORPHO_MARKET_V1_ADAPTER_ABI,
  buildMultiMarketVaultDataQuery,
  getMorphoVaultByAddress
} from './constants';
import { isTestnetId, formatBigInt, formatNumber, formatPercent } from '@jetstreamgg/sky-utils';
import { mainnet } from 'viem/chains';
import { PublicClient } from 'viem';
import type {
  MorphoIdleLiquidityAllocation,
  MorphoMarketAllocation,
  MorphoVaultAllocationsData
} from './morpho';
import type { MorphoRewardData, MorphoVaultRateData } from './useMorphoVaultRateApiData';

/**
 * Market data shape returned by the Morpho API
 */
type MarketApiData = {
  uniqueKey: string;
  lltv: string;
  loanAsset: { symbol: string };
  collateralAsset: { symbol: string };
  state: {
    supplyAssets: string;
    borrowAssets: string;
    utilization: number;
    avgNetSupplyApy: number;
  };
} | null;

/**
 * API response type for the multi-market vault data query
 */
type MorphoVaultMultiMarketApiResponse = {
  data: {
    vaultV2ByAddress: {
      avgApy: number;
      avgNetApy: number;
      performanceFee: number;
      managementFee: number;
      rewards: {
        supplyApr: number;
        asset: {
          symbol: string;
          logoURI: string | null;
        };
      }[];
      totalAssets: string;
      totalAssetsUsd: number;
      idleAssetsUsd: number;
      liquidity: string;
      asset: {
        decimals: number;
        symbol: string;
      };
      liquidityAdapter: {
        address: string;
      };
    } | null;
    [key: string]: unknown;
  };
};

/**
 * Multi-market vault data including rate and market state information
 */
export type MorphoVaultMultiMarketData = {
  /** Rate data (APY, fees, rewards) */
  rate: MorphoVaultRateData;
  /** Market state data (liquidity, utilization, idle assets) */
  market: MorphoVaultAllocationsData;
  /** Vault-level available liquidity from the API */
  liquidity: bigint;
};

export type MorphoVaultMultiMarketDataHook = ReadHook & {
  data?: MorphoVaultMultiMarketData;
};

/**
 * Fetch multi-market vault data (rate + allocations) using a single API call
 * and on-chain reads for per-market allocation via expectedSupplyAssets.
 */
async function fetchMorphoVaultMultiMarketData(
  vaultAddress: string,
  marketIds: readonly string[],
  chainId: number,
  publicClient: PublicClient
): Promise<MorphoVaultMultiMarketData | undefined> {
  // Build dynamic query for N markets
  const query = buildMultiMarketVaultDataQuery(marketIds.length);
  const variables: Record<string, string | number> = {
    vaultAddress: vaultAddress.toLowerCase(),
    chainId
  };
  marketIds.forEach((id, i) => {
    variables[`marketId_${i}`] = id;
  });

  const response = await fetch(MORPHO_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query, variables })
  });

  if (!response.ok) {
    throw new Error(`Morpho API error: ${response.status}`);
  }

  const result: MorphoVaultMultiMarketApiResponse = await response.json();

  if (!result.data.vaultV2ByAddress) {
    return undefined;
  }

  const vault = result.data.vaultV2ByAddress;

  // --- Process rate data ---
  const { avgApy, avgNetApy, managementFee, performanceFee, rewards } = vault;

  const rewardsMap = new Map<string, { apy: number; logoUri: string | null }>();
  for (const reward of rewards || []) {
    if (reward.supplyApr > 0) {
      const existing = rewardsMap.get(reward.asset.symbol);
      if (existing) {
        existing.apy += reward.supplyApr;
      } else {
        rewardsMap.set(reward.asset.symbol, {
          apy: reward.supplyApr,
          logoUri: reward.asset.logoURI
        });
      }
    }
  }

  const rewardsData: MorphoRewardData[] = Array.from(rewardsMap.entries()).map(([symbol, data]) => ({
    apy: data.apy,
    formattedApy: `+${(data.apy * 100).toFixed(2)}%`,
    symbol,
    logoUri: data.logoUri
  }));

  const rateData: MorphoVaultRateData = {
    rate: avgApy,
    netRate: avgNetApy,
    managementFee,
    performanceFee,
    formattedRate: `${(avgApy * 100).toFixed(2)}%`,
    formattedNetRate: `${(avgNetApy * 100).toFixed(2)}%`,
    formattedManagementFee: `${(managementFee * 100).toFixed(0)}%`,
    formattedPerformanceFee: `${(performanceFee * 100).toFixed(0)}%`,
    rewards: rewardsData
  };

  // --- Process allocation data ---
  const { totalAssets, totalAssetsUsd, idleAssetsUsd, asset, liquidityAdapter } = vault;
  const assetDecimals = asset.decimals;
  const assetSymbol = asset.symbol;

  // Calculate idle liquidity
  const idleAssets =
    idleAssetsUsd > 0 && totalAssetsUsd > 0
      ? (BigInt(totalAssets) * BigInt(Math.round(idleAssetsUsd * 1e6))) /
        BigInt(Math.round(totalAssetsUsd * 1e6))
      : BigInt(0);

  const idleLiquidity: MorphoIdleLiquidityAllocation[] = [
    {
      assetSymbol,
      formattedAssets: formatBigInt(idleAssets, { unit: assetDecimals, compact: true }),
      formattedAssetsUsd: `$${formatNumber(idleAssetsUsd, { compact: true })}`
    }
  ];

  // Extract market data from aliased response fields
  const marketDataMap = new Map<string, NonNullable<MarketApiData>>();
  for (let i = 0; i < marketIds.length; i++) {
    const market = result.data[`market_${i}`] as MarketApiData;
    if (market) {
      marketDataMap.set(market.uniqueKey, market);
    }
  }

  // Read per-market allocation from the single liquidity adapter via expectedSupplyAssets
  const adapterAddress = liquidityAdapter.address as `0x${string}`;
  const assetPriceUsd = totalAssetsUsd > 0 ? totalAssetsUsd / Number(totalAssets) : 0;

  const expectedSupplyResults = await publicClient.multicall({
    contracts: marketIds.map(marketId => ({
      address: adapterAddress,
      abi: MORPHO_MARKET_V1_ADAPTER_ABI,
      functionName: 'expectedSupplyAssets' as const,
      args: [marketId] as readonly [`0x${string}`]
    }))
  });

  // Build a map of marketId → (expectedSupplyAssets, expectedSupplyAssetsUsd)
  const marketAllocationMap = new Map<string, { supplyAssets: bigint; supplyAssetsUsd: number }>();
  marketIds.forEach((marketId, i) => {
    const result = expectedSupplyResults[i];
    if (result.status === 'success') {
      const supplyAssets = result.result as bigint;
      marketAllocationMap.set(marketId, {
        supplyAssets,
        supplyAssetsUsd: Number(supplyAssets) * assetPriceUsd
      });
    }
  });

  // Build market allocations
  const markets: MorphoMarketAllocation[] = [];

  for (const configuredMarketId of marketIds) {
    const marketData = marketDataMap.get(configuredMarketId);
    if (!marketData) continue;

    const totalSupplyAssets = BigInt(marketData.state.supplyAssets);
    const totalBorrowAssets = BigInt(marketData.state.borrowAssets);
    const liquidity = totalSupplyAssets - totalBorrowAssets;

    const allocation = marketAllocationMap.get(configuredMarketId);
    const vaultAssets = allocation?.supplyAssets ?? BigInt(0);
    const vaultAssetsUsd = allocation?.supplyAssetsUsd ?? 0;

    markets.push({
      marketId: marketData.uniqueKey,
      marketUniqueKey: marketData.uniqueKey,
      loanAsset: marketData.loanAsset.symbol,
      collateralAsset: marketData.collateralAsset.symbol,
      formattedAssets: formatBigInt(vaultAssets, { unit: assetDecimals, compact: true }),
      formattedAssetsUsd: `$${formatNumber(vaultAssetsUsd, { compact: true })}`,
      formattedNetApy: `${(marketData.state.avgNetSupplyApy * 100).toFixed(2)}%`,
      totalSupplyAssets,
      totalBorrowAssets,
      liquidity,
      utilization: marketData.state.utilization,
      lltv: BigInt(marketData.lltv),
      formattedLltv: formatPercent(BigInt(marketData.lltv), {
        maxDecimals: 0,
        showPercentageDecimals: false
      })
    });
  }

  // Sort markets by vault allocation (highest first)
  markets.sort((a, b) => {
    const aAlloc = marketAllocationMap.get(a.marketId)?.supplyAssets ?? 0n;
    const bAlloc = marketAllocationMap.get(b.marketId)?.supplyAssets ?? 0n;
    return Number(bAlloc - aAlloc);
  });

  const allocationsData: MorphoVaultAllocationsData = {
    v1Vaults: [],
    markets,
    idleLiquidity,
    assetSymbol
  };

  return {
    rate: rateData,
    market: allocationsData,
    liquidity: BigInt(vault.liquidity)
  };
}

/**
 * Hook for fetching Morpho vault data (rate + multiple market allocations) from the Morpho API.
 *
 * This is an optimized hook that fetches vault rate data and market allocation data
 * in a single API call using a dynamic GraphQL query with aliases. It reads
 * expectedSupplyAssets from the vault's liquidity adapter for per-market allocation.
 *
 * Note: This hook requires the vault to be configured in MORPHO_VAULTS with marketIds.
 *
 * @param vaultAddress - The Morpho V2 vault contract address (optional)
 */
export function useMorphoVaultMultiMarketApiData({
  vaultAddress
}: {
  vaultAddress?: `0x${string}`;
}): MorphoVaultMultiMarketDataHook {
  const connectedChainId = useChainId();
  // Always use mainnet for the Morpho API query, but use the connected chain for on-chain reads
  const chainId = isTestnetId(connectedChainId) ? mainnet.id : connectedChainId;
  const publicClient = usePublicClient({ chainId });
  const vaultConfig = vaultAddress ? getMorphoVaultByAddress(vaultAddress, chainId) : undefined;

  const {
    data,
    error,
    refetch: mutate,
    isLoading
  } = useQuery({
    queryKey: ['morpho-vault-multi-market-data', vaultAddress, chainId],
    queryFn: () => {
      if (!vaultAddress || !vaultConfig?.marketIds?.length) {
        throw new Error(
          `Vault ${vaultAddress} not found in MORPHO_VAULTS configuration or missing marketIds`
        );
      }
      if (!publicClient) {
        throw new Error('Public client not available');
      }
      return fetchMorphoVaultMultiMarketData(vaultAddress, vaultConfig.marketIds, chainId, publicClient);
    },
    enabled: !!vaultAddress && !!vaultConfig?.marketIds?.length && !!publicClient,
    staleTime: 30_000, // 30 seconds - liquidity data can change frequently
    gcTime: 60_000 // 1 minute
  });

  const configError =
    vaultAddress && !vaultConfig?.marketIds?.length && !isLoading
      ? new Error(`Vault ${vaultAddress} not found in MORPHO_VAULTS configuration or missing marketIds`)
      : null;

  return {
    data,
    isLoading: !data && isLoading,
    error: (error as Error | null) || configError,
    mutate,
    dataSources: [
      {
        title: 'Morpho API',
        href: MORPHO_API_URL,
        onChain: false,
        trustLevel: TRUST_LEVELS[TrustLevelEnum.TWO]
      }
    ]
  };
}
