import {
  useBatchStUsdsDeposit,
  useStUsdsWithdraw,
  useBatchCurveSwap,
  StUsdsProviderType
} from '@jetstreamgg/sky-hooks';
import { WidgetContext } from '@widgets/context/WidgetContext';
import { WidgetProps } from '@widgets/shared/types/widgetState';
import { useContext } from 'react';
import { StUSDSAction } from '../lib/constants';
import { useStUsdsTransactionCallbacks } from './useStUsdsTransactionCallbacks';

interface UseStUsdsTransactionsParameters
  extends Pick<WidgetProps, 'addRecentTransaction' | 'onWidgetStateChange' | 'onNotification'> {
  amount: bigint;
  referralCode: number | undefined;
  max: boolean;
  shouldUseBatch: boolean;
  mutateAllowance: () => void;
  mutateStUsds: () => void;
  selectedProvider: StUsdsProviderType;
  expectedOutput: bigint;
}

export const useStUsdsTransactions = ({
  amount,
  referralCode,
  max,
  shouldUseBatch,
  mutateAllowance,
  mutateStUsds,
  addRecentTransaction,
  onWidgetStateChange,
  onNotification,
  selectedProvider,
  expectedOutput
}: UseStUsdsTransactionsParameters) => {
  const { widgetState } = useContext(WidgetContext);
  const { supplyTransactionCallbacks, withdrawTransactionCallbacks } = useStUsdsTransactionCallbacks({
    amount,
    addRecentTransaction,
    onWidgetStateChange,
    onNotification,
    mutateAllowance,
    mutateStUsds,
    selectedProvider
  });

  const isCurve = selectedProvider === StUsdsProviderType.CURVE;

  // Native stUSDS deposit
  const batchStUsdsDeposit = useBatchStUsdsDeposit({
    amount,
    referral: referralCode,
    shouldUseBatch,
    enabled:
      !isCurve && (widgetState.action === StUSDSAction.SUPPLY || widgetState.action === StUSDSAction.APPROVE),
    ...supplyTransactionCallbacks
  });

  // Native stUSDS withdraw
  const stUsdsWithdraw = useStUsdsWithdraw({
    amount,
    max,
    enabled: !isCurve && widgetState.action === StUSDSAction.WITHDRAW,
    ...withdrawTransactionCallbacks
  });

  // Curve swap for supply (USDS -> stUSDS)
  const curveSupplySwap = useBatchCurveSwap({
    direction: 'deposit',
    inputAmount: amount,
    expectedOutput,
    shouldUseBatch,
    enabled:
      isCurve && (widgetState.action === StUSDSAction.SUPPLY || widgetState.action === StUSDSAction.APPROVE),
    ...supplyTransactionCallbacks
  });

  // Curve swap for withdraw (stUSDS -> USDS)
  const curveWithdrawSwap = useBatchCurveSwap({
    direction: 'withdraw',
    inputAmount: amount,
    expectedOutput,
    shouldUseBatch,
    enabled: isCurve && widgetState.action === StUSDSAction.WITHDRAW,
    ...withdrawTransactionCallbacks
  });

  // Return the appropriate hooks based on provider
  return {
    batchStUsdsDeposit: isCurve ? curveSupplySwap : batchStUsdsDeposit,
    stUsdsWithdraw: isCurve ? curveWithdrawSwap : stUsdsWithdraw
  };
};
