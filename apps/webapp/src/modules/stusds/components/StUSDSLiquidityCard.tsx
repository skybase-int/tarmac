import { StatsCard } from '@/modules/ui/components/StatsCard';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Text } from '@/modules/layout/components/Typography';
import { useStUsdsData } from '@jetstreamgg/sky-hooks';
import { useCollateralData } from '@jetstreamgg/sky-hooks';
import { getIlkName } from '@jetstreamgg/sky-hooks';
import { formatNumber } from '@jetstreamgg/sky-utils';
import { formatUnits } from 'viem';
import { PopoverRateInfo as PopoverInfo } from '@jetstreamgg/sky-widgets';

export function StUSDSLiquidityCard() {
  const { i18n } = useLingui();
  const { data: stUsdsData, isLoading: isStUsdsLoading } = useStUsdsData();

  const { data: collateralData, isLoading: isCollateralLoading } = useCollateralData(getIlkName(2));
  const totalStakingDebt = collateralData?.totalDaiDebt ?? 0n;

  const totalSupply = stUsdsData?.totalSupply ?? 0n;
  const availableLiquidity = totalSupply > totalStakingDebt ? totalSupply - totalStakingDebt : 0n;

  return (
    <StatsCard
      isLoading={isStUsdsLoading || isCollateralLoading}
      title={i18n._(msg`Available Liquidity`)}
      content={
        <div className="mt-2 flex items-center gap-1.5">
          <Text variant="large">{formatNumber(parseFloat(formatUnits(availableLiquidity, 18)))} USDS</Text>
          <PopoverInfo type="stusdsLiquidity" />
        </div>
      }
    />
  );
}
