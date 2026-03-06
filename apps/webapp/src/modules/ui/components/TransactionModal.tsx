import { useState, useCallback, useRef, ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { TxStatus, Clock, InProgress, SuccessCheck, FailedX, Cancel } from '@jetstreamgg/sky-widgets';
import { Dialog, DialogContent, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Close } from '@/modules/icons';
import { Text } from '@/modules/layout/components/Typography';
import { Trans } from '@lingui/react/macro';
import { getExplorerName, useIsSafeWallet } from '@jetstreamgg/sky-utils';
import { useChainId } from 'wagmi';

type TransactionModalStep = 'review' | 'transaction';

export type TransactionModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  reviewContent?: ReactNode;
  transactionContent?: ReactNode;
  onConfirm: () => void;
  onRetry?: () => void;
  txStatus: TxStatus;
  externalLink?: string;
  confirmLabel?: string;
  successLabel?: string;
  errorLabel?: string;
};

const statusIcons: Partial<Record<TxStatus, ReactNode>> = {
  [TxStatus.INITIALIZED]: <Clock />,
  [TxStatus.LOADING]: <InProgress />,
  [TxStatus.SUCCESS]: <SuccessCheck />,
  [TxStatus.ERROR]: <FailedX />,
  [TxStatus.CANCELLED]: <Cancel />
};

export function TransactionModal({
  open,
  onClose,
  title,
  subtitle,
  reviewContent,
  transactionContent,
  onConfirm,
  onRetry,
  txStatus,
  externalLink,
  confirmLabel,
  successLabel,
  errorLabel
}: TransactionModalProps) {
  const [step, setStep] = useState<TransactionModalStep>('review');
  const [contentHeight, setContentHeight] = useState<number | undefined>();
  const reviewRef = useRef<HTMLDivElement>(null);
  const chainId = useChainId();
  const isSafeWallet = useIsSafeWallet();
  const explorerName = getExplorerName(chainId, isSafeWallet);

  const handleConfirm = useCallback(() => {
    if (reviewRef.current) {
      setContentHeight(reviewRef.current.offsetHeight);
    }
    setStep('transaction');
    onConfirm();
  }, [onConfirm]);

  const handleRetry = useCallback(() => {
    if (onRetry) {
      onRetry();
    } else {
      onConfirm();
    }
  }, [onConfirm, onRetry]);

  const handleClose = useCallback(() => {
    if (step === 'review' || txStatus === TxStatus.SUCCESS || txStatus === TxStatus.ERROR) {
      setStep('review');
      setContentHeight(undefined);
      onClose();
    }
  }, [step, txStatus, onClose]);

  const isTransacting = txStatus === TxStatus.INITIALIZED || txStatus === TxStatus.LOADING;

  return (
    <Dialog open={open} onOpenChange={val => !val && handleClose()}>
      <DialogContent
        className="bg-containerDark flex flex-col gap-6 p-4 sm:max-w-122.5 sm:min-w-122.5"
        onPointerDownOutside={e => isTransacting && e.preventDefault()}
        onEscapeKeyDown={e => isTransacting && e.preventDefault()}
        onOpenAutoFocus={e => e.preventDefault()}
        onCloseAutoFocus={e => e.preventDefault()}
      >
        <div className="flex items-center justify-between">
          <DialogTitle className="text-text text-2xl">{title}</DialogTitle>
          {!isTransacting && (
            <DialogClose asChild>
              <Button variant="ghost" className="text-textSecondary hover:text-text h-8 w-8 rounded-full p-0">
                <Close className="h-5 w-5" />
              </Button>
            </DialogClose>
          )}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {step === 'review' ? (
            <motion.div
              key="review"
              ref={reviewRef}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-4"
            >
              {subtitle && <Text className="text-textSecondary">{subtitle}</Text>}

              {reviewContent && <div className="text-text">{reviewContent}</div>}

              <Button variant="primary" className="w-full" onClick={handleConfirm}>
                {confirmLabel ?? <Trans>Confirm</Trans>}
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="transaction"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center gap-4"
              style={{ minHeight: contentHeight }}
            >
              <div className="flex flex-col items-center gap-4 pt-8">
                <AnimatePresence mode="popLayout" initial={false}>
                  {statusIcons[txStatus] && (
                    <motion.div
                      key={txStatus}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                    >
                      {statusIcons[txStatus]}
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={txStatus}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center"
                  >
                    <Text className="text-textSecondary mt-1">
                      {txStatus === TxStatus.INITIALIZED && (
                        <Trans>Confirm this transaction in your wallet.</Trans>
                      )}
                      {txStatus === TxStatus.LOADING && <Trans>Transaction is being processed...</Trans>}
                      {txStatus === TxStatus.SUCCESS && <Trans>Transaction completed successfully.</Trans>}
                      {txStatus === TxStatus.ERROR && <Trans>Transaction failed. Please try again.</Trans>}
                      {txStatus === TxStatus.CANCELLED && <Trans>Transaction was cancelled.</Trans>}
                    </Text>
                  </motion.div>
                </AnimatePresence>

                {transactionContent && <div className="w-full">{transactionContent}</div>}

                {externalLink &&
                  (txStatus === TxStatus.LOADING ||
                    txStatus === TxStatus.SUCCESS ||
                    txStatus === TxStatus.ERROR) && (
                    <a
                      href={externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-textEmphasis text-sm hover:underline"
                    >
                      <Trans>View on {explorerName}</Trans>
                    </a>
                  )}
              </div>

              <div className="mt-auto w-full">
                {(txStatus === TxStatus.SUCCESS || txStatus === TxStatus.CANCELLED) && (
                  <Button variant="primary" className="w-full" onClick={handleClose}>
                    {successLabel ?? <Trans>Done</Trans>}
                  </Button>
                )}

                {txStatus === TxStatus.ERROR && (
                  <div className="flex w-full gap-3">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        setStep('review');
                        setContentHeight(undefined);
                      }}
                    >
                      <Trans>Back</Trans>
                    </Button>
                    <Button variant="primary" className="flex-1" onClick={handleRetry}>
                      {errorLabel ?? <Trans>Retry</Trans>}
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
