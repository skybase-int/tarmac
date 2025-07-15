import {
  UseSimulateContractParameters,
  useAccount,
  useSimulateContract,
  useWaitForTransactionReceipt,
  useWriteContract
} from 'wagmi';
import { isRevertedError } from '../helpers';
import { useEffect, useMemo, useState, useRef } from 'react';
import { SAFE_CONNECTOR_ID } from './constants';
import { useWaitForSafeTxHash } from './useWaitForSafeTxHash';
import type { Abi } from 'viem';

export type SequentialTransaction = {
  address: `0x${string}`;
  abi: Abi;
  functionName: string;
  args: readonly unknown[];
};

export type UseSequentialTransactionFlowParameters = {
  transactions: SequentialTransaction[];
  enabled?: boolean;
  onMutate?: () => void;
  onStart?: (index: number, hash: string) => void;
  onSuccess?: (hashes: string[]) => void;
  onError?: (error: Error, index: number, hash: string) => void;
  gcTime?: number;
  chainId?: number;
};

export type SequentialTransactionHook = {
  data: string[] | undefined;
  error: Error | null;
  isLoading: boolean;
  execute: () => void;
  retryPrepare: () => void;
  prepareError: Error | null;
  prepared: boolean;
  currentIndex: number;
  totalTransactions: number;
};

export function useSequentialTransactionFlow(
  parameters: UseSequentialTransactionFlowParameters
): SequentialTransactionHook {
  const {
    transactions,
    enabled = true,
    onMutate = () => null,
    onStart = () => null,
    onSuccess = () => null,
    onError = () => null,
    gcTime = 30000,
    chainId
  } = parameters;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [transactionHashes, setTransactionHashes] = useState<string[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);

  // Get current transaction
  const currentTransaction = transactions[currentIndex];

  // Prepare current transaction
  const {
    data: simulationData,
    refetch,
    isLoading: isSimulationLoading,
    error: simulationError
  } = useSimulateContract({
    address: currentTransaction?.address,
    abi: currentTransaction?.abi,
    functionName: currentTransaction?.functionName as any,
    args: currentTransaction?.args as any,
    query: {
      // Only enable simulation for the first transaction initially, or for subsequent transactions after previous success
      enabled:
        enabled &&
        currentIndex < transactions.length &&
        (currentIndex === 0 || (currentIndex > 0 && transactionHashes.length >= currentIndex)),
      gcTime
    }
  } as UseSimulateContractParameters);

  const {
    writeContract,
    error: writeError,
    data: mutationHash
  } = useWriteContract({
    mutation: {
      onMutate: () => {
        if (currentIndex === 0) {
          onMutate();
        }
      },
      onSuccess: (hash: `0x${string}`) => {
        if (currentIndex === 0) {
          onStart(currentIndex, hash);
        }
      },
      onError: (err: Error) => {
        onError(err, currentIndex, mutationHash || '');
      }
    }
  });

  // Workaround to get `txHash` from Safe connector
  const { connector } = useAccount();
  const isSafeConnector = connector?.id === SAFE_CONNECTOR_ID;

  const eventHash = useWaitForSafeTxHash({
    chainId: chainId,
    safeTxHash: mutationHash,
    isSafeConnector
  });

  const txHash = useMemo(
    () => (isSafeConnector ? eventHash : mutationHash),
    [eventHash, mutationHash, isSafeConnector]
  );

  // Monitor current transaction
  const {
    isLoading: isMining,
    isSuccess,
    error: miningError,
    failureReason
  } = useWaitForTransactionReceipt({
    hash: txHash
  });

  const txReverted = isRevertedError(failureReason);

  // Check if current transaction is prepared
  const prepared = useMemo(() => {
    if (transactions.length === 0) return false;
    return currentIndex < transactions.length && !!simulationData?.request;
  }, [currentIndex, transactions.length, simulationData?.request]);

  // Auto-execute next transaction when it's prepared (for subsequent transactions after first)
  useEffect(() => {
    if (
      currentIndex > 0 &&
      prepared &&
      simulationData?.request &&
      currentIndex < transactions.length &&
      !transactionHashes[currentIndex] // Only execute if not already executed
    ) {
      writeContract(simulationData.request);
    }
  }, [
    prepared,
    simulationData?.request,
    currentIndex,
    transactions.length,
    writeContract,
    simulationData,
    transactionHashes
  ]);

  const lastProcessedTxHash = useRef<string | undefined>(undefined);

  // Handle transaction completion
  useEffect(() => {
    if (txHash && isSuccess && !txReverted && lastProcessedTxHash.current !== txHash) {
      lastProcessedTxHash.current = txHash;

      const newHashes = [...transactionHashes];
      newHashes[currentIndex] = txHash;
      setTransactionHashes(newHashes);

      // Check if this was the last transaction
      const nextIndex = currentIndex + 1;

      if (nextIndex >= transactions.length) {
        // All transactions completed
        onSuccess(newHashes);
        setIsExecuting(false);
        setCurrentIndex(0);
      } else {
        // Move to next transaction - it will auto-execute once prepared
        setCurrentIndex(currentIndex + 1);
      }
    } else if (
      txHash &&
      (miningError || (failureReason && txReverted)) &&
      lastProcessedTxHash.current !== txHash
    ) {
      lastProcessedTxHash.current = txHash;
      // Transaction failed
      const error = miningError || failureReason;
      onError(error as Error, currentIndex, txHash);
      setIsExecuting(false);
    }
  }, [
    isSuccess,
    miningError,
    failureReason,
    txHash,
    txReverted,
    currentIndex,
    transactions.length,
    transactionHashes,
    currentTransaction,
    onSuccess,
    onError
  ]);

  return {
    data: transactionHashes.length > 0 ? transactionHashes : undefined,
    error: writeError || miningError || simulationError,
    isLoading: isSimulationLoading || (isMining && !txReverted) || isExecuting,
    execute: () => {
      if (!enabled || isExecuting) return;

      if (currentIndex >= transactions.length) {
        console.log('ERROR: All transactions have been executed');
        return;
      }

      if (!currentTransaction) {
        console.log('ERROR: No current transaction to execute');
        return;
      }

      if (simulationData?.request) {
        setIsExecuting(true);
        writeContract(simulationData.request);
      } else {
        console.log(`ERROR: Transaction ${currentIndex} is not ready to execute.
        contract address: ${currentTransaction.address}
        function name: ${currentTransaction.functionName}
        function arguments: ${currentTransaction.args}
        isSimulationLoading: ${isSimulationLoading}
        simulationError: ${simulationError}
        enabled: ${enabled}`);
      }
    },
    retryPrepare: refetch,
    prepareError: simulationError,
    prepared,
    currentIndex,
    totalTransactions: transactions.length
  };
}
