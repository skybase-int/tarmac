import { getMorphoVaultFaqItems } from '@/data/faqs/getMorphoVaultFaqItems';
import { FaqAccordion } from '@/modules/ui/components/FaqAccordion';

type MorphoVaultFaqProps = {
  vaultName?: string;
};

export function MorphoVaultFaq({ vaultName }: MorphoVaultFaqProps) {
  const faqItems = getMorphoVaultFaqItems({ vaultName });

  return <FaqAccordion items={faqItems} />;
}
