import { useAccount, useChainId } from 'wagmi';
import { useReadSealModuleIsUrnAuth } from '../generated';
import { ReadHook, ReadHookParams } from '../hooks';
import { ZERO_ADDRESS } from '../constants';
import { MIGRATOR_CONTRACT } from './useSaHope';
import { lseDataSource } from './datasources';

export type Response = ReadHook & {
  data?: boolean;
};

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
  } = useReadSealModuleIsUrnAuth({
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
    dataSources: [lseDataSource(chainId, 'isUrnAuth')]
  };
}
