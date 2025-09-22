import { StatsCard } from '@/modules/ui/components/StatsCard';
import { Text } from '@/modules/layout/components/Typography';
import { t } from '@lingui/core/macro';
import { useMigrationStats } from '@jetstreamgg/sky-hooks';
import { useChainId } from 'wagmi';
import { isL2ChainId } from '@jetstreamgg/sky-utils';

export function MkrDelayedUpgradePenalty() {
  const chainId = useChainId();
  const chainIdToUse = isL2ChainId(chainId) ? 1 : chainId;
  const { data, isLoading, error } = useMigrationStats(chainIdToUse);

  // The penalty is already in percentage format from the API (e.g., 1 for 1%)
  const penaltyValue = data?.penalty ? data.penalty.toFixed(2) : '0';

  return (
    <StatsCard
      title={t`MKR Delayed Upgrade Penalty`}
      isLoading={isLoading}
      error={error}
      content={<Text>{penaltyValue} %</Text>}
    />
  );
}
