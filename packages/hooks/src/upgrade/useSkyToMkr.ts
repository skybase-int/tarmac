import { mkrSkyAbi, mkrSkyAddress, skyAddress } from '../generated';
import { useAccount, useChainId } from 'wagmi';
import { WriteHook, WriteHookParams } from '../hooks';
import { useTokenAllowance } from '../tokens/useTokenAllowance';
import { useWriteContractFlow } from '../shared/useWriteContractFlow';

// Calls the ex function on the upgrader contract to revert SKY to MKR
export function useSkyToMkr({
  amount,
  enabled: paramEnabled = true,
  gas,
  onSuccess = () => null,
  onError = () => null,
  onStart = () => null
}: WriteHookParams & {
  amount: bigint;
}): WriteHook {
  const chainId = useChainId();
  const { address, isConnected } = useAccount();

  // Get the allowance of SKY to be used by the upgrader contract
  const { data: allowance, error: allowanceError } = useTokenAllowance({
    chainId,
    contractAddress: skyAddress[chainId as keyof typeof skyAddress],
    owner: address,
    spender: mkrSkyAddress[chainId as keyof typeof mkrSkyAddress]
  });

  const enabled = !!(
    paramEnabled &&
    isConnected &&
    allowance &&
    amount !== 0n &&
    allowance >= amount &&
    address
  );

  const writeContractFlowResults = useWriteContractFlow({
    address: mkrSkyAddress[chainId as keyof typeof mkrSkyAddress],
    abi: mkrSkyAbi,
    functionName: 'skyToMkr',
    args: [address!, amount],
    chainId,
    enabled,
    gas,
    onSuccess,
    onError,
    onStart
  });

  return {
    ...writeContractFlowResults,
    prepareError: writeContractFlowResults.prepareError || allowanceError
  };
}
