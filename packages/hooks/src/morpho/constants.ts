import { usdcClearstarBoringVaultAddress, usdsRiskCapitalVaultAddress } from '../generated';
import { TOKENS } from '../tokens/tokens.constants';
import { MorphoVaultConfig } from './morpho';

export const MORPHO_API_URL = 'https://api.morpho.org/graphql';
export const MERKL_API_URL = 'https://api.merkl.xyz/v4';

/**
 * Market ID for the stUSDS/USDS market that the USDS Risk Capital vault allocates to
 */
export const USDS_RISK_CAPITAL_MARKET_ID =
  '0x77e624dd9dd980810c2b804249e88f3598d9c7ec91f16aa5fbf6e3fdf6087f82' as const;

export const CLEARSTAR_BORING_USDC_MARKET_IDS = [
  '0x64d65c9a2d91c36d56fbc42d69e979335320169b3df63bf92789e2c8883fcc64', // cbBTC/USDC
  '0xb323495f7e4148be5643a4ea4a8221eef163e4bccfdedc2a6f4696baacbc86cc', // wstETH/USDC
  '0x3a85e619751152991742810df6ec69ce473daef99e28a64ab2340d7b7ccfee49' // WBTC/USDC
] as const;

export enum MorphoAdapterType {
  MetaMorpho = 'MetaMorpho',
  MorphoMarketV1 = 'MorphoMarketV1'
}

export enum MorphoTransactionType {
  Deposit = 'Deposit',
  Withdraw = 'Withdraw'
}

/**
 * List of all supported Morpho vaults
 * To add a new vault, simply add a new entry to this array
 */
export const MORPHO_VAULTS: MorphoVaultConfig[] = [
  {
    name: 'USDS Risk Capital',
    vaultAddress: usdsRiskCapitalVaultAddress,
    assetToken: TOKENS.usds,
    marketIds: [USDS_RISK_CAPITAL_MARKET_ID]
  },
  {
    name: 'Clearstar Boring USDC',
    vaultAddress: usdcClearstarBoringVaultAddress,
    assetToken: TOKENS.usdc,
    marketIds: CLEARSTAR_BORING_USDC_MARKET_IDS
  }
  // Add more vaults here as needed:
  // {
  //   name: 'Another Vault Name',
  //   vaultAddress: anotherVaultAddress,
  //   assetToken: TOKENS.usds,
  //   marketIds: ['0x...']
  // }
];

/**
 * Get a Morpho vault config by its address for a specific chain
 */
export function getMorphoVaultByAddress(
  address: `0x${string}`,
  chainId: number
): MorphoVaultConfig | undefined {
  return MORPHO_VAULTS.find(vault => vault.vaultAddress[chainId]?.toLowerCase() === address.toLowerCase());
}

/**
 * Minimal ABI for MorphoVaultV1Adapter to read the underlying V1 vault address and real assets.
 */
export const MORPHO_VAULT_V1_ADAPTER_ABI = [
  {
    inputs: [],
    name: 'morphoVaultV1',
    outputs: [{ type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'realAssets',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  }
] as const;

/**
 * Minimal ABI for MorphoMarketV1Adapter to read market IDs and real assets.
 * Each adapter can allocate to multiple markets.
 */
export const MORPHO_MARKET_V1_ADAPTER_ABI = [
  {
    inputs: [],
    name: 'marketIdsLength',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ type: 'uint256' }],
    name: 'marketIds',
    outputs: [{ type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'realAssets',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'bytes32', name: 'marketId', type: 'bytes32' }],
    name: 'expectedSupplyAssets',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  }
] as const;

/**
 * GraphQL query for Morpho V2 vault adapters.
 * V2 vaults allocate to V1 vaults through adapters.
 */
export const VAULT_V2_ADAPTERS_QUERY = `
  query VaultV2Adapters($address: String!, $chainId: Int!) {
    vaultV2ByAddress(address: $address, chainId: $chainId) {
      address
      symbol
      asset {
        symbol
        decimals
      }
      totalAssets
      totalAssetsUsd
      idleAssetsUsd
      adapters {
        items {
          address
          assets
          assetsUsd
          type
        }
      }
    }
  }
`;

/**
 * GraphQL query for Morpho V1 vault basic data (name, symbol, net APY).
 */
export const VAULT_V1_BASIC_DATA_QUERY = `
  query VaultV1BasicData($address: String!, $chainId: Int!) {
    vaultByAddress(address: $address, chainId: $chainId) {
      address
      name
      symbol
      state {
        netApy
      }
    }
  }
`;

/**
 * GraphQL query for Morpho market data.
 */
export const MARKET_DATA_QUERY = `
  query MarketData($marketId: String!, $chainId: Int!) {
    marketByUniqueKey(uniqueKey: $marketId, chainId: $chainId) {
      uniqueKey
      lltv
      loanAsset {
        symbol
      }
      collateralAsset {
        symbol
      }
      state {
        supplyAssets
        borrowAssets
        utilization
        avgNetSupplyApy
      }
    }
  }
`;

/**
 * GraphQL query for Morpho V2 vault transactions (deposits and withdrawals).
 */
export const VAULT_V2_TRANSACTIONS_QUERY = `
  query VaultV2Transactions(
    $chainId: Int!
    $userAddress: String!
    $vaultAddresses: [String!]!
  ) {
    vaultV2transactions(
      orderBy: Time
      orderDirection: Desc
      where: {
        chainId_in: [$chainId]
        userAddress_in: [$userAddress]
        vaultAddress_in: $vaultAddresses
        type_in: [Deposit, Withdraw]
      }
    ) {
      items {
        vault {
          address
          asset {
            symbol
            decimals
          }
        }
        type
        timestamp
        txHash
        data {
          ... on VaultV2DepositData {
            assets
          }
          ... on VaultV2WithdrawData {
            assets
          }
        }
      }
    }
  }
`;

export const VAULT_V2_HISTORICAL_QUERY = `
  query VaultV2History($address: String!, $chainId: Int!, $endTimestamp: Int!) {
    vaultV2ByAddress(address: $address, chainId: $chainId) {
      historicalState {
        totalAssets(options: { startTimestamp: 0, endTimestamp: $endTimestamp, interval: DAY }) {
          x
          y
        }
        avgNetApy(options:{ startTimestamp: 0, endTimestamp: $endTimestamp, interval: DAY }) {
          x
          y
        }
      }
    }
  }
`;

/**
 * GraphQL query for Morpho V2 vault positions (depositors) with pagination.
 * Includes shares to filter for active suppliers client-side (API doesn't support where clause).
 */
export const VAULT_V2_POSITIONS_QUERY = `
  query VaultV2Positions($address: String!, $chainId: Int!, $first: Int!, $skip: Int!) {
    vaultV2ByAddress(address: $address, chainId: $chainId) {
      positions(first: $first, skip: $skip) {
        items {
          user {
            address
          }
          shares
        }
      }
    }
  }
`;

const MARKET_FIELDS = `
  uniqueKey
  lltv
  loanAsset { symbol }
  collateralAsset { symbol }
  state {
    supplyAssets
    borrowAssets
    utilization
    avgNetSupplyApy
  }
`;

/**
 * Build a GraphQL query that fetches vault data (rate + adapters) and multiple markets
 * in a single API request using aliases.
 */
export function buildMultiMarketVaultDataQuery(marketCount: number): string {
  const marketParams = Array.from({ length: marketCount }, (_, i) => `$marketId_${i}: String!`).join(', ');
  const marketQueries = Array.from(
    { length: marketCount },
    (_, i) => `
    market_${i}: marketByUniqueKey(uniqueKey: $marketId_${i}, chainId: $chainId) {
      ${MARKET_FIELDS}
    }`
  ).join('');

  return `
    query VaultMultiMarketData($vaultAddress: String!, $chainId: Int!, ${marketParams}) {
      vaultV2ByAddress(address: $vaultAddress, chainId: $chainId) {
        avgApy
        avgNetApy
        performanceFee
        managementFee
        rewards {
          supplyApr
          asset {
            symbol
            logoURI
          }
        }
        totalAssets
        totalAssetsUsd
        idleAssetsUsd
        liquidity
        asset {
          decimals
          symbol
        }
        liquidityAdapter {
          address
        }
      }
      ${marketQueries}
    }
  `;
}

/**
 * Combined GraphQL query for vault rate data and market allocation data.
 * Fetches everything in a single request for optimized performance.
 */
export const VAULT_DATA_QUERY = `
  query VaultData($vaultAddress: String!, $marketId: String!, $chainId: Int!) {
    vaultV2ByAddress(address: $vaultAddress, chainId: $chainId) {
      avgApy
      avgNetApy
      performanceFee
      managementFee
      rewards {
        supplyApr
        asset {
          symbol
          logoURI
        }
      }
      totalAssets
      totalAssetsUsd
      idleAssetsUsd
      liquidity
      asset {
        decimals
        symbol
      }
    }
    marketByUniqueKey(uniqueKey: $marketId, chainId: $chainId) {
      uniqueKey
      lltv
      loanAsset {
        symbol
      }
      collateralAsset {
        symbol
      }
      state {
        supplyAssets
        borrowAssets
        utilization
        avgNetSupplyApy
      }
    }
  }
`;
