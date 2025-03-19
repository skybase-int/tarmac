import { usePrices } from '@jetstreamgg/hooks';
import { formatBigInt, formatNumber } from '@jetstreamgg/utils';
import { Text } from '@widgets/shared/components/ui/Typography';
import { t } from '@lingui/core/macro';
import { InteractiveStatsCard } from '@widgets/shared/components/ui/card/InteractiveStatsCard';
import { Skeleton } from '@widgets/components/ui/skeleton';
import { formatUnits } from 'viem';
import { CardProps } from './ModulesBalances';
import { SealBalanceWarningCard } from './SealBalanceWarningCard';

export const SealBalanceCard = ({ url, loading, sealBalance }: CardProps) => {
  const { data: pricesData, isLoading: pricesLoading } = usePrices();

  const totalSealedValue =
    sealBalance && pricesData?.MKR
      ? parseFloat(formatUnits(sealBalance, 18)) * parseFloat(pricesData.MKR.price)
      : 0;
  const shouldShowSealWarning = totalSealedValue > 10;

  if (totalSealedValue === 0) {
    return null;
  }

  return shouldShowSealWarning ? (
    <SealBalanceWarningCard
      isLoading={loading || pricesLoading}
      sealBalance={sealBalance}
      sealValue={totalSealedValue}
      url={url}
    />
  ) : (
    <InteractiveStatsCard
      title={t`MKR supplied to Seal Engine`}
      tokenSymbol="MKR"
      headerRightContent={
        loading ? (
          <Skeleton className="w-32" />
        ) : (
          <Text>{`${sealBalance ? formatBigInt(sealBalance) : '0'}`}</Text>
        )
      }
      footer={pricesLoading ? <Skeleton className="h-4 w-20" /> : <></>}
      footerRightContent={
        loading || pricesLoading ? (
          <Skeleton className="h-[13px] w-20" />
        ) : sealBalance !== undefined && !!pricesData?.MKR ? (
          <Text variant="small" className="text-textSecondary">
            $
            {formatNumber(totalSealedValue, {
              maxDecimals: 2
            })}
          </Text>
        ) : undefined
      }
    />
  );
};
