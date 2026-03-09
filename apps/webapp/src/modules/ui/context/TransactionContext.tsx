import { createContext, useContext, useState, useCallback, useRef, ReactNode } from 'react';
import { TxStatus } from '@jetstreamgg/sky-widgets';
import { getTransactionLink, useIsSafeWallet } from '@jetstreamgg/sky-utils';
import { useChainId, useConnection } from 'wagmi';
import { TransactionModal, TransactionSubtitles } from '@/modules/ui/components/TransactionModal';

// The config passed by consumers when launching a transaction
export type TransactionConfig = {
  title: string;
  subtitles?: TransactionSubtitles;
  transactionContent?: ReactNode;
  onConfirm: () => void;
  onRetry?: () => void;
  confirmLabel?: string;
  successLabel?: string;
  errorLabel?: string;
  onSuccess?: () => void;
  onError?: () => void;
  /** Step labels for multi-step transactions (e.g. ["Approve", "Supply"]) */
  steps?: string[];
};

// Transaction lifecycle callbacks compatible with both WriteHookParams and BatchWriteHookParams
export type TxCallbacks = {
  onMutate: () => void;
  onStart: (hash?: string) => void;
  onSuccess: (hash?: string) => void;
  onError: (error: Error, hash?: string) => void;
};

type TransactionContextValue = {
  /** Open the transaction modal with a review screen */
  launch: (config: TransactionConfig) => void;
  /** Transaction lifecycle callbacks to spread into write hooks */
  txCallbacks: TxCallbacks;
  /** Current transaction status */
  txStatus: TxStatus;
};

const TransactionContext = createContext<TransactionContextValue | null>(null);

export function TransactionProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [txStatus, setTxStatus] = useState<TxStatus>(TxStatus.IDLE);
  const [externalLink, setExternalLink] = useState<string | undefined>();
  const [currentStep, setCurrentStep] = useState(0);
  const configRef = useRef<TransactionConfig | null>(null);

  const chainId = useChainId();
  const { address } = useConnection();
  const isSafeWallet = useIsSafeWallet();

  const launch = useCallback((config: TransactionConfig) => {
    configRef.current = config;
    setTxStatus(TxStatus.IDLE);
    setExternalLink(undefined);
    setCurrentStep(0);
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setTxStatus(TxStatus.IDLE);
    setExternalLink(undefined);
    setCurrentStep(0);
    configRef.current = null;
  }, []);

  const txCallbacks: TxCallbacks = {
    onMutate: useCallback(() => {
      setTxStatus(prev => {
        // If already transacting, this is the next step in a sequential flow
        if (prev === TxStatus.INITIALIZED || prev === TxStatus.LOADING) {
          setCurrentStep(s => s + 1);
        }
        return TxStatus.INITIALIZED;
      });
      setExternalLink(undefined);
    }, []),

    onStart: useCallback(
      (hash?: string) => {
        setTxStatus(TxStatus.LOADING);
        if (hash) {
          setExternalLink(getTransactionLink(chainId, address, hash, isSafeWallet));
        }
      },
      [chainId, address, isSafeWallet]
    ),

    // TODO: Add analytics events (TRANSACTION_COMPLETED with tx_status success/error)
    onSuccess: useCallback(
      (hash?: string) => {
        setTxStatus(TxStatus.SUCCESS);
        if (hash) {
          setExternalLink(getTransactionLink(chainId, address, hash, isSafeWallet));
        }
        configRef.current?.onSuccess?.();
      },
      [chainId, address, isSafeWallet]
    ),

    onError: useCallback(
      (error: Error, hash?: string) => {
        setTxStatus(TxStatus.ERROR);
        if (hash) {
          setExternalLink(getTransactionLink(chainId, address, hash, isSafeWallet));
        }
        console.error('[TransactionContext] Transaction error:', error);
        configRef.current?.onError?.();
      },
      [chainId, address, isSafeWallet]
    )
  };

  const config = configRef.current;

  return (
    <TransactionContext.Provider value={{ launch, txCallbacks, txStatus }}>
      {children}
      {config && (
        <TransactionModal
          open={open}
          onClose={handleClose}
          title={config.title}
          subtitles={config.subtitles}
          transactionContent={config.transactionContent}
          onConfirm={config.onConfirm}
          onRetry={config.onRetry}
          txStatus={txStatus}
          externalLink={externalLink}
          confirmLabel={config.confirmLabel}
          successLabel={config.successLabel}
          errorLabel={config.errorLabel}
          steps={config.steps}
          currentStep={currentStep}
        />
      )}
    </TransactionContext.Provider>
  );
}

export function useTransaction() {
  const ctx = useContext(TransactionContext);
  if (!ctx) {
    throw new Error('useTransaction must be used within a TransactionProvider');
  }
  return ctx;
}
