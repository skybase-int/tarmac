import { StatsCard } from '@/modules/ui/components/StatsCard';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { UtilizationBar } from '@jetstreamgg/sky-widgets';
import { useStUsdsCapacityData } from '@jetstreamgg/sky-hooks';
import { Text } from '@/modules/layout/components/Typography';

export function StUSDSUtilizationCard() {
  const { i18n } = useLingui();
  const { data: capacityData, isLoading } = useStUsdsCapacityData();

  const utilizationRate = capacityData?.utilizationRate ?? 0;

  const utilizationColor =
    utilizationRate > 90 ? 'text-error' : utilizationRate > 75 ? 'text-orange-400' : '';

  return (
    <StatsCard
      isLoading={isLoading}
      title={i18n._(msg`Utilization`)}
      content={
        <div className="mt-2">
          <div className="mb-2 flex items-center gap-2">
            <Text className={utilizationColor} variant="large">
              {utilizationRate.toFixed(1)}%
            </Text>
          </div>
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
