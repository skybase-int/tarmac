import { StatsCard } from '@/modules/ui/components/StatsCard';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { PopoverInfo, UtilizationBar, getTooltipById } from '@jetstreamgg/sky-widgets';
import { Text } from '@/modules/layout/components/Typography';
import { MorphoMarketAllocation } from '@jetstreamgg/sky-hooks';

type MorphoMarketUtilizationCardProps = {
  market?: MorphoMarketAllocation;
  isLoading: boolean;
  error?: Error | null;
};

export function MorphoMarketUtilizationCard({ market, isLoading, error }: MorphoMarketUtilizationCardProps) {
  const { i18n } = useLingui();
  const tooltipContent = getTooltipById('morpho-utilization');

  // Convert from 0-1 decimal to 0-100 percentage
  const utilizationRate = (market?.utilization ?? 0) * 100;

  return (
    <StatsCard
      className="h-full"
      isLoading={isLoading}
      error={error}
      title={
        <div className="flex items-center gap-1">
          <span>{i18n._(msg`Utilization`)}</span>
          <PopoverInfo
            title={i18n._(msg`${tooltipContent?.title || 'Utilization'}`)}
            description={i18n._(msg`${tooltipContent?.tooltip || ''}`)}
            iconClassName="text-textSecondary"
            iconSize="medium"
          />
        </div>
      }
      content={
        <div className="mt-2 flex items-center gap-2">
          <Text variant="large">{utilizationRate.toFixed(1)}%</Text>
          <UtilizationBar
            utilizationRate={utilizationRate}
            isLoading={isLoading}
            showLabel={false}
            barHeight="h-2"
          />
        </div>
      }
    />
  );
}
