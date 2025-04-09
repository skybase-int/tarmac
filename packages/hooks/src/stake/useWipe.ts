import { useAccount, useChainId } from 'wagmi';
import { StakeWriteHookParams } from './stakeModule';
import { encodeFunctionData } from 'viem';
// TODO: Update this import to the correct address once the contract is deployed
import { stakeModuleAbi, sealModuleAddress as stakeModuleAddress } from '../generated';
import { useWriteContractFlow } from '../shared/useWriteContractFlow';

export function useWipe({
  gas,
  amount,
  index,
  enabled: activeTabEnabled = true,
  onStart = () => null,
  onError = () => null,
  onSuccess = () => null
}: StakeWriteHookParams & {
  amount: bigint | undefined;
  index: bigint;
}) {
  const chainId = useChainId();
  const { isConnected, address } = useAccount();

  const enabled = !!address && isConnected && activeTabEnabled && !!amount && amount > 0n;

  const writeContractFlowData = useWriteContractFlow({
    address: stakeModuleAddress[chainId as keyof typeof stakeModuleAddress],
    abi: stakeModuleAbi,
    functionName: 'wipe',
    args: [address!, index, amount!],
    chainId,
    gas,
    enabled,
    onStart,
    onError,
    onSuccess
  });

  const calldata =
    !!address && !!amount
      ? encodeFunctionData({
          abi: stakeModuleAbi,
          functionName: 'wipe',
          args: [address, index, amount]
        })
      : undefined;

  return { ...writeContractFlowData, calldata };
}
