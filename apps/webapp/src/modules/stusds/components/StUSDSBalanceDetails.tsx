import { useSavingsData, useStUsdsData } from '@jetstreamgg/sky-hooks';
import { formatBigInt } from '@jetstreamgg/sky-utils';
import { SuppliedBalanceCard, UnsuppliedBalanceCard } from '@/modules/ui/components/BalanceCards';
import { t } from '@lingui/core/macro';

export function StUSDSBalanceDetails() {
  const { data, isLoading, error } = useStUsdsData();
  const { data: savingsData, isLoading: savingsIsLoading, error: savingsError } = useSavingsData();

  const usdsToken = { name: 'USDS', symbol: 'USDS' };

  const SuppliedStUSDSBalanceCard = () => {
    const stUsdsBalance = data?.userStUsdsBalance
      ? `(${formatBigInt(data.userStUsdsBalance, { unit: 18, compact: true, maxDecimals: 2 })} stUSDS)`
      : undefined;

    return (
      <SuppliedBalanceCard
        balance={data?.userSuppliedUsds || 0n}
        isLoading={isLoading}
        token={usdsToken}
        error={error}
        label={t`Supplied balance`}
        afterBalance={stUsdsBalance}
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
