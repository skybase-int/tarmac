import { useSavingsData, useOverallSkyData, usePrices } from '@jetstreamgg/hooks';
import { formatBigInt, formatDecimalPercentage, formatNumber } from '@jetstreamgg/utils';
import { Text } from '@/shared/components/ui/Typography';
import { t } from '@lingui/core/macro';
import { InteractiveStatsCardWithAccordion } from '@/shared/components/ui/card/InteractiveStatsCardWithAccordion';
import { Skeleton } from '@/components/ui/skeleton';
import { PopoverRateInfo } from '@/shared/components/ui/PopoverRateInfo';
import { formatUnits } from 'viem';
import { CardProps } from './ModulesBalances';
import { useMultiChainSavingsBalances } from '@jetstreamgg/hooks';
import { TokenIcon } from '@/shared/components/ui/token/TokenIcon';
import { ArrowRight } from 'lucide-react';
import { useChains } from 'wagmi';

export const SavingsBalanceCard = ({ onExternalLinkClicked, chainIds }: CardProps) => {
  const { data: savingsData, isLoading: savingsDataLoading, error: savingsDataError } = useSavingsData();
  const {
    data: overallSkyData,
    isLoading: overallSkyDataLoading,
    error: overallSkyDataError
  } = useOverallSkyData();
  const { data: pricesData, isLoading: pricesLoading } = usePrices();

  const chains = useChains();

  const { data: multichainSavingsBalances, isLoading: multichainSavingsBalancesLoading } =
    useMultiChainSavingsBalances({ chainIds });

  const sortedSavingsBalances = Object.entries(multichainSavingsBalances ?? {})
    .sort(([, a], [, b]) => (b > a ? 1 : b < a ? -1 : 0))
    .map(([chainId, balance]) => ({
      chainId: Number(chainId),
      balance
    }));

  const totalSavingsBalance = sortedSavingsBalances.reduce((acc, { balance }) => acc + balance, 0n);

  console.log('totalSavingsBalance', totalSavingsBalance);

  const skySavingsRate = parseFloat(overallSkyData?.skySavingsRatecRate ?? '0');

  if (savingsDataError || overallSkyDataError) return null;

  return (
    <InteractiveStatsCardWithAccordion
      title={t`Savings balance`}
      tokenSymbol="USDS"
      headerRightContent={
        savingsDataLoading ? (
          <Skeleton className="w-32" />
        ) : (
          <Text>{`${savingsData ? formatBigInt(totalSavingsBalance) : '0'}`}</Text>
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
      accordionContent={
        <>
          {sortedSavingsBalances.map(({ chainId, balance }) => {
            const networkName = chains.find(c => c.id === chainId)?.name.toLowerCase();
            return (
              <div
                key={chainId}
                className="group/interactive-card hover:bg-primary transition-gradient-and-colors cursor-pointer [--gradient-opacity:0%] hover:[--gradient-opacity:100%]"
              >
                <div className="flex items-start gap-2 p-2">
                  <TokenIcon className="h-8 w-8" token={{ symbol: 'USDS', name: 'USDS' }} chainId={chainId} />
                  <div className="grow">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <Text>{networkName}</Text>
                        <Text>{formatBigInt(balance)}</Text>
                      </div>
                      <ArrowRight
                        size={16}
                        className="opacity-0 transition-opacity group-hover/interactive-card:opacity-100"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      }
    />
  );
};
