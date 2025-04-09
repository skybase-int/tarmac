import { useAccount, useChainId } from 'wagmi';
import { StakeWriteHookReturnType } from './stakeModule';
import { WriteHookParams } from '../hooks';
import { useStakeNgtAllowance } from './useStakeAllowance';
// TODO: Update this import to the correct address once the contract is deployed
import { stakeModuleAbi, sealModuleAddress as stakeModuleAddress } from '../generated';
import { getStakeLockCalldata } from './calldata';
import { useWriteContractFlow } from '../shared/useWriteContractFlow';

export function useLockCollateral({
  gas,
  enabled: activeTabEnabled = true,
  onStart = () => null,
  onError = () => null,
  onSuccess = () => null,
  index,
  amount,
  ref = 0
}: WriteHookParams & {
  index: bigint;
  amount: bigint | undefined;
  ref?: number;
}): StakeWriteHookReturnType {
  const chainId = useChainId();
  const { isConnected, address } = useAccount();
  const { data: allowance } = useStakeNgtAllowance();

  const enabled =
    !!address &&
    isConnected &&
    activeTabEnabled &&
    !!amount &&
    amount !== 0n &&
    !!allowance &&
    allowance >= amount;

  const writeContractFlowData = useWriteContractFlow({
    address: stakeModuleAddress[chainId as keyof typeof stakeModuleAddress],
    abi: stakeModuleAbi,
    functionName: 'lock',
    args: [address!, index, amount!, ref],
    chainId,
    gas,
    enabled,
    onStart,
    onError,
    onSuccess
  });

  const calldata =
    address && amount
      ? getStakeLockCalldata({ ownerAddress: address, urnIndex: index, amount: amount, refCode: ref })
      : undefined;

  return { ...writeContractFlowData, calldata };
}
