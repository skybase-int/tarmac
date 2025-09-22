import { StatsCard } from '@/modules/ui/components/StatsCard';
import { Text } from '@/modules/layout/components/Typography';
import { t } from '@lingui/core/macro';
import { useMkrSkyFee } from '@jetstreamgg/sky-hooks';
import { math } from '@jetstreamgg/sky-utils';

export function MkrDelayedUpgradePenalty() {
  const { data: mkrSkyFee, isLoading, error } = useMkrSkyFee();

  // Calculate the penalty percentage from the WAD-scaled fee
  const penaltyValue = mkrSkyFee ? math.calculateUpgradePenalty(mkrSkyFee) : '0';

  return (
    <StatsCard
      title={t`MKR Delayed Upgrade Penalty`}
      isLoading={isLoading}
      error={error}
      content={<Text>{penaltyValue} %</Text>}
    />
  );
}
