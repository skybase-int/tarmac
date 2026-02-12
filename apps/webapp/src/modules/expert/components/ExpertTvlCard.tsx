import { StatsCard } from '@/modules/ui/components/StatsCard';
import { t } from '@lingui/core/macro';
import { useStUsdsData, fetchMorphoVaultMarketData, MORPHO_VAULTS } from '@jetstreamgg/sky-hooks';
import { formatNumber } from '@jetstreamgg/sky-utils';
import { Text } from '@/modules/layout/components/Typography';
import { useQueries } from '@tanstack/react-query';
import { mainnet } from 'viem/chains';

export function ExpertTvlCard(): React.ReactElement {
  const { data: stUsdsData, isLoading: isStUsdsLoading, error: stUsdsError } = useStUsdsData();

  // Uses the same query keys as useMorphoVaultMarketApiData, so data is shared from cache
  const morphoResults = useQueries({
    queries: MORPHO_VAULTS.map(vault => ({
      queryKey: ['morpho-vault-market-data', vault.vaultAddress[mainnet.id], mainnet.id],
      queryFn: () => fetchMorphoVaultMarketData(vault.vaultAddress[mainnet.id], mainnet.id),
      staleTime: 30_000,
      gcTime: 60_000
    }))
  });

  // stUSDS totalAssets is denominated in USDS (18 decimals), which is pegged to $1
  const stUsdsTvlUsd = stUsdsData ? Number(stUsdsData.totalAssets) / 1e18 : 0;

  const morphoTvlUsd = morphoResults.reduce((sum, result) => sum + (result.data?.totalAssetsUsd ?? 0), 0);

  const totalTvlUsd = stUsdsTvlUsd + morphoTvlUsd;
  const isMorphoLoading = morphoResults.some(r => r.isLoading);
  const morphoError = morphoResults.find(r => r.error)?.error ?? null;

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
