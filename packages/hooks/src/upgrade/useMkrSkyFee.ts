import { useReadContract } from 'wagmi';
import { mkrSkyAbi, mkrSkyAddress } from '../generated';
import { useChainId } from 'wagmi';

/**
 * Hook to fetch the current fee from the mkrSky contract
 * The fee is a WAD-scaled fraction (0 to 1e18) that determines the upgrade penalty
 * @returns The current fee value used to calculate the delayed upgrade penalty
 */
export function useMkrSkyFee() {
  const chainId = useChainId();

  return useReadContract({
    address: mkrSkyAddress[chainId as keyof typeof mkrSkyAddress],
    abi: mkrSkyAbi,
    functionName: 'fee',
    chainId,
    query: {
      // Cache for 1 minute since fee changes are rare (governance controlled)
      staleTime: 60 * 1000,
      refetchInterval: 60 * 1000,
      // Enable refetch on window focus to ensure fee is current
      refetchOnWindowFocus: true
    }
  });
}
