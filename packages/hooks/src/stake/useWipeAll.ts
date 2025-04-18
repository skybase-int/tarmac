import { useAccount, useChainId } from 'wagmi';
import { StakeWriteHookParams } from './stakeModule';
// TODO: Update this import to the correct address once the contract is deployed
import { stakeModuleAbi, sealModuleAddress as stakeModuleAddress } from '../generated';
import { getStakeWipeAllCalldata } from './calldata';
import { useWriteContractFlow } from '../shared/useWriteContractFlow';

export function useWipeAll({
  index,
  gas,
  enabled: activeTabEnabled = true,
  onStart = () => null,
  onError = () => null,
  onSuccess = () => null
}: StakeWriteHookParams & {
  index: bigint;
}) {
  const chainId = useChainId();
  const { isConnected, address } = useAccount();

  const enabled = !!address && isConnected && activeTabEnabled;

  const writeContractFlowData = useWriteContractFlow({
    address: stakeModuleAddress[chainId as keyof typeof stakeModuleAddress],
    abi: stakeModuleAbi,
    functionName: 'wipeAll',
    args: [address!, index],
    chainId,
    gas,
    enabled,
    onStart,
    onError,
    onSuccess
  });

  const calldata = address ? getStakeWipeAllCalldata({ ownerAddress: address, urnIndex: index }) : undefined;

  return { ...writeContractFlowData, calldata };
}
