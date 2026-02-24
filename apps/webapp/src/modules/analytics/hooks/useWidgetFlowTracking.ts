import { useRef, useCallback } from 'react';
import { TxStatus as WidgetTxStatus, type WidgetStateChangeParams } from '@jetstreamgg/sky-widgets';
import { useAppAnalytics } from './useAppAnalytics';
import { reportAnalyticsError } from '../constants';
import { useAnalyticsFlow } from '../context/AnalyticsFlowContext';

/**
 * Higher-order hook that wraps any widget's onWidgetStateChange handler
 * to track flow start/complete transitions.
 *
 * Usage in each widget pane:
 * ```
 * const { wrapStateChange } = useWidgetFlowTracking('trade', chainId);
 * <Widget onWidgetStateChange={wrapStateChange(onTradeWidgetStateChange)} />
 * ```
 */
export function useWidgetFlowTracking(widgetName: string, chainId: number) {
  const { trackWidgetFlowStarted, trackWidgetFlowCompleted } = useAppAnalytics();
  const { startNewFlow } = useAnalyticsFlow();
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

          // Flow started: transition to INITIALIZED
          if (curr === WidgetTxStatus.INITIALIZED && prev !== WidgetTxStatus.INITIALIZED) {
            trackWidgetFlowStarted({ widgetName, chainId });
          }

          // Flow completed: transition to SUCCESS
          if (curr === WidgetTxStatus.SUCCESS && prev !== WidgetTxStatus.SUCCESS) {
            trackWidgetFlowCompleted({
              widgetName,
              chainId,
              txStatus: 'success'
            });
            startNewFlow();
          }

          // Flow completed: transition to ERROR
          if (curr === WidgetTxStatus.ERROR && prev !== WidgetTxStatus.ERROR) {
            trackWidgetFlowCompleted({
              widgetName,
              chainId,
              txStatus: 'error'
            });
          }

          // Flow completed: transition to CANCELLED
          if (curr === WidgetTxStatus.CANCELLED && prev !== WidgetTxStatus.CANCELLED) {
            trackWidgetFlowCompleted({
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
    [widgetName, chainId, trackWidgetFlowStarted, trackWidgetFlowCompleted, startNewFlow]
  );

  return { wrapStateChange };
}
