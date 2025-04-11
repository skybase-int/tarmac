import { useAccount, useChainId } from 'wagmi';
import { SaWriteHookReturnType } from './sealModule';
import { WriteHookParams } from '../hooks';
import { sealModuleAbi, sealModuleAddress } from '../generated';
import { getSaHopeCalldata } from './calldata';
import { useWriteContractFlow } from '../shared/useWriteContractFlow';

// TODO: temp hardcoded address, get the real one when it's available
export const MIGRATOR_CONTRACT = '0x7Ac6E2b9ea61e2E587A06e083E4373918071dCfc';

export function useSaHope({
  gas,
  enabled: paramEnabled = true,
  onStart = () => null,
  onError = () => null,
  onSuccess = () => null,
  index
}: WriteHookParams & {
  index: bigint;
}): SaWriteHookReturnType {
  const chainId = useChainId();
  const { isConnected, address } = useAccount();

  const enabled = !!address && isConnected && paramEnabled && !!MIGRATOR_CONTRACT;

  const writeContractFlowData = useWriteContractFlow({
    address: sealModuleAddress[chainId as keyof typeof sealModuleAddress],
    abi: sealModuleAbi,
    functionName: 'hope',
    args: [address!, index, MIGRATOR_CONTRACT],
    chainId,
    gas,
    enabled,
    onStart,
    onError,
    onSuccess
  });

  const calldata = address
    ? getSaHopeCalldata({ ownerAddress: address, urnIndex: index, usrAddress: MIGRATOR_CONTRACT })
    : undefined;

  return { ...writeContractFlowData, calldata };
}
