import { formatBigInt } from '@jetstreamgg/sky-utils';
import { StUsdsProviderType } from '@jetstreamgg/sky-hooks';
import { t } from '@lingui/core/macro';
import { useTransactionCallbacks } from '@widgets/shared/hooks/useTransactionCallbacks';
import { TransactionCallbacks } from '@widgets/shared/types/transactionCallbacks';
import { WidgetProps } from '@widgets/shared/types/widgetState';
import { useMemo } from 'react';

interface UseStUsdsTransactionCallbacksParameters
  extends Pick<WidgetProps, 'addRecentTransaction' | 'onWidgetStateChange' | 'onNotification'> {
  amount: bigint;
  mutateAllowance: () => void;
  mutateStUsds: () => void;
  refetchCurveUsdsAllowance?: () => void;
  refetchCurveStUsdsAllowance?: () => void;
  selectedProvider?: StUsdsProviderType;
}

export const useStUsdsTransactionCallbacks = ({
  amount,
  addRecentTransaction,
  onWidgetStateChange,
  onNotification,
  mutateAllowance,
  mutateStUsds,
  refetchCurveUsdsAllowance,
  refetchCurveStUsdsAllowance,
  selectedProvider = StUsdsProviderType.NATIVE
}: UseStUsdsTransactionCallbacksParameters) => {
  const { handleOnMutate, handleOnStart, handleOnSuccess, handleOnError } = useTransactionCallbacks({
    addRecentTransaction,
    onWidgetStateChange,
    onNotification
  });

  const isCurve = selectedProvider === StUsdsProviderType.CURVE;

  const supplyTransactionCallbacks = useMemo<TransactionCallbacks>(
    () => ({
      onMutate: () => {
        mutateAllowance();
        if (isCurve) {
          refetchCurveUsdsAllowance?.();
        }
        handleOnMutate();
      },
      onStart: hash => {
        handleOnStart({
          hash,
          recentTransactionDescription: isCurve
            ? t`Swapping ${formatBigInt(amount)} USDS via Curve`
            : t`Supplying ${formatBigInt(amount)} USDS`
        });
      },
      onSuccess: hash => {
        handleOnSuccess({
          hash,
          notificationTitle: isCurve ? t`Swap successful` : t`Supply successful`,
          notificationDescription: isCurve
            ? t`You swapped ${formatBigInt(amount)} USDS for stUSDS via Curve`
            : t`You supplied ${formatBigInt(amount)} USDS`
        });
        mutateAllowance();
        mutateStUsds();
        if (isCurve) {
          refetchCurveUsdsAllowance?.();
        }
      },
      onError: (error, hash) => {
        handleOnError({
          error,
          hash,
          notificationTitle: isCurve ? t`Swap failed` : t`Supply failed`,
          notificationDescription: t`Something went wrong with your transaction. Please try again.`
        });
        mutateAllowance();
        mutateStUsds();
        if (isCurve) {
          refetchCurveUsdsAllowance?.();
        }
      }
    }),
    [
      amount,
      isCurve,
      handleOnMutate,
      handleOnError,
      handleOnStart,
      handleOnSuccess,
      mutateAllowance,
      mutateStUsds,
      refetchCurveUsdsAllowance
    ]
  );

  const withdrawTransactionCallbacks = useMemo<TransactionCallbacks>(
    () => ({
      onMutate: () => {
        if (isCurve) {
          refetchCurveStUsdsAllowance?.();
        }
        handleOnMutate();
      },
      onStart: hash => {
        handleOnStart({
          hash,
          recentTransactionDescription: isCurve
            ? t`Swapping stUSDS via Curve`
            : t`Withdrawing ${formatBigInt(amount)} USDS`
        });
      },
      onSuccess: hash => {
        handleOnSuccess({
          hash,
          notificationTitle: isCurve ? t`Swap successful` : t`Withdraw successful`,
          notificationDescription: isCurve
            ? t`You swapped stUSDS for ${formatBigInt(amount)} USDS via Curve`
            : t`You withdrew ${formatBigInt(amount)} USDS`
        });
        mutateStUsds();
        if (isCurve) {
          refetchCurveStUsdsAllowance?.();
        }
      },
      onError: (error, hash) => {
        handleOnError({
          error,
          hash,
          notificationTitle: isCurve ? t`Swap failed` : t`Withdraw failed`,
          notificationDescription: t`Something went wrong with your transaction. Please try again.`
        });
        mutateAllowance();
        mutateStUsds();
        if (isCurve) {
          refetchCurveStUsdsAllowance?.();
        }
      }
    }),
    [
      amount,
      isCurve,
      handleOnMutate,
      handleOnError,
      handleOnStart,
      handleOnSuccess,
      mutateAllowance,
      mutateStUsds,
      refetchCurveStUsdsAllowance
    ]
  );

  return { supplyTransactionCallbacks, withdrawTransactionCallbacks };
};
