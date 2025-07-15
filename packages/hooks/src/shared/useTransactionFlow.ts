import { BatchWriteHook, UseTransactionFlowParameters } from '../hooks';
import { useSequentialTransactionFlow } from './useSequentialTransactionFlow';
import { useSendBatchTransactionFlow } from './useSendBatchTransactionFlow';
import { useIsBatchSupported } from './useIsBatchSupported';

/**
 * A unified hook that routes to either sequential or batch transaction flow
 * based on the shouldUseBatch parameter and wallet capabilities.
 *
 * @param parameters Configuration for the transaction flow
 * @returns BatchWriteHook interface for executing transactions
 */
export function useTransactionFlow(parameters: UseTransactionFlowParameters): BatchWriteHook {
  const {
    calls,
    shouldUseBatch = true,
    enabled = true,
    onMutate,
    onStart,
    onSuccess,
    onError,
    gcTime,
    chainId
  } = parameters;

  // Check if wallet supports batch transactions
  const { data: batchSupported, isLoading: isLoadingCapabilities } = useIsBatchSupported();

  // Determine if we should actually use batch based on user preference, wallet support, and number of calls
  const useActualBatch = shouldUseBatch && batchSupported && calls.length > 1;

  // Normalize callbacks for sequential flow
  const sequentialOnStart = onStart ? () => onStart() : undefined;
  const sequentialOnSuccess = onSuccess ? (hash: string) => onSuccess(hash) : undefined;
  const sequentialOnError = onError ? (error: Error, hash: string) => onError(error, hash) : undefined;

  // Use sequential flow
  const sequentialResults = useSequentialTransactionFlow({
    transactions: calls,
    enabled: enabled && !useActualBatch && !isLoadingCapabilities,
    onMutate,
    onStart: sequentialOnStart,
    onSuccess: sequentialOnSuccess,
    onError: sequentialOnError,
    gcTime,
    chainId
  });

  // Use batch flow
  const batchResults = useSendBatchTransactionFlow({
    calls,
    enabled: enabled && useActualBatch && !isLoadingCapabilities,
    onMutate,
    onStart,
    onSuccess,
    onError,
    chainId
  });

  // Return the appropriate results based on useActualBatch
  if (useActualBatch) {
    return batchResults;
  }

  // Map sequential results to BatchWriteHook interface
  return {
    execute: sequentialResults.execute,
    isLoading: sequentialResults.isLoading || isLoadingCapabilities,
    prepared: sequentialResults.prepared && !isLoadingCapabilities,
    error: sequentialResults.error
  };
}
