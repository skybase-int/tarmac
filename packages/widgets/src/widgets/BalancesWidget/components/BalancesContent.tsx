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
import { useTokenBalances, usePrices, TokenForChain, TokenItem } from '@jetstreamgg/hooks';
import { Heading } from '@widgets/shared/components/ui/Typography';
import { Trans } from '@lingui/react/macro';
import { BalancesFilter } from './BalancesFilter';
import { useState } from 'react';
import { defaultConfig } from '@widgets/config/default-config';
import { useAccount, useChainId } from 'wagmi';

export interface TokenBalanceResponse extends GetBalanceData {
  tokenAddress?: string;
  formatted: string;
}

interface BalancesContentProps {
  validatedExternalState?: BalancesWidgetState;
  customTokenMap?: { [chainId: number]: TokenForChain[] };
  hideModuleBalances?: boolean;
  chainIds?: number[];
  actionForToken?: (
    symbol: string,
    balance: string,
    tokenChainId: number
  ) => { label: string; actionUrl: string; image: string } | undefined;
  rewardsCardUrl?: string;
  savingsCardUrlMap?: Record<number, string>;
  sealCardUrl?: string;
  onExternalLinkClicked?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  showAllNetworks?: boolean;
  hideZeroBalances?: boolean;
  setShowAllNetworks?: (showAllNetworks: boolean) => void;
  setHideZeroBalances?: (hideZeroBalances: boolean) => void;
}

export const BalancesContent = ({
  validatedExternalState,
  customTokenMap,
  hideModuleBalances,
  actionForToken,
  chainIds,
  rewardsCardUrl,
  savingsCardUrlMap,
  sealCardUrl,
  onExternalLinkClicked,
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

  const { address } = useAccount();
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

  //SKY REWARDS
  const currentChainId = useChainId();
  const chainId = isTestnetId(currentChainId) ? 314310 : 1; //TODO: update once we add non-mainnet rewards
  const { address } = useAccount();
  const rewardContracts = useAvailableTokenRewardContracts(chainId);

  const usdsSkyRewardContract = rewardContracts.find(
    f => f.supplyToken.symbol === TOKENS.usds.symbol && f.rewardToken.symbol === TOKENS.sky.symbol
  );
  const usdsCleRewardContract = rewardContracts.find(
    f => f.supplyToken.symbol === TOKENS.usds.symbol && f.rewardToken.symbol === TOKENS.cle.symbol
  );

  const {
    data: usdsSkySuppliedBalance,
    isLoading: usdsSkySuppliedBalanceLoading,
    error: usdsSkySuppliedBalanceError
  } = useRewardsSuppliedBalance({
    chainId,
    address,
    contractAddress: usdsSkyRewardContract?.contractAddress as `0x${string}`
  });

  const {
    data: usdsCleSuppliedBalance,
    isLoading: usdsCleSuppliedBalanceIsLoading,
    error: usdsCleSuppliedBalanceError
  } = useRewardsSuppliedBalance({
    chainId,
    address,
    contractAddress: usdsCleRewardContract?.contractAddress as `0x${string}`
  });

  const {
    data: chartData,
    isLoading: chartDataLoading,
    error: chartDataError
  } = useRewardsChartInfo({
    rewardContractAddress: usdsSkyRewardContract?.contractAddress as string
  });

  const { data: pricesData, isLoading: pricesLoading } = usePrices();

  const sortedChartData = chartData ? [...chartData].sort((a, b) => b.blockTimestamp - a.blockTimestamp) : [];
  const mostRecentRate = sortedChartData.length > 0 ? sortedChartData[0].rate : null;
  const mostRecentRateNumber = mostRecentRate ? parseFloat(mostRecentRate) : null;

  const hideRewards = (usdsSkySuppliedBalanceError || usdsCleSuppliedBalanceError || chartDataError)
    || (usdsSkySuppliedBalance === 0n && hideZeroBalance)
    || (!showAllNetworks && !isMainnetId(currentChainId));

  return (
    <Tabs defaultValue={validatedExternalState?.tab || 'left'} className="w-full">
      <BalancesTabsList />
      <TabsContent value="left" className="mt-0">
        <VStack className="items-stretch">
          <motion.div variants={positionAnimations}>
            <BalancesFilter
              showBalanceFilter={true}
              showAllNetworks={showAllNetworks}
              hideZeroBalances={hideZeroBalances}
              setShowAllNetworks={setShowAllNetworks}
              setHideZeroBalances={setHideZeroBalances}
            />
            <Heading variant="small" className="mb-3 leading-6">
              <Trans>Supplied Funds</Trans>
            </Heading>
            <ModulesBalances
              rewardsCardUrl={rewardsCardUrl}
              savingsCardUrlMap={savingsCardUrlMap}
              sealCardUrl={sealCardUrl}
              onExternalLinkClicked={onExternalLinkClicked}
              hideModuleBalances={hideModuleBalances}
              chainIds={chainIds}
              hideZeroBalances={hideZeroBalances}
              showAllNetworks={showAllNetworks}
              hideRewards={hideRewards}
            />
          </motion.div>

          <motion.div variants={positionAnimations}>
            <Heading variant="small" className="mb-3 leading-6">
              <Trans>Wallet Funds</Trans>
            </Heading>
            <TokenBalances
              actionForToken={actionForToken}
              customTokenMap={customTokenMap}
              chainIds={chainIds}
              hideZeroBalances={hideZeroBalances}
              showAllNetworks={showAllNetworks}
              filteredAndSortedTokenBalances={filteredAndSortedTokenBalances}
              pricesData={pricesData}
              isLoading={isLoading}
            />
          </motion.div>
        </VStack>
      </TabsContent>
      <TabsContent value="right" className="mt-0">
        <motion.div variants={positionAnimations}>
          <BalancesFilter
            showBalanceFilter={false}
            showAllNetworks={showAllNetworks}
            hideZeroBalances={hideZeroBalances}
            setShowAllNetworks={setShowAllNetworks}
            setHideZeroBalances={setHideZeroBalances}
          />
          <BalancesHistory onExternalLinkClicked={onExternalLinkClicked} showAllNetworks={showAllNetworks} />
        </motion.div>
      </TabsContent>
    </Tabs>
  );
};
