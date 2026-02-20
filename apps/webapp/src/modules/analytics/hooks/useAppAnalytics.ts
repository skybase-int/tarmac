import { useCallback } from 'react';
import { usePostHog } from 'posthog-js/react';
import { useChains, useConnection } from 'wagmi';
import {
  AppEvents,
  safeCapture,
  getViewport,
  type SelectionMethod,
  type TxStatus,
  type ErrorContext
} from '../constants';

export function useAppAnalytics() {
  const posthog = usePostHog();
  const { address } = useConnection();
  const chains = useChains();

  const getChainName = useCallback(
    (chainId: number) => chains.find(c => c.id === chainId)?.name ?? `unknown_${chainId}`,
    [chains]
  );

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
      viewport: getViewport()
    });
  };

  const trackWidgetFlowStarted = useCallback(
    ({ widgetName, chainId }: { widgetName: string; chainId: number }) => {
      safeCapture(posthog, AppEvents.WIDGET_FLOW_STARTED, {
        widget_name: widgetName,
        chain_id: chainId,
        chain_name: getChainName(chainId),
        viewport: getViewport()
      });
    },
    [posthog, getChainName]
  );

  const trackWidgetFlowCompleted = useCallback(
    ({
      widgetName,
      chainId,
      txStatus,
      errorContext
    }: {
      widgetName: string;
      chainId: number;
      txStatus: TxStatus;
      errorContext?: ErrorContext;
    }) => {
      safeCapture(posthog, AppEvents.WIDGET_FLOW_COMPLETED, {
        widget_name: widgetName,
        chain_id: chainId,
        chain_name: getChainName(chainId),
        tx_status: txStatus,
        ...(errorContext && { error_context: errorContext }),
        viewport: getViewport()
      });
    },
    [posthog, getChainName]
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

  const trackTransactionSuccess = useCallback(
    ({ txHash, widgetName, chainId }: { txHash: string; widgetName: string; chainId: number }) => {
      safeCapture(posthog, AppEvents.TRANSACTION_SUCCESS, {
        tx_hash: txHash,
        wallet_address: address,
        widget_name: widgetName,
        chain_id: chainId,
        chain_name: getChainName(chainId),
        viewport: getViewport()
      });
    },
    [posthog, address, getChainName]
  );

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
    trackWidgetFlowStarted,
    trackWidgetFlowCompleted,
    trackTransactionSuccess,
    trackDetailsPaneToggled,
    trackChatPaneToggled,
    trackWalletConnected,
    trackWalletDisconnected
  };
}
