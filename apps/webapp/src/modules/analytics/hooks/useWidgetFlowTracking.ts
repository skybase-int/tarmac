import { useRef, useCallback } from 'react';
import { TxStatus as WidgetTxStatus, type WidgetStateChangeParams } from '@jetstreamgg/sky-widgets';
import { useAppAnalytics } from './useAppAnalytics';
import { reportAnalyticsError } from '../constants';

/**
 * Higher-order hook that wraps any widget's onWidgetStateChange handler
 * to track transaction start/complete transitions.
 *
 * Usage in each widget pane:
 * ```
 * const { wrapStateChange } = useWidgetFlowTracking('trade', chainId);
 * <Widget onWidgetStateChange={wrapStateChange(onTradeWidgetStateChange)} />
 * ```
 */
export function useWidgetFlowTracking(widgetName: string, chainId: number) {
  const { trackTransactionStarted, trackTransactionCompleted } = useAppAnalytics();
  const prevTxStatusRef = useRef<WidgetTxStatus | null>(null);

  const wrapStateChange = useCallback(
    (originalHandler: (params: WidgetStateChangeParams) => void) => {
      return (params: WidgetStateChangeParams) => {
        // Always call the original handler first — analytics must never block functionality
        originalHandler(params);

        try {
          const prev = prevTxStatusRef.current;
          const curr = params.txStatus;
          prevTxStatusRef.current = curr;

          // Transaction started: transition to INITIALIZED
          if (curr === WidgetTxStatus.INITIALIZED && prev !== WidgetTxStatus.INITIALIZED) {
            trackTransactionStarted({ widgetName, chainId });
          }

          // Transaction completed: transition to SUCCESS
          if (curr === WidgetTxStatus.SUCCESS && prev !== WidgetTxStatus.SUCCESS) {
            trackTransactionCompleted({
              widgetName,
              chainId,
              txStatus: 'success',
              txHash: params.hash
            });
          }

          // Transaction completed: transition to ERROR
          if (curr === WidgetTxStatus.ERROR && prev !== WidgetTxStatus.ERROR) {
            trackTransactionCompleted({
              widgetName,
              chainId,
              txStatus: 'error'
            });
          }

          // Transaction completed: transition to CANCELLED
          if (curr === WidgetTxStatus.CANCELLED && prev !== WidgetTxStatus.CANCELLED) {
            trackTransactionCompleted({
              widgetName,
              chainId,
              txStatus: 'cancelled'
            });
          }
        } catch (error) {
          reportAnalyticsError(`useWidgetFlowTracking:${widgetName}`, error);
        }
      };
    },
    [widgetName, chainId, trackTransactionStarted, trackTransactionCompleted]
  );

  return { wrapStateChange };
}
