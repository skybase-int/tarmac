import { useState, useCallback, ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { TxStatus, Clock, InProgress, SuccessCheck, FailedX, Cancel } from '@jetstreamgg/sky-widgets';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Zap } from '@/modules/icons/Zap';
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
  const chainId = useChainId();
  const isSafeWallet = useIsSafeWallet();
  const explorerName = getExplorerName(chainId, isSafeWallet);

  const handleConfirm = useCallback(() => {
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
      onClose();
    }
  }, [step, txStatus, onClose]);

  const isTransacting = txStatus === TxStatus.INITIALIZED || txStatus === TxStatus.LOADING;

  return (
    <Dialog open={open} onOpenChange={val => !val && handleClose()}>
      <DialogContent
        className="sm:max-w-[480px]"
        onPointerDownOutside={e => isTransacting && e.preventDefault()}
        onEscapeKeyDown={e => isTransacting && e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="sr-only">{title}</DialogTitle>
          <DialogDescription className="sr-only">{subtitle}</DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait" initial={false}>
          {step === 'review' ? (
            <motion.div
              key="review"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-4"
            >
              <div className="flex items-center gap-3">
                <Zap width={24} height={24} />
                <Text className="text-lg font-semibold">{title}</Text>
              </div>

              {subtitle && <Text className="text-textSecondary">{subtitle}</Text>}

              {reviewContent && <div>{reviewContent}</div>}

              <div className="flex gap-3 pt-2">
                <Button variant="outline" className="flex-1" onClick={handleClose}>
                  <Trans>Back</Trans>
                </Button>
                <Button variant="primary" className="flex-1" onClick={handleConfirm}>
                  {confirmLabel ?? <Trans>Confirm</Trans>}
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="transaction"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center gap-4"
            >
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
                  <Text className="text-lg font-semibold">{title}</Text>
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

              {(txStatus === TxStatus.SUCCESS || txStatus === TxStatus.CANCELLED) && (
                <Button variant="primary" className="w-full" onClick={handleClose}>
                  {successLabel ?? <Trans>Done</Trans>}
                </Button>
              )}

              {txStatus === TxStatus.ERROR && (
                <div className="flex w-full gap-3">
                  <Button variant="outline" className="flex-1" onClick={handleClose}>
                    <Trans>Close</Trans>
                  </Button>
                  <Button variant="primary" className="flex-1" onClick={handleRetry}>
                    {errorLabel ?? <Trans>Retry</Trans>}
                  </Button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
