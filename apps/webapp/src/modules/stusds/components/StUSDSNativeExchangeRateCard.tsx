import { StatsCard } from '@/modules/ui/components/StatsCard';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Text } from '@/modules/layout/components/Typography';
import { useStUsdsData, useCurvePoolData, calculateRateDifferencePercent } from '@jetstreamgg/sky-hooks';
import { formatBigInt } from '@jetstreamgg/sky-utils';
import { TokenIcon } from '@/modules/ui/components/TokenIcon';
import { RateIndicator } from '@/modules/ui/components/RateIndicator';

interface StUSDSNativeExchangeRateCardProps {
  isWithdrawUnavailable?: boolean;
  isSupplyUnavailable?: boolean;
}

export function StUSDSNativeExchangeRateCard({
  isWithdrawUnavailable = false,
  isSupplyUnavailable = false
}: StUSDSNativeExchangeRateCardProps) {
  const { i18n } = useLingui();
  const { data: stUsdsData, isLoading: isStUsdsLoading } = useStUsdsData();
  const { data: poolData, isLoading: isCurveLoading } = useCurvePoolData();

  const isUnavailable = isWithdrawUnavailable || isSupplyUnavailable;

  // assetPerShare is the USDS per stUSDS rate (scaled by 1e18)
  const nativeRate = stUsdsData?.assetPerShare || 0n;
  const curveRate = poolData?.priceOracle || 0n;

  const formattedRate = nativeRate > 0n ? formatBigInt(nativeRate, { maxDecimals: 6 }) : '--';

  // Calculate rate difference (native vs curve) - opposite of curve card
  const rateDifference =
    nativeRate > 0n && curveRate > 0n ? calculateRateDifferencePercent(nativeRate, curveRate) : 0;

  const showRateIndicator = nativeRate > 0n && curveRate > 0n && rateDifference !== 0;

  return (
    <StatsCard
      className="h-full"
      isLoading={isStUsdsLoading || isCurveLoading}
      title={i18n._(msg`Native Exchange Rate`)}
      content={
        <div className={`mt-2 flex items-center gap-1.5 ${isUnavailable ? 'text-textSecondary' : ''}`}>
          <TokenIcon token={{ symbol: 'STUSDS', name: 'stusds' }} className="h-6 w-6" />
          <Text variant="large" className={isUnavailable ? 'text-textSecondary' : ''}>
            1 stUSDS =
          </Text>
          <TokenIcon token={{ symbol: 'USDS', name: 'usds' }} className="h-6 w-6" />
          <Text variant="large" className={isUnavailable ? 'text-textSecondary' : ''}>
            {formattedRate} USDS
          </Text>
          {showRateIndicator && (
            <RateIndicator rateDifference={rateDifference} showPercentage={rateDifference > 0} />
          )}
        </div>
      }
    />
  );
}
