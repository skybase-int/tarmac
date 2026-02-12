import { useQueries } from '@tanstack/react-query';
import { mainnet } from 'viem/chains';
import { MORPHO_VAULTS } from './constants';
import { fetchMorphoVaultMarketData } from './useMorphoVaultMarketApiData';

export type MorphoVaultsCombinedTvl = {
  /** Combined TVL across all Morpho vaults in USD */
  totalAssetsUsd: number;
  isLoading: boolean;
  error: Error | null;
};

/**
 * Hook that fetches TVL data for all configured Morpho vaults and returns
 * the combined USD total. Uses the same query keys as useMorphoVaultMarketApiData
 */
export function useMorphoVaultsCombinedTvl(): MorphoVaultsCombinedTvl {
  const results = useQueries({
    queries: MORPHO_VAULTS.map(vault => ({
      queryKey: ['morpho-vault-market-data', vault.vaultAddress[mainnet.id], mainnet.id],
      queryFn: () => fetchMorphoVaultMarketData(vault.vaultAddress[mainnet.id], mainnet.id),
      staleTime: 30_000,
      gcTime: 60_000
    }))
  });

  const totalAssetsUsd = results.reduce((sum, result) => sum + (result.data?.totalAssetsUsd ?? 0), 0);
  const isLoading = results.some(r => r.isLoading);
  const error = results.find(r => r.error)?.error ?? null;

  return { totalAssetsUsd, isLoading, error };
}
