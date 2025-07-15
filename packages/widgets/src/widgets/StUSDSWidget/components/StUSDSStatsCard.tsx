import { Card } from '@widgets/components/ui/card';
import { Skeleton } from '@widgets/components/ui/skeleton';
import { InfoTooltip } from '@widgets/shared/components/ui/tooltip/InfoTooltip';
import { formatBigInt } from '@jetstreamgg/sky-utils';
import { Text } from '@widgets/shared/components/ui/Typography';
import { Trans } from '@lingui/react/macro';

interface StUSDSStatsCardProps {
  tvl?: bigint;
  utilization?: number;
  yieldRangeMin?: number;
  yieldRangeMax?: number;
  isLoading?: boolean;
}

export function StUSDSStatsCard({
  tvl,
  utilization = 0,
  yieldRangeMin = 5.2,
  yieldRangeMax = 6.7,
  isLoading
}: StUSDSStatsCardProps) {
  const utilizationColor =
    utilization > 90 ? 'text-error' : utilization > 75 ? 'text-orange-400' : 'text-muted-foreground';

  return (
    <Card className="p-4">
      <div className="space-y-3">
        {/* Variable Yield Rate */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Text className="text-textSecondary" variant="small">
              <Trans>Variable Yield</Trans>
            </Text>
            <InfoTooltip
              content={
                <Text variant="small">
                  <Trans>Yield fluctuates based on borrowing demand. Returns are not guaranteed.</Trans>
                </Text>
              }
            />
          </div>
          {isLoading ? (
            <Skeleton className="h-5 w-24" />
          ) : (
            <Text variant="medium">
              {yieldRangeMin}% – {yieldRangeMax}%
              <Text tag="span" className="text-textSecondary ml-1" variant="captionSm">
                (variable)
              </Text>
            </Text>
          )}
        </div>

        {/* TVL */}
        <div className="flex items-center justify-between">
          <Text className="text-textSecondary" variant="small">
            <Trans>Total Value Locked</Trans>
          </Text>
          {isLoading ? (
            <Skeleton className="h-5 w-20" />
          ) : (
            <Text variant="medium">{tvl ? formatBigInt(tvl, { unit: 18, compact: true }) : '0'} USDS</Text>
          )}
        </div>

        {/* Utilization */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Text className="text-textSecondary" variant="small">
              <Trans>Utilization</Trans>
            </Text>
            <InfoTooltip
              content={
                <Text variant="small">
                  <Trans>
                    Percentage of supplied USDS currently being borrowed. High utilization may delay
                    withdrawals.
                  </Trans>
                </Text>
              }
            />
          </div>
          {isLoading ? (
            <Skeleton className="h-5 w-16" />
          ) : (
            <div className="flex items-center gap-1">
              <Text className={utilizationColor} variant="medium">
                {utilization.toFixed(1)}%
              </Text>
            </div>
          )}
        </div>

        {/* Utilization Meter */}
        <div className="pt-1">
          <div className="bg-secondary h-2 overflow-hidden rounded-full">
            <div
              className={`h-full transition-all duration-300 ${
                utilization > 90 ? 'bg-error' : utilization > 75 ? 'bg-orange-400' : 'bg-text'
              }`}
              style={{ width: `${Math.min(utilization, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
