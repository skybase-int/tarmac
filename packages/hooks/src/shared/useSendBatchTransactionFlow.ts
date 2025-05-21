import { useAccount, useCapabilities, useChainId, useSendCalls, useWaitForCallsStatus } from 'wagmi';
import { CapabilitySupportStatus, SAFE_CONNECTOR_ID } from './constants';
import { BatchWriteHook, UseSendBatchTransactionFlowParameters } from '../hooks';
import { useWaitForSafeTxHash } from './useWaitForSafeTxHash';
import { useEffect, useMemo } from 'react';
import { isRevertedError } from '../helpers';
import { Config } from '@wagmi/core';

export function useSendBatchTransactionFlow<
  const calls extends readonly unknown[],
  config extends Config,
  chainId extends config['chains'][number]['id']
>(parameters: UseSendBatchTransactionFlowParameters<calls, chainId, config>): BatchWriteHook {
  const {
    onSuccess = () => null,
    onError = () => null,
    onStart = () => null,
    ...sendCallsParameters
  } = parameters;

  const chainId = useChainId();

  // Check if wallet supports batch transactions
  const {
    data: capabilities,
    isLoading: isLoadingCapabilities,
    error: capabilitiesError
  } = useCapabilities();

  const atomicCapabilityStatus = capabilities?.[chainId]?.atomic?.status;

  const batchSupported =
    atomicCapabilityStatus === CapabilitySupportStatus.supported ||
    atomicCapabilityStatus === CapabilitySupportStatus.ready;

  // Initiate hook to send the batch transaction
  const {
    sendCalls,
    error: sendError,
    data: mutationData
  } = useSendCalls({
    mutation: {
      onSuccess: ({ id }: { id: string }) => {
        if (onStart) {
          onStart(id);
        }
      },
      onError: (err: Error) => {
        if (onError) {
          onError(err, mutationData?.id || '');
        }
      }
    }
  });

  // Workaround to get `txHash` from Safe connector
  const { connector } = useAccount();
  const isSafeConnector = connector?.id === SAFE_CONNECTOR_ID;

  // TODO: Check if this is actually compatible with Safe
  const eventHash = useWaitForSafeTxHash({
    chainId,
    safeTxHash: mutationData?.id,
    isSafeConnector
  });

  // If the user is currently connected through the Safe connector, the txHash will only
  // be populated after we get it from the Safe wallet contract event, if they're connected
  // to any other connector, the txHash will be the one we get from the mutation
  const txHash = useMemo(
    () => (isSafeConnector ? eventHash : mutationData?.id),
    [eventHash, mutationData?.id, isSafeConnector]
  );

  // Monitor tx
  const {
    isLoading: isMining,
    isSuccess,
    error: miningError,
    failureReason
  } = useWaitForCallsStatus({
    id: mutationData?.id
  });

  const txReverted = isRevertedError(failureReason);

  useEffect(() => {
    if (txHash) {
      if (isSuccess) {
        onSuccess(txHash);
      } else if (miningError) {
        onError(miningError, txHash);
      } else if (failureReason && txReverted) {
        onError(failureReason, txHash);
      }
    }
  }, [isSuccess, miningError, failureReason, txHash, txReverted]);

  return {
    execute: () => {
      if (batchSupported) {
        sendCalls(sendCallsParameters);
      } else {
        console.log(
          'ERROR: A batch transaction was triggered but it looks like the connected wallet does not support it'
        );
      }
    },
    data: txHash,
    isLoading: isLoadingCapabilities || (isMining && !txReverted),
    prepared: batchSupported && !isLoadingCapabilities && !capabilitiesError,
    error: sendError || miningError
  };
}
