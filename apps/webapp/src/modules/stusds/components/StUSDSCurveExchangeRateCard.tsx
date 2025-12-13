import { StatsCard } from '@/modules/ui/components/StatsCard';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Text } from '@/modules/layout/components/Typography';
import { useCurvePoolData, useStUsdsData, calculateRateDifferencePercent } from '@jetstreamgg/sky-hooks';
import { formatBigInt } from '@jetstreamgg/sky-utils';
import { TokenIcon } from '@/modules/ui/components/TokenIcon';
import { CurveLogo } from '@/modules/icons/CurveLogo';
import { RateIndicator } from '@/modules/ui/components/RateIndicator';

export function StUSDSCurveExchangeRateCard() {
  const { i18n } = useLingui();
  const { data: poolData, isLoading: isCurveLoading } = useCurvePoolData();
  const { data: stUsdsData, isLoading: isStUsdsLoading } = useStUsdsData();

  // priceOracle is the USDS per stUSDS rate from Curve's EMA oracle (scaled by 1e18)
  const curveRate = poolData?.priceOracle || 0n;
  const nativeRate = stUsdsData?.assetPerShare || 0n;

  const formattedRate = curveRate > 0n ? formatBigInt(curveRate, { maxDecimals: 6 }) : '--';

  // Calculate rate difference percentage
  const rateDifference =
    curveRate > 0n && nativeRate > 0n ? calculateRateDifferencePercent(curveRate, nativeRate) : 0;

  const showRateIndicator = curveRate > 0n && nativeRate > 0n && rateDifference !== 0;

  return (
    <StatsCard
      className="h-full"
      isLoading={isCurveLoading || isStUsdsLoading}
      title={
        <div className="flex items-center gap-2">
          <span>{i18n._(msg`Curve Exchange Rate`)}</span>
          <CurveLogo className="h-3.5 w-3.5" />
        </div>
      }
      content={
        <div className="mt-2 flex items-center gap-1.5">
          <TokenIcon token={{ symbol: 'STUSDS', name: 'stusds' }} className="h-6 w-6" />
          <Text variant="large">1 stUSDS =</Text>
          <TokenIcon token={{ symbol: 'USDS', name: 'usds' }} className="h-6 w-6" />
          <Text variant="large">{formattedRate} USDS</Text>
          {showRateIndicator && (
            <RateIndicator rateDifference={rateDifference} showPercentage={rateDifference > 0} />
          )}
        </div>
      }
    />
  );
}
