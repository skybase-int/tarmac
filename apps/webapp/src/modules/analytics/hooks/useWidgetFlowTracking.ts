import { useRef, useCallback } from 'react';
import { TxStatus as WidgetTxStatus, type WidgetStateChangeParams } from '@jetstreamgg/sky-widgets';
import { useAppAnalytics } from './useAppAnalytics';
import { reportAnalyticsError, startNewFlow } from '../constants';

/**
 * Higher-order hook that wraps any widget's onWidgetStateChange handler
 * to track transaction start/complete transitions and review screen views.
 *
 * Usage in each widget pane:
 * ```
 * const { wrapStateChange } = useWidgetFlowTracking('trade', chainId);
 * <Widget onWidgetStateChange={wrapStateChange(onTradeWidgetStateChange)} />
 * ```
 */
export function useWidgetFlowTracking(widgetName: string, chainId: number) {
  const { trackTransactionStarted, trackTransactionCompleted, trackWidgetReviewViewed } = useAppAnalytics();
  const prevTxStatusRef = useRef<WidgetTxStatus | null>(null);
  const prevScreenRef = useRef<string | null>(null);

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
            startNewFlow();
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
          // Review screen viewed: track when user reaches the review/confirmation screen
          const screen = params.widgetState?.screen;
          if (screen !== prevScreenRef.current) {
            prevScreenRef.current = screen;
            if (screen === 'review') {
              trackWidgetReviewViewed({
                widgetName,
                chainId,
                flow: params.widgetState?.flow
              });
            }
          }
        } catch (error) {
          reportAnalyticsError(`useWidgetFlowTracking:${widgetName}`, error);
        }
      };
    },
    [widgetName, chainId, trackTransactionStarted, trackTransactionCompleted, trackWidgetReviewViewed]
  );

  return { wrapStateChange };
}
