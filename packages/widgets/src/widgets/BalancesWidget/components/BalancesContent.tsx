import { type GetBalanceData } from 'wagmi/query';
import { Tabs, TabsContent } from '@widgets/components/ui/tabs';
import { VStack } from '@widgets/shared/components/ui/layout/VStack';
import { TokenBalances } from './TokenBalances';
import { BalancesHistory } from './BalancesHistory';
import { BalancesTabsList } from './BalancesTabsList';
import { ModulesBalances } from './ModulesBalances';
import { motion } from 'framer-motion';
import { positionAnimations } from '@widgets/shared/animation/presets';
import { BalancesWidgetState } from '@widgets/shared/types/widgetState';
import { useTokenBalances, usePrices, TokenForChain, TokenItem } from '@jetstreamgg/sky-hooks';
import { Heading, Text } from '@widgets/shared/components/ui/Typography';
import { Trans } from '@lingui/react/macro';
import { BalancesFlow } from '../constants';
import { BalancesFilter } from './BalancesFilter';
import { useState } from 'react';
import { defaultConfig } from '@widgets/config/default-config';
import { useConnection, useChainId } from 'wagmi';
import { NoResults } from '@widgets/shared/components/icons/NoResults';

export interface TokenBalanceResponse extends GetBalanceData {
  tokenAddress?: string;
  formatted: string;
}

interface BalancesContentProps {
  validatedExternalState?: BalancesWidgetState;
  customTokenMap?: { [chainId: number]: TokenForChain[] };
  hideModuleBalances?: boolean;
  tabIndex: 0 | 1;
  chainIds?: number[];
  actionForToken?: (
    symbol: string,
    balance: string,
    tokenChainId: number
  ) => { label: string; actionUrl: string; image: string } | undefined;
  rewardsCardUrl?: string;
  savingsCardUrlMap?: Record<number, string>;
  sealCardUrl?: string;
  stakeCardUrl?: string;
  stusdsCardUrl?: string;
  onExternalLinkClicked?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  onToggle: (number: 0 | 1) => void;
  showAllNetworks?: boolean;
  hideZeroBalances?: boolean;
  setShowAllNetworks?: (showAllNetworks: boolean) => void;
  setHideZeroBalances?: (hideZeroBalances: boolean) => void;
}

export const BalancesContent = ({
  hideModuleBalances,
  actionForToken,
  onExternalLinkClicked,
  onToggle,
  tabIndex,
  customTokenMap,
  chainIds,
  rewardsCardUrl,
  savingsCardUrlMap,
  sealCardUrl,
  stakeCardUrl,
  stusdsCardUrl,
  showAllNetworks: showAllNetworksProp,
  hideZeroBalances: hideZeroBalancesProp,
  setShowAllNetworks: setShowAllNetworksProp,
  setHideZeroBalances: setHideZeroBalancesProp
}: BalancesContentProps): React.ReactElement => {
  const [showAllNetworksInternal, setShowAllNetworksInternal] = useState(true);
  const [hideZeroBalancesInternal, setHideZeroBalancesInternal] = useState(false);

  const showAllNetworks = showAllNetworksProp ?? showAllNetworksInternal;
  const hideZeroBalances = hideZeroBalancesProp ?? hideZeroBalancesInternal;
  const setShowAllNetworks = setShowAllNetworksProp ?? setShowAllNetworksInternal;
  const setHideZeroBalances = setHideZeroBalancesProp ?? setHideZeroBalancesInternal;

  const { address } = useConnection();
  const chainId = useChainId();
  const chainsToQuery = chainIds ?? [chainId];

  // Create an object mapping chainIds to their tokens
  const defaultChainTokenMap: Record<number, TokenItem[]> = {};
  for (const chainId of chainsToQuery) {
    defaultChainTokenMap[chainId] = defaultConfig.balancesTokenList[chainId] ?? [];
  }

  const customChainTokenMap: Record<number, TokenItem[]> = {};
  for (const chainId of chainsToQuery) {
    customChainTokenMap[chainId] = customTokenMap?.[chainId] ?? [];
  }

  // Use customTokenMap if provided, otherwise use the default config
  const chainTokenMap =
    customChainTokenMap && Object.values(customChainTokenMap).some(tokenArray => tokenArray?.length > 0)
      ? customChainTokenMap
      : defaultChainTokenMap;

  const { data: pricesData, isLoading: pricesLoading /*, error: pricesError */ } = usePrices();
  const {
    data: tokenBalances,
    isLoading: tokenBalancesLoading
    /* error: tokenBalancesError */
  } = useTokenBalances({ address, chainTokenMap });

  // map token balances to include price
  const tokenBalancesWithPrices =
    tokenBalances?.map(tokenBalance => {
      const price = pricesData?.[tokenBalance.symbol]?.price || 0;
      const tokenDecimalsFactor = Math.pow(10, -tokenBalance.decimals);
      return {
        ...tokenBalance,
        valueInDollars: Number(tokenBalance.value) * tokenDecimalsFactor * Number(price)
      };
    }) || [];

  // sort token balances by total in USD prices
  const sortedTokenBalances =
    tokenBalancesWithPrices && pricesData
      ? tokenBalancesWithPrices.sort((a, b) => b.valueInDollars - a.valueInDollars)
      : undefined;

  const balancesWithBalanceFilter = hideZeroBalances
    ? sortedTokenBalances?.filter(({ value }) => value > 0n)
    : sortedTokenBalances;

  const filteredAndSortedTokenBalances = showAllNetworks
    ? balancesWithBalanceFilter
    : balancesWithBalanceFilter?.filter(({ chainId: id }) => id === chainId);

  const isLoading = tokenBalancesLoading || pricesLoading;

  const hideTokenBalances = filteredAndSortedTokenBalances && filteredAndSortedTokenBalances.length === 0;

  return (
    <Tabs value={tabIndex === 1 ? BalancesFlow.TX_HISTORY : BalancesFlow.FUNDS} className="w-full">
      <BalancesTabsList onToggle={onToggle} />
      <TabsContent value={BalancesFlow.FUNDS} className="mt-0">
        <VStack className="items-stretch">
          <motion.div variants={positionAnimations}>
            <BalancesFilter
              showBalanceFilter={true}
              showAllNetworks={showAllNetworks}
              hideZeroBalances={hideZeroBalances}
              setShowAllNetworks={setShowAllNetworks}
              setHideZeroBalances={setHideZeroBalances}
              chainId={chainId}
            />
            {!hideModuleBalances && (
              <Heading variant="small" className="mb-3 leading-6">
                <Trans>Supplied Funds</Trans>
              </Heading>
            )}
            <ModulesBalances
              rewardsCardUrl={rewardsCardUrl}
              savingsCardUrlMap={savingsCardUrlMap}
              sealCardUrl={sealCardUrl}
              stakeCardUrl={stakeCardUrl}
              stusdsCardUrl={stusdsCardUrl}
              onExternalLinkClicked={onExternalLinkClicked}
              chainIds={chainIds}
              hideZeroBalances={hideZeroBalances}
              showAllNetworks={showAllNetworks}
            />
          </motion.div>

          <motion.div variants={positionAnimations}>
            {!hideTokenBalances && (
              <Heading variant="small" className="mb-3 leading-6">
                <Trans>Wallet Funds</Trans>
              </Heading>
            )}
            <TokenBalances
              actionForToken={actionForToken}
              customTokenMap={customTokenMap}
              chainIds={chainIds}
              filteredAndSortedTokenBalances={filteredAndSortedTokenBalances}
              pricesData={pricesData}
              isLoading={isLoading}
            />
            {hideModuleBalances && hideTokenBalances && (
              <VStack gap={3} className="items-center pt-6 pb-3">
                <NoResults />
                <Text className="text-textSecondary text-center">
                  <Trans>No balances found</Trans>
                </Text>
              </VStack>
            )}
          </motion.div>
        </VStack>
      </TabsContent>
      <TabsContent value={BalancesFlow.TX_HISTORY} className="mt-0">
        <motion.div variants={positionAnimations}>
          <BalancesFilter
            showBalanceFilter={false}
            showAllNetworks={showAllNetworks}
            hideZeroBalances={hideZeroBalances}
            setShowAllNetworks={setShowAllNetworks}
            setHideZeroBalances={setHideZeroBalances}
            chainId={chainId}
          />
          <BalancesHistory onExternalLinkClicked={onExternalLinkClicked} showAllNetworks={showAllNetworks} />
        </motion.div>
      </TabsContent>
    </Tabs>
  );
};
