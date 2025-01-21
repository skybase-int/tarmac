import { useAccount, useChainId } from 'wagmi';
import { WriteHook, WriteHookParams } from '../hooks';
import { psm3BaseAbi, psm3BaseAddress } from '../generated';
import { useTokenAllowance } from '../tokens/useTokenAllowance';
import { useWriteContractFlow } from '../shared/useWriteContractFlow';

export function usePsmSwapExactIn({
  assetIn,
  assetOut,
  amountIn,
  minAmountOut,
  referralCode = 0n,
  enabled: paramEnabled = true,
  gas,
  onSuccess = () => null,
  onError = () => null,
  onStart = () => null
}: WriteHookParams & {
  assetIn: `0x${string}`;
  assetOut: `0x${string}`;
  amountIn: bigint;
  minAmountOut: bigint;
  referralCode?: bigint;
}): WriteHook {
  const chainId = useChainId();
  const { address, isConnected } = useAccount();

  // Get the allowance of the input asset to be used by the PSM contract
  const { data: allowance, error: allowanceError } = useTokenAllowance({
    chainId,
    contractAddress: assetIn,
    owner: address,
    spender: psm3BaseAddress[chainId as keyof typeof psm3BaseAddress]
  });

  const enabled =
    paramEnabled && isConnected && !!allowance && amountIn !== 0n && allowance >= amountIn && !!address;

  const writeContractFlowResults = useWriteContractFlow({
    address: psm3BaseAddress[chainId as keyof typeof psm3BaseAddress],
    abi: psm3BaseAbi,
    functionName: 'swapExactIn',
    args: [assetIn, assetOut, amountIn, minAmountOut, address!, referralCode],
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
