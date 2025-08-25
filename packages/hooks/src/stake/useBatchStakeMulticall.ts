import { useAccount, useChainId } from 'wagmi';
import { BatchWriteHook, BatchWriteHookParams } from '../hooks';
import { skyAddress, stakeModuleAbi, stakeModuleAddress, usdsAddress } from '../generated';
import { useStakeSkyAllowance, useStakeUsdsAllowance } from './useStakeAllowance';
import { getWriteContractCall } from '../shared/getWriteContractCall';
import { Call, erc20Abi } from 'viem';
import { useSendBatchTransactionFlow } from '../shared/useSendBatchTransactionFlow';

export function useBatchStakeMulticall({
  skyAmount,
  usdsAmount,
  enabled: paramEnabled = true,
  onMutate = () => null,
  onStart = () => null,
  onError = () => null,
  onSuccess = () => null,
  calldata
}: BatchWriteHookParams & {
  calldata: `0x${string}`[] | undefined;
  skyAmount: bigint;
  usdsAmount: bigint;
}): BatchWriteHook {
  const chainId = useChainId();
  const { isConnected } = useAccount();

  const { data: skyAllowance, error: skyAllowanceError } = useStakeSkyAllowance();
  const { data: usdsAllowance, error: usdsAllowanceError } = useStakeUsdsAllowance();

  const hasSkyAllowance = skyAllowance !== undefined && skyAllowance >= skyAmount;
  const hasUsdsAllowance = usdsAllowance !== undefined && usdsAllowance >= usdsAmount;

  // Calls for the batch transaction
  const calls: Call[] = [];
  if (calldata?.length) {
    const approveSkyCall = getWriteContractCall({
      to: skyAddress[chainId as keyof typeof skyAddress],
      abi: erc20Abi,
      functionName: 'approve',
      args: [stakeModuleAddress[chainId as keyof typeof stakeModuleAddress], skyAmount]
    });

    const approveUsdsCall = getWriteContractCall({
      to: usdsAddress[chainId as keyof typeof usdsAddress],
      abi: erc20Abi,
      functionName: 'approve',
      args: [stakeModuleAddress[chainId as keyof typeof stakeModuleAddress], usdsAmount]
    });

    const multicallCall = getWriteContractCall({
      to: stakeModuleAddress[chainId as keyof typeof stakeModuleAddress],
      abi: stakeModuleAbi,
      functionName: 'multicall',
      args: [calldata]
    });

    if (!hasSkyAllowance) calls.push(approveSkyCall);
    if (!hasUsdsAllowance) calls.push(approveUsdsCall);
    calls.push(multicallCall);
  }

  const enabled =
    isConnected &&
    paramEnabled &&
    skyAllowance !== undefined &&
    usdsAllowance !== undefined &&
    !!calldata?.length;

  const sendBatchTransactionFlowResults = useSendBatchTransactionFlow({
    calls,
    chainId,
    enabled,
    onMutate,
    onSuccess,
    onError,
    onStart
  });

  return {
    ...sendBatchTransactionFlowResults,
    error: sendBatchTransactionFlowResults.error || skyAllowanceError || usdsAllowanceError
  };
}
