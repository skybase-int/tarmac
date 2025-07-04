import {
  RewardContract,
  useApproveToken,
  useBatchRewardsSupply,
  useRewardsClaim,
  useRewardsSupply,
  useRewardsWithdraw
} from '@jetstreamgg/sky-hooks';
import { formatBigInt } from '@jetstreamgg/sky-utils';
import { t } from '@lingui/core/macro';
import { useLingui } from '@lingui/react/macro';
import { WidgetContext } from '@widgets/context/WidgetContext';
import { useTransactionCallbacks } from '@widgets/shared/hooks/useTransactionCallbacks';
import { WidgetProps } from '@widgets/shared/types/widgetState';
import { useContext } from 'react';
import { useChainId } from 'wagmi';
import { RewardsAction } from '../lib/constants';

interface UseRewardsTransactionsParameters
  extends Pick<WidgetProps, 'addRecentTransaction' | 'onWidgetStateChange' | 'onNotification'> {
  selectedRewardContract: RewardContract | undefined;
  referralCode: number | undefined;
  amount: bigint;
  allowance: bigint | undefined;
  mutateAllowance: () => void;
  mutateTokenBalance: () => void;
  mutateRewardsBalance: () => void;
  mutateUserSuppliedBalance: () => void;
}

export const useRewardsTransactions = ({
  selectedRewardContract,
  referralCode,
  amount,
  allowance,
  addRecentTransaction,
  onWidgetStateChange,
  onNotification,
  mutateAllowance,
  mutateTokenBalance,
  mutateRewardsBalance,
  mutateUserSuppliedBalance
}: UseRewardsTransactionsParameters) => {
  const chainId = useChainId();
  const { handleOnStart, handleOnSuccess, handleOnError } = useTransactionCallbacks({
    addRecentTransaction,
    onWidgetStateChange,
    onNotification
  });
  const { i18n } = useLingui();
  const locale = i18n.locale;

  const { widgetState } = useContext(WidgetContext);

  const supplyParams = {
    contractAddress: selectedRewardContract?.contractAddress as `0x${string}`,
    supplyTokenAddress: selectedRewardContract?.supplyToken.address[chainId],
    ref: referralCode,
    amount,
    onStart: (hash?: string) => {
      handleOnStart({
        hash,
        recentTransactionDescription: t`Supplying ${formatBigInt(amount, { locale })} ${
          selectedRewardContract?.supplyToken.name ?? ''
        }`
      });
    },
    onSuccess: (hash: string | undefined) => {
      handleOnSuccess({
        hash,
        notificationTitle: t`Supply successful`,
        notificationDescription: t`You supplied ${formatBigInt(amount, { locale })} ${
          selectedRewardContract?.supplyToken.name ?? ''
        }`
      });
      mutateAllowance();
      mutateTokenBalance();
      mutateRewardsBalance();
      mutateUserSuppliedBalance();
    },
    onError: (error: Error, hash: string | undefined) => {
      handleOnError({
        error,
        hash,
        notificationTitle: t`Supply failed`,
        notificationDescription: t`Something went wrong with your transaction. Please try again.`
      });
      mutateTokenBalance();
    }
  };

  // Supply call
  const supply = useRewardsSupply({
    ...supplyParams,
    enabled: widgetState.action === RewardsAction.SUPPLY && allowance !== undefined
  });

  const batchSupply = useBatchRewardsSupply({
    ...supplyParams,
    enabled:
      (widgetState.action === RewardsAction.SUPPLY || widgetState.action === RewardsAction.APPROVE) &&
      allowance !== undefined
  });

  // Approve
  const approve = useApproveToken({
    spender: selectedRewardContract?.contractAddress as `0x${string}`,
    enabled: widgetState.action === RewardsAction.APPROVE && allowance !== undefined,
    amount: amount,
    contractAddress: selectedRewardContract?.supplyToken.address[chainId],
    onStart: (hash: string) => {
      handleOnStart({
        hash,
        recentTransactionDescription: t`Approving ${formatBigInt(amount, { locale })} ${
          selectedRewardContract?.supplyToken.name ?? ''
        }`
      });
    },
    onSuccess: hash => {
      handleOnSuccess({
        hash,
        notificationTitle: t`Approve successful`,
        notificationDescription: t`You approved ${formatBigInt(amount, { locale })} ${
          selectedRewardContract?.supplyToken.name ?? ''
        }`
      });
      mutateAllowance();
      supply.retryPrepare();
    },
    onError: (error, hash) => {
      handleOnError({
        error,
        hash,
        notificationTitle: t`Approval failed`,
        notificationDescription: t`We could not approve your token allowance.`
      });
      mutateAllowance();
    }
  });

  // Withdraw
  const withdraw = useRewardsWithdraw({
    contractAddress: selectedRewardContract?.contractAddress as `0x${string}`,
    enabled: widgetState.action === RewardsAction.WITHDRAW,
    amount: amount,
    onStart: (hash: string) => {
      handleOnStart({
        hash,
        recentTransactionDescription: t`Withdrawing ${formatBigInt(amount, { locale })} ${
          selectedRewardContract?.supplyToken.name ?? ''
        }`
      });
    },
    onSuccess: hash => {
      handleOnSuccess({
        hash,
        notificationTitle: t`Withdraw successful`,
        notificationDescription: t`You withdrew ${formatBigInt(amount, { locale })} ${
          selectedRewardContract?.supplyToken.name ?? ''
        }`
      });
      mutateTokenBalance();
      mutateRewardsBalance();
      mutateAllowance();
      mutateUserSuppliedBalance();
    },
    onError: (error, hash) => {
      handleOnError({
        error,
        hash,
        notificationTitle: t`Withdraw failed`,
        notificationDescription: t`Something went wrong with your withdraw. Please try again.`
      });
      mutateTokenBalance();
      mutateAllowance();
    }
  });

  // Harvest
  const claim = useRewardsClaim({
    contractAddress: selectedRewardContract?.contractAddress as `0x${string}`,
    onStart: (hash: string) => {
      handleOnStart({ hash, recentTransactionDescription: 'Claiming tokens' });
    },
    onSuccess: hash => {
      handleOnSuccess({
        hash,
        notificationTitle: 'Rewards claim successful',
        notificationDescription: 'You claimed your rewards!'
      });
      mutateRewardsBalance();
      mutateRewardsBalance();
      mutateTokenBalance();
    },
    onError: (error, hash) => {
      handleOnError({
        error,
        hash,
        notificationTitle: 'Claim failed',
        notificationDescription: 'Something went wrong with claiming your rewards. Please try again.'
      });
      mutateTokenBalance();
    }
  });

  return { approve, supply, batchSupply, withdraw, claim };
};
