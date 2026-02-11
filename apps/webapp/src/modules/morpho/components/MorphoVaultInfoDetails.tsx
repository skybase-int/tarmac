import { MorphoVaultRateCard } from './MorphoVaultRateCard';
import { MorphoVaultTvlCard } from './MorphoVaultTvlCard';
import { MorphoMarketLiquidityCard } from './MorphoMarketLiquidityCard';
import { MorphoVaultSuppliersCard } from './MorphoVaultSuppliersCard';
import { Token, useMorphoVaultSingleMarketApiData } from '@jetstreamgg/sky-hooks';

type MorphoVaultInfoDetailsProps = {
  vaultAddress: `0x${string}`;
  assetToken: Token;
};

export function MorphoVaultInfoDetails({ vaultAddress, assetToken }: MorphoVaultInfoDetailsProps) {
  const { data: singleMarketData, isLoading, error } = useMorphoVaultSingleMarketApiData({ vaultAddress });

  return (
    <div className="flex w-full flex-wrap gap-3">
      <div className="min-w-[250px] flex-1">
        <MorphoVaultRateCard vaultAddress={vaultAddress} />
      </div>
      <div className="min-w-[250px] flex-1">
        <MorphoVaultTvlCard vaultAddress={vaultAddress} assetToken={assetToken} />
      </div>
      <div className="min-w-[250px] flex-1">
        <MorphoMarketLiquidityCard
          liquidity={singleMarketData?.liquidity}
          isLoading={isLoading}
          error={error}
          assetToken={assetToken}
        />
      </div>
      <div className="max-w-1/2 min-w-[250px] flex-1">
        <MorphoVaultSuppliersCard vaultAddress={vaultAddress} />
      </div>
    </div>
  );
}
