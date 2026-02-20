import { StatsCard } from '@/modules/ui/components/StatsCard';
import { t } from '@lingui/core/macro';
import { useMorphoVaultsCombinedTvl } from '@jetstreamgg/sky-hooks';
import { formatNumber } from '@jetstreamgg/sky-utils';
import { Text } from '@/modules/layout/components/Typography';

export function VaultsTvlCard(): React.ReactElement {
  const { totalAssetsUsd, isLoading, error } = useMorphoVaultsCombinedTvl();

  return (
    <StatsCard
      className="h-full"
      title={t`Total TVL`}
      content={<Text className="mt-2">${formatNumber(totalAssetsUsd)}</Text>}
      isLoading={isLoading}
      error={error}
    />
  );
}
