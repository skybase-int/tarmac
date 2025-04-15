import { useAccount, useChainId } from 'wagmi';
import { useReadStakeModuleIsUrnAuth } from '../generated';
import { ReadHook, ReadHookParams } from '../hooks';
import { ZERO_ADDRESS } from '../constants';
import { lseDataSource } from '../seal/datasources';

export type Response = ReadHook & {
  data?: boolean;
};

// TODO: temp hardcoded address, get the real one when it's available
export const MIGRATOR_CONTRACT = '0x7Ac6E2b9ea61e2E587A06e083E4373918071dCfc';

export function useIsUrnAuth({
  urnIndex,
  enabled: paramEnabled = true
}: ReadHookParams & {
  urnIndex?: bigint;
}): Response {
  const { isConnected, address } = useAccount();
  const chainId = useChainId();

  const enabled = isConnected && paramEnabled && !!address && address !== ZERO_ADDRESS;

  const {
    data: isUrnAuth,
    refetch,
    isLoading,
    error
  } = useReadStakeModuleIsUrnAuth({
    args: [address || ZERO_ADDRESS, urnIndex || 0n, MIGRATOR_CONTRACT],
    query: {
      enabled: enabled && !!address && !!urnIndex
      // staleTime: 30_000
    }
  });

  return {
    data: isUrnAuth,
    mutate: refetch,
    isLoading,
    error,
    // TODO: update this for stake datasources
    dataSources: [lseDataSource(chainId, 'isUrnAuth')]
  };
}
