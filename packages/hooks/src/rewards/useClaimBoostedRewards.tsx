import { useAccount, useChainId } from 'wagmi';
import { merkleDistributorAbi, merkleDistributorAddress } from '../generated';
import { useWriteContractFlow } from '../shared/useWriteContractFlow';
import { WriteHook, WriteHookParams } from '../hooks';
import { BoostedRewardsData } from './rewards';

export function useClaimBoostedRewards({
  address: paramAddress,
  boostedRewardsData,
  gas,
  enabled: paramEnabled = true,
  onStart = () => null,
  onError = () => null,
  onSuccess = () => null
}: WriteHookParams & { boostedRewardsData?: BoostedRewardsData; address?: `0x${string}` }): WriteHook {
  const chainId = useChainId();
  const { address: connectedAddress, isConnected } = useAccount();
  const address = paramAddress || connectedAddress;

  const { index, amount, proof, is_claimed } = boostedRewardsData || {};
  const enabled =
    !!address && !!isConnected && paramEnabled && index !== undefined && !!amount && !!proof && !is_claimed;

  return useWriteContractFlow({
    address: merkleDistributorAddress[chainId as keyof typeof merkleDistributorAddress],
    abi: merkleDistributorAbi,
    functionName: 'claim',
    args: [BigInt(index || 0n), address!, amount || 0n, proof!],
    chainId,
    gas,
    enabled,
    onStart,
    onSuccess,
    onError
  });
}
