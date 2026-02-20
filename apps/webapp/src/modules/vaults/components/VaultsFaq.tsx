import { getMorphoVaultFaqItems } from '@/data/faqs/getMorphoVaultFaqItems';
import { FaqAccordion } from '@/modules/ui/components/FaqAccordion';

export function VaultsFaq() {
  const faqItems = getMorphoVaultFaqItems();

  return <FaqAccordion items={faqItems} />;
}
