import { useEffect, useRef } from 'react';
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
  const prevStateRef = useRef({
    hash,
    txStatus,
    widgetState,
    targetToken,
    executedBuyAmount,
    executedSellAmount
  });

  useEffect(() => {
    const prevState = prevStateRef.current;

    // Only notify if there's an actual change in any of the values
    if (
      onWidgetStateChange &&
      (prevState.hash !== hash ||
        prevState.txStatus !== txStatus ||
        prevState.widgetState !== widgetState ||
        prevState.targetToken !== targetToken ||
        prevState.executedBuyAmount !== executedBuyAmount ||
        prevState.executedSellAmount !== executedSellAmount)
    ) {
      onWidgetStateChange({
        hash,
        txStatus,
        widgetState,
        targetToken,
        executedBuyAmount,
        executedSellAmount
      });

      // Update the ref with current values
      prevStateRef.current = {
        hash,
        txStatus,
        widgetState,
        targetToken,
        executedBuyAmount,
        executedSellAmount
      };
    }
  }, [hash, txStatus, widgetState, targetToken, executedBuyAmount, executedSellAmount, onWidgetStateChange]);
};
