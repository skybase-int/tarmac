import { StatsCard } from '@/modules/ui/components/StatsCard';
import { t } from '@lingui/core/macro';
import { useStUsdsData, useMorphoVaultsCombinedTvl } from '@jetstreamgg/sky-hooks';
import { formatNumber } from '@jetstreamgg/sky-utils';
import { Text } from '@/modules/layout/components/Typography';

export function ExpertTvlCard(): React.ReactElement {
  const { data: stUsdsData, isLoading: isStUsdsLoading, error: stUsdsError } = useStUsdsData();
  const {
    totalAssetsUsd: morphoTvlUsd,
    isLoading: isMorphoLoading,
    error: morphoError
  } = useMorphoVaultsCombinedTvl();

  // stUSDS totalAssets is denominated in USDS (18 decimals), which is pegged to $1
  const stUsdsTvlUsd = stUsdsData ? Number(stUsdsData.totalAssets) / 1e18 : 0;
  const totalTvlUsd = stUsdsTvlUsd + morphoTvlUsd;

  return (
    <StatsCard
      className="h-full"
      title={t`Total TVL`}
      content={<Text className="mt-2">${formatNumber(totalTvlUsd)}</Text>}
      isLoading={isStUsdsLoading || isMorphoLoading}
      error={stUsdsError || morphoError}
    />
  );
}
