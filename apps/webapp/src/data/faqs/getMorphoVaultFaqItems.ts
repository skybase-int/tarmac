import { getMorphoUsdsVaultFaqItems } from './getMorphoUsdsVaultFaqItems';

type MorphoVaultFaqOptions = {
  vaultName?: string;
};

export const getMorphoVaultFaqItems = ({ vaultName }: MorphoVaultFaqOptions = {}) => {
  if (vaultName?.toLowerCase().includes('usds risk capital')) {
    return getMorphoUsdsVaultFaqItems();
  }

  return getMorphoUsdsVaultFaqItems();
};
