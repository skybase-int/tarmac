import { useAccount, useChainId } from 'wagmi';
import { lsMigratorAddress, stakeModuleAddress, useReadStakeModuleIsUrnAuth } from '../generated';
import { ReadHook, ReadHookParams } from '../hooks';
import { ZERO_ADDRESS } from '../constants';
import { lseDataSource } from '../seal/datasources';

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

  const enabled =
    isConnected && paramEnabled && !!address && address !== ZERO_ADDRESS && urnIndex !== undefined;

  const {
    data: isUrnAuth,
    refetch,
    isLoading,
    error
  } = useReadStakeModuleIsUrnAuth({
    //TODO: remove address property after address is correctly added to  generated file
    address: stakeModuleAddress[chainId as keyof typeof stakeModuleAddress],
    args: [
      address || ZERO_ADDRESS,
      urnIndex || 0n,
      lsMigratorAddress[chainId as keyof typeof lsMigratorAddress]
    ],
    query: {
      enabled
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
