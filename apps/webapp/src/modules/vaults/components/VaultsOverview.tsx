import { VaultsTvlCard } from './VaultsTvlCard';
import { MorphoVaultSuppliersCard } from '@/modules/morpho/components/MorphoVaultSuppliersCard';
import { MORPHO_VAULTS } from '@jetstreamgg/sky-hooks';
import { MorphoVaultBadge } from '@jetstreamgg/sky-widgets';
import { mainnet } from 'viem/chains';

export function VaultsOverview() {
  return (
    <div className="flex w-full flex-wrap justify-between gap-3">
      <div className="min-w-[250px] flex-1">
        <VaultsTvlCard />
      </div>
      {MORPHO_VAULTS.map(vault => (
        <div key={vault.vaultAddress[mainnet.id]} className="max-w-1/2 min-w-[250px] flex-1">
          <MorphoVaultSuppliersCard
            vaultAddress={vault.vaultAddress[mainnet.id]}
            title={
              <span className="flex items-center gap-1.5">
                {vault.name} Suppliers
                <MorphoVaultBadge />
              </span>
            }
          />
        </div>
      ))}
    </div>
  );
}
