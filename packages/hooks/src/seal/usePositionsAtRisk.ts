import { ReadHook } from '../hooks';
import { TRUST_LEVELS } from '../constants';
import { useAccount, useChainId, useReadContracts } from 'wagmi';
import { useCurrentUrnIndex } from './useCurrentUrnIndex';
import {
  mcdSpotAddress,
  mcdVatAbi,
  mcdVatAddress,
  sealModuleAbi,
  sealModuleAddress,
  useReadMcdSpot,
  useReadMcdVat
} from '../generated';
import { RISK_LEVEL_THRESHOLDS, RiskLevel } from '../vaults/vaults.constants';
import { stringToHex } from 'viem';
import { getEtherscanLink, math } from '@jetstreamgg/sky-utils';
import { lseDataSource } from './datasources';
import { getIlkName } from '../vaults/helpers';

export function usePositionsAtRisk(): ReadHook & { data?: number[] } {
  const { address } = useAccount();
  const chainId = useChainId();

  const {
    data: currentUrnIndex,
    isLoading: isCurrentUrnIndexLoading,
    error: currentUrnIndexError,
    mutate: refetchCurrentUrnIndex
  } = useCurrentUrnIndex();

  const urnIndices = Array.from({ length: Number(currentUrnIndex) || 0 }, (_, i) => BigInt(i));

  const {
    data,
    isLoading: isLoadingUrnAddresses,
    error: urnAddressesError,
    refetch: refetchUrnAddresses
  } = useReadContracts({
    contracts: urnIndices.map(urnIndex => ({
      chainId,
      address: sealModuleAddress[chainId as keyof typeof sealModuleAddress],
      abi: sealModuleAbi,
      functionName: 'ownerUrns',
      args: [address!, urnIndex]
    })),
    scopeKey: `urnAddresses-${address}-urnCount-${currentUrnIndex}-${chainId}`,
    allowFailure: false,
    query: {
      enabled: !!address && urnIndices.length > 0
    }
  });

  const urnAddresses = data as `0x${string}`[] | undefined;

  const ilkName = getIlkName(1);
  const ilkHex = stringToHex(ilkName, { size: 32 });

  const {
    data: vatIlkData,
    isLoading: isLoadingVatIlk,
    error: errorVatIlk,
    refetch: refetchVatIlk
  } = useReadMcdVat({
    chainId: chainId as any,
    functionName: 'ilks',
    args: [ilkHex],
    scopeKey: `vat-ilk-${ilkName}`
  });

  const {
    data: spotIlkData,
    isLoading: isLoadingSpotIlk,
    error: errorSpotIlk,
    refetch: refetchSpotIlk
  } = useReadMcdSpot({
    chainId: chainId as any,
    functionName: 'ilks',
    args: [ilkHex],
    scopeKey: `spot-ilks-${ilkName}`
  });

  const {
    data: par,
    isLoading: isLoadingSpotPar,
    error: errorSpotPar,
    refetch: refetchSpotPar
  } = useReadMcdSpot({
    chainId: chainId as any,
    functionName: 'par',
    scopeKey: 'spot-par'
  });

  const {
    data: urnsDataResponse,
    isLoading: isLoadingVatUrns,
    error: errorVatUrns,
    refetch: refetchVatUrns
  } = useReadContracts({
    contracts: urnAddresses?.map(urnAddress => ({
      chainId,
      address: mcdVatAddress[chainId as keyof typeof mcdVatAddress],
      abi: mcdVatAbi,
      functionName: 'urns',
      args: [ilkHex, urnAddress]
    })),
    scopeKey: `urnsVatData-${address}-urnCount-${currentUrnIndex}-${chainId}`,
    allowFailure: false,
    query: {
      enabled: !!address && !!urnAddresses && urnAddresses.length > 0
    }
  });

  const urnsData = urnsDataResponse as [bigint | undefined, bigint | undefined][] | undefined;

  const [, rate, spot] = vatIlkData || [];
  const [, mat] = spotIlkData || [];

  const urnsAtRisk = urnsData
    ?.map(([ink, art], i) => {
      if (
        rate === undefined ||
        spot === undefined ||
        mat === undefined ||
        ink === undefined ||
        art === undefined ||
        par === undefined
      ) {
        return;
      }

      const delayedPrice = math.delayedPrice(par, spot, mat);
      const liquidationPrice = math.liquidationPrice(ink, math.debtValue(art, rate), mat);

      if (liquidationPrice >= delayedPrice) {
        // TODO: Is the position considered as liquidated at this point,
        // or can the user still take an action to avoid being liquidated?
        return i;
      }
      const liquidationProximityPercentage =
        100 - Number(((delayedPrice - liquidationPrice) * 100n) / delayedPrice);

      const highRiskThreshold = RISK_LEVEL_THRESHOLDS.find(
        riskLevel => riskLevel.level === RiskLevel.HIGH
      )?.threshold;

      // If the risk of the urn is greater than `high`, return the urn index for the positions at risk
      if (highRiskThreshold && liquidationProximityPercentage >= highRiskThreshold) {
        return i;
      }
    })
    .filter(urnIndex => urnIndex !== undefined) as number[] | undefined;

  const isLoading =
    isCurrentUrnIndexLoading ||
    isLoadingUrnAddresses ||
    isLoadingVatIlk ||
    isLoadingSpotIlk ||
    isLoadingSpotPar ||
    isLoadingVatUrns;

  const error =
    currentUrnIndexError || urnAddressesError || errorVatIlk || errorSpotIlk || errorSpotPar || errorVatUrns;

  return {
    data: urnsAtRisk,
    isLoading,
    error,
    mutate: () => {
      refetchCurrentUrnIndex();
      refetchUrnAddresses();
      refetchVatIlk();
      refetchSpotIlk();
      refetchSpotPar();
      refetchVatUrns();
    },
    dataSources: [
      lseDataSource(chainId, 'ownerUrns'),
      {
        title: 'MCD_VAT Contract. (ilks, urns)',
        onChain: true,
        href: getEtherscanLink(chainId, mcdVatAddress[chainId as keyof typeof mcdVatAddress], 'address'),
        trustLevel: TRUST_LEVELS[0]
      },
      {
        title: 'MCD_SPOT Contract. (par, ilks)',
        onChain: true,
        href: getEtherscanLink(chainId, mcdSpotAddress[chainId as keyof typeof mcdSpotAddress], 'address'),
        trustLevel: TRUST_LEVELS[0]
      }
    ]
  };
}
