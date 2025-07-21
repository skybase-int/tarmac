import { useSavingsData, useStUsdsData } from '@jetstreamgg/sky-hooks';
import { SuppliedBalanceCard, UnsuppliedBalanceCard } from '@/modules/ui/components/BalanceCards';

export function StUSDSBalanceDetails() {
  const { data, isLoading, error } = useStUsdsData();
  const { data: savingsData, isLoading: savingsIsLoading, error: savingsError } = useSavingsData();

  const usdsToken = { name: 'USDS', symbol: 'USDS' };

  const SuppliedStUSDSBalanceCard = () => {
    return (
      <SuppliedBalanceCard
        // TODO convert from stUSDS to USDS
        balance={data?.userStUsdsBalance || 0n}
        isLoading={isLoading}
        token={usdsToken}
        error={error}
        dataTestId="stusds-supplied-balance-details"
      />
    );
  };

  const UsdsBalanceCard = () => {
    return (
      <UnsuppliedBalanceCard
        balance={savingsData?.userNstBalance || 0n}
        isLoading={savingsIsLoading}
        token={usdsToken}
        error={savingsError}
        dataTestId="stusds-remaining-balance-details"
      />
    );
  };

  return (
    <div className="flex w-full flex-col justify-between gap-3 xl:flex-row">
      <SuppliedStUSDSBalanceCard />
      <UsdsBalanceCard />
    </div>
  );
}
