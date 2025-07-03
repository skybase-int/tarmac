import { useCallback, useContext } from 'react';
import { WidgetProps } from '../types/widgetState';
import { WidgetContext } from '@widgets/context/WidgetContext';
import { getTransactionLink, useIsSafeWallet } from '@jetstreamgg/sky-utils';
import { useAccount, useChainId } from 'wagmi';
import { TxStatus } from '../constants';

type UseTransactionHandlersParams = Pick<
  WidgetProps,
  'addRecentTransaction' | 'onWidgetStateChange' | 'onNotification'
>;

interface TransactionStartParams {
  hash?: string;
  recentTransactionDescription: string;
}

interface TransactionSuccessParams {
  hash: string | undefined;
  notificationTitle: string;
  notificationDescription: string;
}

interface TransactionErrorParams {
  error: Error;
  hash: string | undefined;
  notificationTitle: string;
  notificationDescription: string;
}

export const useTransactionHandlers = ({
  addRecentTransaction,
  onWidgetStateChange,
  onNotification
}: UseTransactionHandlersParams) => {
  const { widgetState, setExternalLink, setTxStatus } = useContext(WidgetContext);

  const chainId = useChainId();
  const { address } = useAccount();
  const isSafeWallet = useIsSafeWallet();

  const handleOnStart = useCallback(
    ({ hash, recentTransactionDescription }: TransactionStartParams) => {
      if (hash) {
        addRecentTransaction?.({
          hash,
          description: recentTransactionDescription
        });
        setExternalLink(getTransactionLink(chainId, address, hash, isSafeWallet));
      }
      setTxStatus(TxStatus.LOADING);
      onWidgetStateChange?.({ hash, widgetState, txStatus: TxStatus.LOADING });
    },
    [
      addRecentTransaction,
      address,
      chainId,
      isSafeWallet,
      onWidgetStateChange,
      setExternalLink,
      setTxStatus,
      widgetState
    ]
  );

  const handleOnSuccess = useCallback(
    ({ hash, notificationTitle, notificationDescription }: TransactionSuccessParams) => {
      onNotification?.({
        title: notificationTitle,
        description: notificationDescription,
        status: TxStatus.SUCCESS
      });
      setTxStatus(TxStatus.SUCCESS);
      if (hash) {
        setExternalLink(getTransactionLink(chainId, address, hash, isSafeWallet));
      }
      onWidgetStateChange?.({ hash, widgetState, txStatus: TxStatus.SUCCESS });
    },
    [
      address,
      chainId,
      isSafeWallet,
      onNotification,
      onWidgetStateChange,
      setExternalLink,
      setTxStatus,
      widgetState
    ]
  );

  const handleOnError = useCallback(
    ({ error, hash, notificationTitle, notificationDescription }: TransactionErrorParams) => {
      onNotification?.({
        title: notificationTitle,
        description: notificationDescription,
        status: TxStatus.ERROR
      });
      setTxStatus(TxStatus.ERROR);
      if (hash) {
        setExternalLink(getTransactionLink(chainId, address, hash, isSafeWallet));
      }
      onWidgetStateChange?.({ hash, widgetState, txStatus: TxStatus.ERROR });
      console.log(error);
    },
    [
      address,
      chainId,
      isSafeWallet,
      onNotification,
      onWidgetStateChange,
      setExternalLink,
      setTxStatus,
      widgetState
    ]
  );

  return { handleOnStart, handleOnSuccess, handleOnError };
};
