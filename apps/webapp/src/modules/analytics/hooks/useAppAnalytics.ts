import { useCallback } from 'react';
import { usePostHog } from 'posthog-js/react';
import { useChains, useConnection } from 'wagmi';
import {
  AppEvents,
  safeCapture,
  getViewport,
  isWithdrawalFlow,
  type SelectionMethod,
  type TxStatus,
  type ErrorContext
} from '../constants';
import { useAnalyticsFlow } from '../context/AnalyticsFlowContext';
import { useSearchParams } from 'react-router-dom';
import { QueryParams } from '@/lib/constants';
import { isCowSupportedChainId } from '@jetstreamgg/sky-utils';

// Maps widget_name → module
const WIDGET_MODULE_MAP: Record<string, string> = {
  savings: 'savings',
  rewards: 'rewards',
  upgrade: 'upgrade',
  expert: 'expert',
  stake: 'stake',
  trade: 'trade',
  seal: 'seal',
  'seal-migration': 'seal-migration'
};

export function useAppAnalytics() {
  const posthog = usePostHog();
  const { address } = useConnection();
  const chains = useChains();
  const { getFlowId } = useAnalyticsFlow();
  const [searchParams] = useSearchParams();

  const getChainName = useCallback(
    (chainId: number) => chains.find(c => c.id === chainId)?.name ?? `unknown_${chainId}`,
    [chains]
  );

  const getUrlParams = useCallback(() => {
    try {
      const params: Record<string, string | number> = {};
      searchParams.forEach((value, key) => {
        if (key !== 'widget') {
          params[key] = value;
        }
      });

      const widget = searchParams.get('widget');

      // Remap input_amount → amountFrom (trade) or amount (other widgets, negative for withdrawals)
      const rawAmount = params[QueryParams.InputAmount];
      delete params[QueryParams.InputAmount];
      if (rawAmount != null) {
        const num = Number(rawAmount);
        if (!isNaN(num)) {
          if (widget === 'trade') {
            params.amountFrom = num;
          } else {
            const isWithdrawal = isWithdrawalFlow(
              widget,
              searchParams.get(QueryParams.ExpertModule),
              searchParams.get(QueryParams.Flow),
              searchParams.get(QueryParams.StakeTab),
              searchParams.get(QueryParams.SealTab)
            );
            params.amount = isWithdrawal ? -Math.abs(num) : num;
          }
        }
      }

      // Remap source_token → tokenSymbolFrom (trade) or assetSymbol (other widgets)
      const sourceToken = params[QueryParams.SourceToken];
      delete params[QueryParams.SourceToken];
      if (sourceToken != null) {
        if (widget === 'trade') {
          params.tokenSymbolFrom = sourceToken;
        } else {
          params.assetSymbol = sourceToken;
        }
      }

      // Remap target_token → tokenSymbolTo (trade only)
      const targetToken = params[QueryParams.TargetToken];
      delete params[QueryParams.TargetToken];
      if (targetToken != null && widget === 'trade') {
        params.tokenSymbolTo = targetToken;
      }

      // Remap reward → productAddress (only for rewards widget)
      const reward = params[QueryParams.Reward];
      delete params[QueryParams.Reward];
      if (reward != null && widget === 'rewards') {
        params.productAddress = reward;
      }

      // Remap expert_module → product (only for expert widget)
      const expertModule = params[QueryParams.ExpertModule];
      delete params[QueryParams.ExpertModule];
      if (expertModule != null && widget === 'expert') {
        const productNameMap: Record<string, string> = { stusds: 'stUSDS' };
        params.product = productNameMap[expertModule as string] ?? expertModule;
      }

      // Remap urn_index → urnIndex (as number)
      const urnIndex = params[QueryParams.UrnIndex];
      delete params[QueryParams.UrnIndex];
      if (urnIndex != null) {
        const num = Number(urnIndex);
        if (!isNaN(num)) {
          params.urnIndex = num;
        }
      }

      // Remap stake_tab → stakeAction (lock→stake, free→unstake)
      const stakeTab = params[QueryParams.StakeTab];
      delete params[QueryParams.StakeTab];
      if (stakeTab != null) {
        const stakeActionMap: Record<string, string> = { lock: 'stake', free: 'unstake' };
        params.stakeAction = stakeActionMap[stakeTab as string] ?? stakeTab;
      }

      return params;
    } catch {
      return {};
    }
  }, [searchParams]);

  const trackWidgetSelected = ({
    widgetName,
    previousWidget,
    selectionMethod,
    chainId
  }: {
    widgetName: string;
    previousWidget: string;
    selectionMethod: SelectionMethod;
    chainId: number;
  }) => {
    safeCapture(posthog, AppEvents.WIDGET_SELECTED, {
      widget_name: widgetName,
      previous_widget: previousWidget,
      selection_method: selectionMethod,
      chain_id: chainId,
      chain_name: getChainName(chainId),
      viewport: getViewport(),
      flow_id: getFlowId()
    });
  };

  const trackTransactionStarted = useCallback(
    ({ widgetName, chainId, action }: { widgetName: string; chainId: number; action?: string }) => {
      safeCapture(posthog, AppEvents.TRANSACTION_STARTED, {
        widget_name: widgetName,
        chain_id: chainId,
        chain_name: getChainName(chainId),
        wallet_address: address,
        ...(action && { action }),
        module: WIDGET_MODULE_MAP[widgetName] ?? widgetName,
        ...(widgetName === 'trade' && {
          flow: 'trade',
          swapProvider: isCowSupportedChainId(chainId) ? 'cowswap' : 'psm'
        }),
        timestamp: new Date().toISOString(),
        viewport: getViewport(),
        flow_id: getFlowId(),
        ...getUrlParams()
      });
    },
    [posthog, address, getChainName, getUrlParams]
  );

  const trackTransactionCompleted = useCallback(
    ({
      widgetName,
      chainId,
      txStatus,
      txHash,
      orderId,
      action,
      errorContext
    }: {
      widgetName: string;
      chainId: number;
      txStatus: TxStatus;
      txHash?: string;
      orderId?: string;
      action?: string;
      errorContext?: ErrorContext;
    }) => {
      safeCapture(posthog, AppEvents.TRANSACTION_COMPLETED, {
        widget_name: widgetName,
        chain_id: chainId,
        chain_name: getChainName(chainId),
        tx_status: txStatus,
        wallet_address: address,
        ...(action && { action }),
        ...(txHash && { tx_hash: txHash }),
        ...(orderId && { orderId }),
        ...(errorContext && { error_context: errorContext }),
        module: WIDGET_MODULE_MAP[widgetName] ?? widgetName,
        ...(widgetName === 'trade' && {
          flow: 'trade',
          swapProvider: isCowSupportedChainId(chainId) ? 'cowswap' : 'psm'
        }),
        timestamp: new Date().toISOString(),
        viewport: getViewport(),
        flow_id: getFlowId(),
        ...getUrlParams()
      });
    },
    [posthog, address, getChainName, getUrlParams]
  );

  const trackWidgetReviewViewed = useCallback(
    ({
      widgetName,
      chainId,
      flow,
      action
    }: {
      widgetName: string;
      chainId: number;
      flow: string;
      action?: string;
    }) => {
      safeCapture(posthog, AppEvents.WIDGET_REVIEW_VIEWED, {
        widget_name: widgetName,
        chain_id: chainId,
        chain_name: getChainName(chainId),
        flow,
        ...(action && { action }),
        wallet_address: address,
        module: WIDGET_MODULE_MAP[widgetName] ?? widgetName,
        ...(widgetName === 'trade' && {
          swapProvider: isCowSupportedChainId(chainId) ? 'cowswap' : 'psm'
        }),
        timestamp: new Date().toISOString(),
        viewport: getViewport(),
        flow_id: getFlowId()
      });
    },
    [posthog, address, getChainName]
  );

  const trackDetailsPaneToggled = ({
    toggleAction,
    activeWidget,
    chatWasOpen
  }: {
    toggleAction: 'open' | 'close';
    activeWidget: string;
    chatWasOpen: boolean;
  }) => {
    safeCapture(posthog, AppEvents.DETAILS_PANE_TOGGLED, {
      toggle_action: toggleAction,
      active_widget: activeWidget,
      chat_was_open: chatWasOpen,
      viewport: getViewport()
    });
  };

  const trackChatPaneToggled = ({
    toggleAction,
    activeWidget,
    detailsWasOpen
  }: {
    toggleAction: 'open' | 'close';
    activeWidget: string;
    detailsWasOpen: boolean;
  }) => {
    safeCapture(posthog, AppEvents.CHAT_PANE_TOGGLED, {
      toggle_action: toggleAction,
      active_widget: activeWidget,
      details_was_open: detailsWasOpen,
      viewport: getViewport()
    });
  };

  const trackWalletConnected = useCallback(
    ({ walletName }: { walletName: string }) => {
      safeCapture(posthog, AppEvents.WALLET_CONNECTED, {
        wallet_name: walletName,
        viewport: getViewport()
      });
    },
    [posthog]
  );

  const trackWalletDisconnected = useCallback(
    ({ walletName }: { walletName: string }) => {
      safeCapture(posthog, AppEvents.WALLET_DISCONNECTED, {
        wallet_name: walletName,
        viewport: getViewport()
      });
    },
    [posthog]
  );

  return {
    trackWidgetSelected,
    trackTransactionStarted,
    trackTransactionCompleted,
    trackWidgetReviewViewed,
    trackDetailsPaneToggled,
    trackChatPaneToggled,
    trackWalletConnected,
    trackWalletDisconnected
  };
}
