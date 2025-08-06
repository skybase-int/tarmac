import { AdvancedTvlCard } from './AdvancedTvlCard';
import { AdvancedExpertSuppliersCard } from './AdvancedExpertSuppliersCard';

export function AdvancedOverview() {
  return (
    <div className="flex w-full flex-wrap justify-between gap-3 xl:flex-nowrap">
      <AdvancedTvlCard />
      <AdvancedExpertSuppliersCard />
    </div>
  );
}
