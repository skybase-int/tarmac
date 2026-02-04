import { ExpertTvlCard } from './ExpertTvlCard';
import { StUSDSSuppliersCard } from '@/modules/stusds/components/StUSDSSuppliersCard';
import { MorphoVaultSuppliersCard } from '@/modules/morpho/components/MorphoVaultSuppliersCard';
import { MORPHO_VAULTS } from '@jetstreamgg/sky-hooks';
import { MorphoVaultBadge } from '@jetstreamgg/sky-widgets';
import { mainnet } from 'viem/chains';
import { Trans } from '@lingui/react/macro';

export function ExpertOverview() {
  const morphoVaultAddress = MORPHO_VAULTS[0]?.vaultAddress[mainnet.id];

  return (
    <div className="flex w-full flex-wrap justify-between gap-3">
      <div className="min-w-[250px] flex-1">
        <ExpertTvlCard />
      </div>
      <div className="min-w-[250px] flex-1">
        <StUSDSSuppliersCard title={<Trans>stUSDS Suppliers</Trans>} />
      </div>
      {morphoVaultAddress && (
        <div className="min-w-[250px] flex-1">
          <MorphoVaultSuppliersCard
            vaultAddress={morphoVaultAddress}
            title={
              <span className="flex items-center gap-1.5">
                <Trans>USDS Risk Capital Suppliers</Trans>
                <MorphoVaultBadge />
              </span>
            }
          />
        </div>
      )}
    </div>
  );
}
