import { useOverallSkyData, usePrices } from '@jetstreamgg/hooks';
import { formatBigInt, formatDecimalPercentage, formatNumber } from '@jetstreamgg/utils';
import { Text } from '@widgets/shared/components/ui/Typography';
import { t } from '@lingui/core/macro';
import { InteractiveStatsCardWithAccordion } from '@widgets/shared/components/ui/card/InteractiveStatsCardWithAccordion';
import { Skeleton } from '@widgets/components/ui/skeleton';
import { PopoverRateInfo } from '@widgets/shared/components/ui/PopoverRateInfo';
import { formatUnits } from 'viem';
import { CardProps } from './ModulesBalances';
import { useMultiChainSavingsBalances } from '@jetstreamgg/hooks';
import { useChainId } from 'wagmi';

export const SavingsBalanceCard = ({
  urlMap,
  onExternalLinkClicked,
  chainIds,
  hideZeroBalance,
  showAllNetworks
}: CardProps & { urlMap: Record<number, string> }) => {
  const {
    data: overallSkyData,
    isLoading: overallSkyDataLoading,
    error: overallSkyDataError
  } = useOverallSkyData();
  const { data: pricesData, isLoading: pricesLoading } = usePrices();

  const currentChainId = useChainId();

  const {
    data: multichainSavingsBalances,
    isLoading: multichainSavingsBalancesLoading,
    error: multichainSavingsBalancesError
  } = useMultiChainSavingsBalances({ chainIds });

  const sortedSavingsBalances = Object.entries(multichainSavingsBalances ?? {})
    .sort(([, a], [, b]) => (b > a ? 1 : b < a ? -1 : 0))
    .map(([chainId, balance]) => ({
      chainId: Number(chainId),
      balance
    }));

  const balancesWithBalanceFilter = hideZeroBalance
    ? sortedSavingsBalances.filter(({ balance }) => balance > 0n)
    : sortedSavingsBalances;

  const filteredAndSortedSavingsBalances = showAllNetworks
    ? balancesWithBalanceFilter
    : balancesWithBalanceFilter.filter(({ chainId }) => chainId === currentChainId);

  const totalSavingsBalance = filteredAndSortedSavingsBalances.reduce(
    (acc, { balance }) => acc + balance,
    0n
  );

  const skySavingsRate = parseFloat(overallSkyData?.skySavingsRatecRate ?? '0');

  if (multichainSavingsBalancesError || overallSkyDataError) return null;

  if (filteredAndSortedSavingsBalances.length === 0) return null;

  return (
    <InteractiveStatsCardWithAccordion
      title={t`Savings balance`}
      tokenSymbol="USDS"
      headerRightContent={
        multichainSavingsBalancesLoading ? (
          <Skeleton className="w-32" />
        ) : (
          <Text>{`${multichainSavingsBalances ? formatBigInt(totalSavingsBalance) : '0'}`}</Text>
        )
      }
      footer={
        overallSkyDataLoading ? (
          <Skeleton className="h-4 w-20" />
        ) : skySavingsRate > 0 ? (
          <div className="flex w-fit items-center gap-1.5">
            <Text variant="small" className="text-bullish leading-4">
              {`Rate: ${formatDecimalPercentage(skySavingsRate)}`}
            </Text>
            <PopoverRateInfo
              type="ssr"
              onExternalLinkClicked={onExternalLinkClicked}
              iconClassName="h-[13px] w-[13px]"
            />
          </div>
        ) : (
          <></>
        )
      }
      footerRightContent={
        multichainSavingsBalancesLoading || pricesLoading ? (
          <Skeleton className="h-[13px] w-20" />
        ) : totalSavingsBalance !== undefined && !!pricesData?.USDS ? (
          <Text variant="small" className="text-textSecondary">
            $
            {formatNumber(
              parseFloat(formatUnits(totalSavingsBalance, 18)) * parseFloat(pricesData.USDS.price),
              {
                maxDecimals: 2
              }
            )}
          </Text>
        ) : undefined
      }
      balancesByChain={filteredAndSortedSavingsBalances}
      urlMap={urlMap}
    />
  );
};
