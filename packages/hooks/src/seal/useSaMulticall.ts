import { useAccount, useChainId } from 'wagmi';
import { WriteHook, WriteHookParams } from '../hooks';
import { sealModuleAbi, sealModuleAddress } from '../generated';
import { useWriteContractFlow } from '../shared/useWriteContractFlow';

// Token approvals should be checked and handled outside of this hook,
// since multicall can perform different token supplies
export function useSaMulticall({
  gas,
  enabled: paramEnabled = true,
  onStart = () => null,
  onError = () => null,
  onSuccess = () => null,
  calldata
}: WriteHookParams & { calldata: `0x${string}`[] | undefined }): WriteHook {
  const chainId = useChainId();
  const { isConnected } = useAccount();

  const enabled = isConnected && paramEnabled && !!calldata?.length;

  return useWriteContractFlow({
    address: sealModuleAddress[chainId as keyof typeof sealModuleAddress],
    abi: sealModuleAbi,
    functionName: 'multicall',
    args: [calldata!],
    chainId,
    gas,
    enabled,
    onSuccess,
    onError,
    onStart
  });
}
