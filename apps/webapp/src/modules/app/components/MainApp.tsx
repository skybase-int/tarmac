import { useEffect, useMemo } from 'react';
import { WidgetPane } from './WidgetPane';
import { DetailsPane } from './DetailsPane';
import { AppContainer } from './AppContainer';
import { useSearchParams } from 'react-router-dom';
import {
  CHAIN_WIDGET_MAP,
  CHATBOT_ENABLED,
  BATCH_TX_ENABLED,
  COMING_SOON_MAP,
  QueryParams,
  mapQueryParamToIntent
} from '@/lib/constants';
import { Intent } from '@/lib/enums';
import { useConfigContext } from '@/modules/config/hooks/useConfigContext';
import { validateLinkedActionSearchParams, validateSearchParams } from '@/modules/utils/validateSearchParams';
import { useAvailableTokenRewardContracts, useTokenBalance, TOKENS } from '@jetstreamgg/sky-hooks';
import { parseEther } from 'viem';
import { useAccount, useAccountEffect, useChainId, useChains, useSwitchChain } from 'wagmi';
import { BP, useBreakpointIndex } from '@/modules/ui/hooks/useBreakpointIndex';
import { LinkedActionSteps } from '@/modules/config/context/ConfigContext';
import { useSendMessage } from '@/modules/chat/hooks/useSendMessage';
import { ChatPane } from './ChatPane';
import { useChatNotification } from '../hooks/useChatNotification';
import { useBatchTxNotification } from '../hooks/useBatchTxNotification';
import { useSafeAppNotification } from '../hooks/useSafeAppNotification';
import { TOAST_STORAGE_KEY, useGovernanceMigrationToast } from '../hooks/useGovernanceMigrationToast';
import { useNotificationQueue, NotificationConfig } from '../hooks/useNotificationQueue';
import { normalizeUrlParam } from '@/lib/helpers/string/normalizeUrlParam';

export function MainApp() {
  const {
    userConfig,
    updateUserConfig,
    linkedActionConfig,
    updateLinkedActionConfig,
    setSelectedRewardContract
  } = useConfigContext();

  const { bpi } = useBreakpointIndex();

  const { intent } = userConfig;
  const chainId = useChainId();
  const chains = useChains();

  const { connector, address, isConnected } = useAccount();
  useAccountEffect({
    // Once the user connects their wallet, check if the network param is set and switch chains if necessary
    onConnect() {
      const parsedChainId = chains.find(
        chain => normalizeUrlParam(chain.name) === normalizeUrlParam(network || '')
      )?.id;
      if (parsedChainId) {
        switchChain({ chainId: parsedChainId });
      }
    }
  });

  const { switchChain } = useSwitchChain({
    mutation: {
      onError: err => {
        // If the user rejects the network switch request, update the network query param to the current chain
        if (err.name === 'UserRejectedRequestError') {
          const chainName = chains.find(c => c.id === chainId)?.name;
          if (chainName) {
            setSearchParams(params => {
              params.set(QueryParams.Network, normalizeUrlParam(chainName));
              return params;
            });
          }
        }
      }
    }
  });

  const { sendMessage } = useSendMessage();
  const [searchParams, setSearchParams] = useSearchParams();

  const widgetParam = searchParams.get(QueryParams.Widget);
  const detailsParam = !(searchParams.get(QueryParams.Details) === 'false');
  const rewardContract = searchParams.get(QueryParams.Reward) || undefined;
  const sourceToken = searchParams.get(QueryParams.SourceToken) || undefined;
  const targetToken = searchParams.get(QueryParams.TargetToken) || undefined;
  const linkedAction = searchParams.get(QueryParams.LinkedAction) || undefined;
  const inputAmount = searchParams.get(QueryParams.InputAmount) || undefined;
  const timestamp = searchParams.get(QueryParams.Timestamp) || undefined;
  const network = searchParams.get(QueryParams.Network) || undefined;
  const chatParam =
    CHATBOT_ENABLED &&
    (bpi >= BP['3xl']
      ? !(searchParams.get(QueryParams.Chat) === 'false')
      : searchParams.get(QueryParams.Chat) === 'true');

  const newChainId = network
    ? (chains.find(chain => normalizeUrlParam(chain.name) === normalizeUrlParam(network))?.id ?? chainId)
    : chainId;

  const rewardContracts = useAvailableTokenRewardContracts(newChainId);

  // step is initialized as 0 and will evaluate to false, setting the first step to 1
  const step = linkedAction ? linkedActionConfig.step || 1 : 0;

  // Get MKR balance to determine if governance notification will actually show
  const { data: mkrBalance, isLoading: mkrBalanceLoading } = useTokenBalance({
    address,
    token: TOKENS.mkr.address[chainId],
    chainId: chainId,
    enabled: isConnected && !!address
  });

  // Check if user is eligible for governance migration notification
  const minimumMkrBalance = parseEther('0.05');
  const mkrBalanceLoaded = isConnected ? mkrBalance !== undefined && !mkrBalanceLoading : true;
  const hasEnoughMkr = !!(mkrBalance && mkrBalance.value >= minimumMkrBalance);

  // Define notification configurations with priority order
  const notificationConfigs: NotificationConfig[] = useMemo(
    () => [
      {
        id: 'batch-tx',
        priority: 1,
        checkConditions: () => BATCH_TX_ENABLED,
        hasBeenShown: () => userConfig.batchTxNotificationShown
      },
      {
        id: 'governance-migration',
        priority: 2,
        isReady: () => mkrBalanceLoaded, // Wait for MKR balance to load
        checkConditions: () => isConnected && hasEnoughMkr,
        hasBeenShown: () => localStorage.getItem(TOAST_STORAGE_KEY) === 'true'
      },
      {
        id: 'chat',
        priority: 3,
        checkConditions: () => CHATBOT_ENABLED,
        hasBeenShown: () => userConfig.chatSuggested
      }
    ],
    [
      isConnected,
      mkrBalanceLoaded,
      hasEnoughMkr,
      userConfig.batchTxNotificationShown,
      userConfig.chatSuggested,
      BATCH_TX_ENABLED,
      CHATBOT_ENABLED
    ]
  );

  // Use the notification queue to determine which notification to show
  const { shouldShowNotification } = useNotificationQueue(notificationConfigs);

  // Notification Priority System (only one notification per page load):
  // 1. EIP7702 Batch Transaction (highest priority)
  // 2. Governance Migration (for connected wallets with MKR ≥ 0.05)
  // 3. Chat Notification (lowest priority)

  // Display notifications based on queue priority
  useBatchTxNotification({ isAuthorized: shouldShowNotification('batch-tx') });
  useGovernanceMigrationToast({ isAuthorized: shouldShowNotification('governance-migration') });
  useChatNotification({ isAuthorized: shouldShowNotification('chat') });

  // If the user is connected to a Safe Wallet using WalletConnect, notify they can use the Safe App
  useSafeAppNotification();

  // Run validation on search params whenever search params change
  useEffect(() => {
    setSearchParams(
      params => {
        // Runs initial validation for globally allowed params
        const validatedParams = validateSearchParams(
          params,
          rewardContracts,
          widgetParam || '',
          setSelectedRewardContract,
          newChainId,
          chains
        );
        // Runs second validation for linked-action-specific criteria
        const validatedLinkedActionParams = validateLinkedActionSearchParams(validatedParams);
        return validatedLinkedActionParams;
      },
      { replace: true }
    );
  }, [searchParams, rewardContracts, setSelectedRewardContract, widgetParam]);

  useEffect(() => {
    // If there's no network param, default to the current chain
    if (!network) {
      const chainName = chains.find(c => c.id === chainId)?.name;
      if (chainName)
        setSearchParams(params => {
          params.set(QueryParams.Network, normalizeUrlParam(chainName));
          return params;
        });
    } else {
      // If the network param doesn't match the current chain, switch chains
      const parsedChainId = chains.find(
        chain => normalizeUrlParam(chain.name) === normalizeUrlParam(network)
      )?.id;
      if (parsedChainId && parsedChainId !== chainId) {
        switchChain({ chainId: parsedChainId });
      }
    }
  }, [network]);

  useEffect(() => {
    // If the user changes the network in their wallet, update the `network` query param
    const handleChainChange = ({ chainId: newChainId }: { chainId?: number | undefined }) => {
      const newChainName = chains.find(c => c.id === newChainId)?.name;
      if (newChainName) {
        setSearchParams(params => {
          params.set(QueryParams.Network, normalizeUrlParam(newChainName));
          return params;
        });
      }
    };

    const emitter = connector?.emitter;
    emitter?.on('change', handleChainChange);

    // Cleanup function to remove the listener
    return () => {
      emitter?.off('change', handleChainChange);
    };
  }, [chains, connector, setSearchParams]);

  useEffect(() => {
    // Updates the active widget pane in the config
    let validatedWidgetParam: Intent | undefined;
    if (widgetParam) {
      validatedWidgetParam = mapQueryParamToIntent(widgetParam);
    }

    updateUserConfig({
      ...userConfig,
      // If user selected intent is not available for the current network, default to the balances intent
      intent:
        validatedWidgetParam ??
        // Use the user config intent if found in the chain widget map, but not on the coming soon map for the given network
        CHAIN_WIDGET_MAP[chainId].find(
          intent =>
            intent === mapQueryParamToIntent(userConfig.intent) &&
            // If there is no coming soon map for the current network, default to true
            (COMING_SOON_MAP[chainId]?.includes(mapQueryParamToIntent(userConfig.intent)) ?? true)
        ) ??
        Intent.BALANCES_INTENT
    });
  }, [widgetParam, userConfig.intent]);

  useEffect(() => {
    updateLinkedActionConfig({
      sourceToken,
      targetToken,
      // Only update the initialAction value if we are on the first widget
      initialAction:
        step < LinkedActionSteps.COMPLETED_CURRENT ? widgetParam : linkedActionConfig.initialAction,
      linkedAction,
      inputAmount,
      rewardContract,
      step,
      showLinkedAction: !!linkedAction,
      timestamp
    });
  }, [
    sourceToken,
    targetToken,
    linkedAction,
    inputAmount,
    step,
    widgetParam,
    linkedActionConfig.initialAction
  ]);

  return (
    <AppContainer>
      {(bpi > BP.sm || !chatParam) && (
        <WidgetPane key={`widget-pane-${bpi}`} intent={intent}>
          {bpi === BP.sm && detailsParam && <DetailsPane intent={intent} />}
        </WidgetPane>
      )}
      {(bpi >= BP.xl || (bpi > BP.sm && !chatParam)) && detailsParam && <DetailsPane intent={intent} />}
      {chatParam && <ChatPane sendMessage={sendMessage} />}
    </AppContainer>
  );
}
