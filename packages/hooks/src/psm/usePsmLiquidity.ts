import { usdsBaseAddress, usdcBaseAddress, sUsdsBaseAddress } from '../generated';
import { useChainId } from 'wagmi';
import { ReadHook } from '../hooks';
import { useReadPsm3BasePocket } from '../generated';
import { useTokenBalance } from '../tokens/useTokenBalance';
import { TokenBalance } from '../tokens/useTokenBalance';

export type PsmLiquidityHookResponse = ReadHook & {
  data?: { usdc: TokenBalance | undefined; usds: TokenBalance | undefined; susds: TokenBalance | undefined };
};

export function usePsmLiquidity(): PsmLiquidityHookResponse {
  const chainId = useChainId();
  const {
    data: pocketAddress,
    isLoading: pocketLoading,
    error: pocketError,
    refetch: mutatePocket
  } = useReadPsm3BasePocket();
  const {
    data: usdcBalance,
    isLoading: usdcLoading,
    error: usdcError,
    refetch: mutateUsdc
  } = useTokenBalance({
    chainId,
    token: usdcBaseAddress[chainId as keyof typeof usdcBaseAddress],
    address: pocketAddress,
    enabled: !!pocketAddress
  });
  const {
    data: usdsBalance,
    isLoading: usdsLoading,
    error: usdsError,
    refetch: mutateUsds
  } = useTokenBalance({
    chainId,
    token: usdsBaseAddress[chainId as keyof typeof usdsBaseAddress],
    address: pocketAddress,
    enabled: !!pocketAddress
  });
  const {
    data: susdsBalance,
    isLoading: susdsLoading,
    error: susdsError,
    refetch: mutateSusds
  } = useTokenBalance({
    chainId,
    token: sUsdsBaseAddress[chainId as keyof typeof sUsdsBaseAddress],
    address: pocketAddress,
    enabled: !!pocketAddress
  });

  return {
    data: {
      usdc: usdcBalance || undefined,
      usds: usdsBalance || undefined,
      susds: susdsBalance || undefined
    },
    isLoading: pocketLoading || usdcLoading || usdsLoading || susdsLoading,
    error: pocketError || usdcError || usdsError || susdsError,
    mutate: () => {
      mutatePocket();
      mutateUsdc();
      mutateUsds();
      mutateSusds();
    },
    dataSources: []
  };
}
