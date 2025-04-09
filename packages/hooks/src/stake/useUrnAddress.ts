import { useAccount, useChainId, useReadContract } from 'wagmi';
import { ReadHook } from '../hooks';
// TODO: Update this import to the correct address once the contract is deployed
import { stakeModuleAbi, sealModuleAddress as stakeModuleAddress } from '../generated';
import { stakeDataSource } from './datasources';

type UseUrnAddressResponse = ReadHook & {
  data?: `0x${string}`;
};

export function useUrnAddress(urnIndex: bigint): UseUrnAddressResponse {
  const chainId = useChainId();
  const { address } = useAccount();

  const dataSource = stakeDataSource(chainId, 'getUrn');

  const { data, isLoading, error, refetch } = useReadContract({
    chainId,
    address: stakeModuleAddress[chainId as keyof typeof stakeModuleAddress],
    abi: stakeModuleAbi,
    functionName: 'ownerUrns',
    args: [address!, urnIndex],
    scopeKey: `urnAddress-${address}-${urnIndex}-${chainId}`,
    query: {
      enabled: !!address
    }
  });
  return {
    data,
    isLoading,
    error,
    mutate: refetch,
    dataSources: [dataSource]
  };
}
