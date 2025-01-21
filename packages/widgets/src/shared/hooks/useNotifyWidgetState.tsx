import { useEffect } from 'react';
import { WidgetStateChangeParams } from '../types/widgetState';

export const useNotifyWidgetState = ({
  hash,
  widgetState,
  txStatus,
  targetToken,
  executedBuyAmount,
  executedSellAmount,
  onWidgetStateChange
}: WidgetStateChangeParams & {
  onWidgetStateChange?: ({
    hash,
    widgetState,
    txStatus,
    targetToken,
    executedBuyAmount,
    executedSellAmount
  }: WidgetStateChangeParams) => void;
}) => {
  useEffect(() => {
    onWidgetStateChange?.({
      hash,
      txStatus,
      widgetState,
      targetToken,
      executedBuyAmount,
      executedSellAmount
    });
  }, [hash, txStatus, widgetState, targetToken, executedBuyAmount, executedSellAmount, onWidgetStateChange]);
};
