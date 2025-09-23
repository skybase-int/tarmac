import { Balances, Upgrade, Trade, RewardsModule, Savings, Stake, Expert } from '../../icons';
import { ExpertIntent, Intent } from '@/lib/enums';
import { useLingui } from '@lingui/react';
import { useCustomConnectModal } from '@/modules/ui/hooks/useCustomConnectModal';
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';
import {
  ExpertIntentMapping,
  BATCH_TX_LEGAL_NOTICE_URL,
  COMING_SOON_MAP,
  mapIntentToQueryParam,
  QueryParams,
  RESTRICTED_INTENTS
} from '@/lib/constants';
import { isExpertModulesEnabled } from '@/lib/feature-flags';
import { WidgetNavigation } from '@/modules/app/components/WidgetNavigation';
import { withErrorBoundary } from '@/modules/utils/withErrorBoundary';
import { DualSwitcher } from '@/components/DualSwitcher';
import { IconProps } from '@/modules/icons/Icon';
import { UpgradeWidgetPane } from '@/modules/upgrade/components/UpgradeWidgetPane';
import { RewardsWidgetPane } from '@/modules/rewards/components/RewardsWidgetPane';
import { TradeWidgetPane } from '@/modules/trade/components/TradeWidgetPane';
import { SavingsWidgetPane } from '@/modules/savings/components/SavingsWidgetPane';
import { useConnectedContext } from '@/modules/ui/context/ConnectedContext';
import React, { useEffect } from 'react';
import { useNotification } from '../hooks/useNotification';
import { useActionForToken } from '../hooks/useActionForToken';
import { getRetainedQueryParams } from '@/modules/ui/hooks/useRetainedQueryParams';
import { useConfigContext } from '@/modules/config/hooks/useConfigContext';
import { defaultConfig } from '@/modules/config/default-config';
import { useChainId } from 'wagmi';
import { BalancesWidgetPane } from '@/modules/balances/components/BalancesWidgetPane';
import { StakeWidgetPane } from '@/modules/stake/components/StakeWidgetPane';
import { getSupportedChainIds, getMainnetChainName } from '@/data/wagmi/config/config.default';
import { useSearchParams } from 'react-router-dom';
import { useChains } from 'wagmi';
import { useBalanceFilters } from '@/modules/ui/context/BalanceFiltersContext';
import { WidgetContent, WidgetItem } from '../types/Widgets';
import { isL2ChainId } from '@jetstreamgg/sky-utils';
import { ExpertWidgetPane } from '@/modules/expert/components/ExpertWidgetPane';

type WidgetPaneProps = {
  intent: Intent;
  children?: React.ReactNode;
};

export const WidgetPane = ({ intent, children }: WidgetPaneProps) => {
  const { i18n } = useLingui();
  const chainId = useChainId();
  const onConnect = useCustomConnectModal();
  const addRecentTransaction = useAddRecentTransaction();
  const { isConnectedAndAcceptedTerms } = useConnectedContext();
  const onNotification = useNotification();
  const { onExternalLinkClicked } = useConfigContext();
  const { hideZeroBalances, setHideZeroBalances, showAllNetworks, setShowAllNetworks } = useBalanceFilters();
  const locale = i18n.locale;

  const isRestrictedBuild = import.meta.env.VITE_RESTRICTED_BUILD === 'true';
  const referralCode = Number(import.meta.env.VITE_REFERRAL_CODE) || 0; // fallback to 0 if invalid

  const rightHeaderComponent = <DualSwitcher className="hidden lg:flex" />;

  const { Locale, Details } = QueryParams;
  const retainedParams = [Locale, Details];
  const [searchParams, setSearchParams] = useSearchParams();

  const sharedProps = {
    onConnect,
    addRecentTransaction,
    locale,
    rightHeaderComponent,
    onNotification,
    enabled: isConnectedAndAcceptedTerms,
    onExternalLinkClicked,
    referralCode,
    shouldReset: searchParams.get(QueryParams.Reset) === 'true',
    legalBatchTxUrl: BATCH_TX_LEGAL_NOTICE_URL
  };

  const getQueryParams = (url: string) => getRetainedQueryParams(url, retainedParams, searchParams);

  const actionForToken = useActionForToken();

  const mainnetName = getMainnetChainName(chainId);

  const rewardsUrl = getQueryParams(
    `/?network=${mainnetName}&widget=${mapIntentToQueryParam(Intent.REWARDS_INTENT)}`
  );

  const supportedChainIds = getSupportedChainIds(chainId);

  const chains = useChains();

  const savingsUrlMap: Record<number, string> = {};
  for (const chainId of supportedChainIds) {
    savingsUrlMap[chainId] = getQueryParams(
      `/?network=${chains.find(c => c.id === chainId)?.name}&widget=${mapIntentToQueryParam(Intent.SAVINGS_INTENT)}`
    );
  }

  const sealUrl = `/seal-engine${getQueryParams(`/?network=${mainnetName}`)}`;
  const stakeUrl = getQueryParams(
    `/?network=${mainnetName}&widget=${mapIntentToQueryParam(Intent.STAKE_INTENT)}`
  );
  // Attempt to redirect to the stUSDS module, but if user hasn't acknowledged the risk checkbox,
  // they will be redirected to the overview of the expert widget
  // Only generate URL if expert modules are enabled
  const stusdsUrl = isExpertModulesEnabled()
    ? getQueryParams(
        `/?network=${mainnetName}&widget=${mapIntentToQueryParam(Intent.EXPERT_INTENT)}&expert_module=${ExpertIntentMapping[ExpertIntent.STUSDS_INTENT]}`
      )
    : undefined;

  const widgetItems: WidgetItem[] = [
    [
      Intent.BALANCES_INTENT,
      'Balances',
      Balances,
      withErrorBoundary(
        <BalancesWidgetPane
          {...sharedProps}
          hideModuleBalances={isRestrictedBuild}
          actionForToken={actionForToken}
          rewardsCardUrl={rewardsUrl}
          savingsCardUrlMap={savingsUrlMap}
          sealCardUrl={sealUrl}
          stakeCardUrl={stakeUrl}
          stusdsCardUrl={stusdsUrl}
          customTokenMap={defaultConfig.balancesTokenList}
          chainIds={getSupportedChainIds(chainId)}
          hideZeroBalances={hideZeroBalances}
          setHideZeroBalances={setHideZeroBalances}
          showAllNetworks={showAllNetworks}
          setShowAllNetworks={setShowAllNetworks}
        />
      ),
      false,
      undefined,
      'Manage your Sky Ecosystem funds across supported networks'
    ],
    [
      Intent.REWARDS_INTENT,
      'Rewards',
      RewardsModule,
      withErrorBoundary(<RewardsWidgetPane {...sharedProps} />),
      false,
      undefined,
      'Use USDS to access Sky Token Rewards'
    ],
    [
      Intent.SAVINGS_INTENT,
      'Savings',
      Savings,
      withErrorBoundary(<SavingsWidgetPane {...sharedProps} />),
      false,
      undefined,
      isL2ChainId(chainId)
        ? 'Use USDS or USDC to access the Sky Savings Rate'
        : 'Use USDS to access the Sky Savings Rate'
    ],
    [
      Intent.UPGRADE_INTENT,
      'Upgrade',
      Upgrade,
      withErrorBoundary(<UpgradeWidgetPane {...sharedProps} />),
      false,
      undefined,
      'Upgrade your DAI to USDS and MKR to SKY'
    ],
    [
      Intent.TRADE_INTENT,
      'Trade',
      Trade,
      withErrorBoundary(<TradeWidgetPane {...sharedProps} />),
      false,
      undefined,
      'Trade popular tokens for Sky Ecosystem tokens'
    ],
    [
      Intent.STAKE_INTENT,
      'Stake',
      Stake,
      withErrorBoundary(<StakeWidgetPane {...sharedProps} />),
      false,
      undefined,
      'Stake SKY to earn rewards, delegate votes, and borrow USDS'
    ],
    ...(isExpertModulesEnabled()
      ? [
          [
            Intent.EXPERT_INTENT,
            'Expert',
            Expert,
            withErrorBoundary(<ExpertWidgetPane {...sharedProps} />),
            false,
            undefined,
            'Higher-Risk Options: For experienced users'
          ]
        ]
      : [])
  ]
    .filter(([intent]) => !RESTRICTED_INTENTS.includes(intent as Intent))
    .map(([intent, label, icon, component, , , description]) => {
      const comingSoon = COMING_SOON_MAP[chainId]?.includes(intent as Intent);
      return [
        intent as Intent,
        label as string,
        icon as (props: IconProps) => React.ReactNode,
        comingSoon ? null : (component as React.ReactNode),
        comingSoon,
        comingSoon ? { disabled: true } : undefined,
        description as string
      ];
    }) as WidgetItem[];

  // Group the widgets in categories
  const widgetContent: WidgetContent = [
    {
      id: 'group-1',
      items: widgetItems.filter(([intent]) => intent === Intent.BALANCES_INTENT)
    },
    {
      id: 'group-2',
      items: widgetItems.filter(
        ([intent]) =>
          intent === Intent.REWARDS_INTENT ||
          intent === Intent.SAVINGS_INTENT ||
          intent === Intent.STAKE_INTENT
      )
    },
    {
      id: 'group-3',
      items: widgetItems.filter(
        ([intent]) => intent === Intent.UPGRADE_INTENT || intent === Intent.TRADE_INTENT
      )
    },
    {
      id: 'group-4',
      items: widgetItems.filter(([intent]) => intent === Intent.EXPERT_INTENT)
    }
  ];

  useEffect(() => {
    if (!searchParams.get(QueryParams.Reset)) return;

    const timer = setTimeout(() => {
      setSearchParams(prev => {
        prev.delete(QueryParams.Reset);
        return prev;
      });
    }, 500);

    return () => clearTimeout(timer); // cleanup
  }, [searchParams, setSearchParams]);

  // Show all widget items regardless of network for better discoverability
  // Auto-switching will be handled in WidgetNavigation
  const filteredWidgetContent: WidgetContent = widgetContent.filter(group => group.items.length > 0);

  return (
    <WidgetNavigation widgetContent={filteredWidgetContent} intent={intent} currentChainId={chainId}>
      {children}
    </WidgetNavigation>
  );
};
