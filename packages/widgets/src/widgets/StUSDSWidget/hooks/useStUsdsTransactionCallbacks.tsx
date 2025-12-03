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
  selectedProvider?: StUsdsProviderType;
}

export const useStUsdsTransactionCallbacks = ({
  amount,
  addRecentTransaction,
  onWidgetStateChange,
  onNotification,
  mutateAllowance,
  mutateStUsds,
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
      mutateStUsds
    ]
  );

  const withdrawTransactionCallbacks = useMemo<TransactionCallbacks>(
    () => ({
      onMutate: handleOnMutate,
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
      mutateStUsds
    ]
  );

  return { supplyTransactionCallbacks, withdrawTransactionCallbacks };
};
