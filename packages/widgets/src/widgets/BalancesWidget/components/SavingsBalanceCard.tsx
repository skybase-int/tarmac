import { useSavingsData, useOverallSkyData, usePrices } from '@jetstreamgg/hooks';
import { formatBigInt, formatDecimalPercentage, formatNumber } from '@jetstreamgg/utils';
import { Text } from '@/shared/components/ui/Typography';
import { t } from '@lingui/core/macro';
import { InteractiveStatsCard } from '@/shared/components/ui/card/InteractiveStatsCard';
import { Skeleton } from '@/components/ui/skeleton';
import { PopoverRateInfo } from '@/shared/components/ui/PopoverRateInfo';
import { formatUnits } from 'viem';
import { CardProps } from './ModulesBalances';
// import { useMultiChainSavingsBalances } from '@jetstreamgg/hooks';

export const SavingsBalanceCard = ({ onClick, onExternalLinkClicked /*, chainIds */ }: CardProps) => {
  const { data: savingsData, isLoading: savingsDataLoading, error: savingsDataError } = useSavingsData();
  const {
    data: overallSkyData,
    isLoading: overallSkyDataLoading,
    error: overallSkyDataError
  } = useOverallSkyData();
  const { data: pricesData, isLoading: pricesLoading } = usePrices();

  // const { data: multichainSavingsBalances, isLoading: multichainSavingsBalancesLoading } =
  //   useMultiChainSavingsBalances({ chainIds });

  const skySavingsRate = parseFloat(overallSkyData?.skySavingsRatecRate ?? '0');

  if (savingsDataError || overallSkyDataError) return null;

  return (
    <InteractiveStatsCard
      title={t`Savings balance`}
      tokenSymbol="USDS"
      headerRightContent={
        savingsDataLoading ? (
          <Skeleton className="w-32" />
        ) : (
          <Text>{`${savingsData ? formatBigInt(savingsData.userSavingsBalance) : '0'}`}</Text>
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
        savingsDataLoading || pricesLoading ? (
          <Skeleton className="h-[13px] w-20" />
        ) : savingsData !== undefined && !!pricesData?.USDS ? (
          <Text variant="small" className="text-textSecondary">
            $
            {formatNumber(
              parseFloat(formatUnits(savingsData.userSavingsBalance, 18)) * parseFloat(pricesData.USDS.price),
              {
                maxDecimals: 2
              }
            )}
          </Text>
        ) : undefined
      }
      onClick={onClick}
    />
  );
};
