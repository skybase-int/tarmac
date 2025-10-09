import { useStUsdsData, usePrices } from '@jetstreamgg/sky-hooks';
import { formatBigInt, formatNumber, formatStrAsApy } from '@jetstreamgg/sky-utils';
import { Text } from '@widgets/shared/components/ui/Typography';
import { t } from '@lingui/core/macro';
import { InteractiveStatsCard } from '@widgets/shared/components/ui/card/InteractiveStatsCard';
import { Skeleton } from '@widgets/components/ui/skeleton';
import { PopoverRateInfo } from '@widgets/shared/components/ui/PopoverRateInfo';
import { formatUnits } from 'viem';
import { CardProps } from './ModulesBalances';

export const StUSDSBalanceCard = ({ url, onExternalLinkClicked, loading }: CardProps) => {
  const { data: stUsdsData, isLoading: stUsdsLoading } = useStUsdsData();
  const { data: pricesData, isLoading: pricesLoading } = usePrices();

  const userSuppliedUsds = stUsdsData?.userSuppliedUsds || 0n;
  const moduleRate = stUsdsData?.moduleRate || 0n;

  return (
    <InteractiveStatsCard
      title={t`USDS supplied to stUSDS`}
      tokenSymbol="stUSDS"
      headerRightContent={
        loading || stUsdsLoading ? (
          <Skeleton className="w-32" />
        ) : (
          <Text>{formatBigInt(userSuppliedUsds, { unit: 18, maxDecimals: 0 })}</Text>
        )
      }
      footer={
        stUsdsLoading ? (
          <Skeleton className="h-4 w-20" />
        ) : moduleRate > 0n ? (
          <div className="flex w-fit items-center gap-1.5">
            <Text variant="small" className="text-bullish leading-4">
              {`Rate: ${formatStrAsApy(moduleRate)}`}
            </Text>
            <PopoverRateInfo
              type="stusds"
              onExternalLinkClicked={onExternalLinkClicked}
              iconClassName="h-[13px] w-[13px]"
            />
          </div>
        ) : (
          <></>
        )
      }
      footerRightContent={
        loading || pricesLoading || stUsdsLoading ? (
          <Skeleton className="h-[13px] w-20" />
        ) : userSuppliedUsds > 0n && !!pricesData?.USDS ? (
          <Text variant="small" className="text-textSecondary">
            $
            {formatNumber(parseFloat(formatUnits(userSuppliedUsds, 18)) * parseFloat(pricesData.USDS.price), {
              maxDecimals: 2
            })}
          </Text>
        ) : undefined
      }
      url={url}
    />
  );
};
