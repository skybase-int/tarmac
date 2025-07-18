import { useAccount, useChainId } from 'wagmi';
import { WriteHook, WriteHookParams } from '../hooks';
import { stUsdsAddress, stUsdsAbi } from '../generated';
import { useWriteContractFlow } from '../shared/useWriteContractFlow';
import { useStUsdsAllowance } from './useStUsdsAllowance';

export function useStUsdsDeposit({
  amount,
  gas,
  onSuccess = () => null,
  onError = () => null,
  onStart = () => null,
  enabled: activeTabEnabled = true,
  referral = 0
}: WriteHookParams & {
  amount: bigint;
  referral?: number;
}): WriteHook {
  const { address: connectedAddress, isConnected } = useAccount();
  const chainId = useChainId();
  const { data: allowance } = useStUsdsAllowance();

  // Only enabled if users allowance is GTE their deposit amount
  const enabled =
    isConnected &&
    !!amount &&
    amount !== 0n &&
    !!allowance &&
    allowance >= amount &&
    activeTabEnabled &&
    !!connectedAddress;

  // Use deposit with referral if referral is provided, otherwise use standard deposit
  const functionName = referral && referral > 0 ? 'deposit' : 'deposit';
  const args = referral && referral > 0 ? [amount, connectedAddress!, referral] : [amount, connectedAddress!];

  return useWriteContractFlow({
    address: stUsdsAddress[chainId as keyof typeof stUsdsAddress],
    abi: stUsdsAbi,
    functionName,
    args,
    chainId,
    gas,
    enabled,
    onSuccess,
    onError,
    onStart
  });
}
