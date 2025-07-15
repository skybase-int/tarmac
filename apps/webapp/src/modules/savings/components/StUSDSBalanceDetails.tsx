import { useSavingsData } from '@jetstreamgg/sky-hooks';
import { SuppliedBalanceCard, UnsuppliedBalanceCard } from '@/modules/ui/components/BalanceCards';
import { useTokenBalance, usdcL2Address, sUsdsL2Address } from '@jetstreamgg/sky-hooks';
import { useChainId, useAccount } from 'wagmi';
import { isL2ChainId, formatBigInt } from '@jetstreamgg/sky-utils';

export function StUSDSBalanceDetails() {
  const chainId = useChainId();
  const { address } = useAccount();
  // TODO: Replace with useStUSDSData when available
  const { data, isLoading, error } = useSavingsData();
  const isL2 = isL2ChainId(chainId);
  const isRestrictedMiCa = import.meta.env.VITE_RESTRICTED_BUILD_MICA === 'true';
  const { data: usdcBalance } = useTokenBalance({
    chainId,
    address,
    token: usdcL2Address[chainId as keyof typeof usdcL2Address],
    enabled: isL2
  });

  // TODO: Replace with stUsdsL2Address when available
  const { data: stUsdsBalance } = useTokenBalance({
    chainId,
    address,
    token: sUsdsL2Address[chainId as keyof typeof sUsdsL2Address],
    enabled: isL2
  });

  const usdsToken = { name: 'USDS', symbol: 'USDS' };
  const usdcToken = { name: 'USDC', symbol: 'USDC', decimals: 6 };

  const SuppliedStUSDSBalanceCard = () => {
    return (
      <SuppliedBalanceCard
        balance={data?.userSavingsBalance || 0n}
        isLoading={isLoading}
        token={usdsToken}
        error={error}
        afterBalance={isL2 && stUsdsBalance ? ` (${formatBigInt(stUsdsBalance.value)} stUSDS)` : undefined}
        dataTestId="stusds-supplied-balance-details"
      />
    );
  };

  const UsdsBalanceCard = () => {
    return (
      <UnsuppliedBalanceCard
        balance={data?.userNstBalance || 0n}
        isLoading={isLoading}
        token={usdsToken}
        error={error}
        dataTestId="stusds-remaining-balance-details"
      />
    );
  };

  const UsdcBalanceCard = () => {
    return (
      <UnsuppliedBalanceCard
        balance={usdcBalance?.value || 0n}
        isLoading={isLoading}
        token={usdcToken}
        error={error}
      />
    );
  };

  return isL2 && !isRestrictedMiCa ? (
    <div className="flex w-full flex-col gap-3">
      <div className="w-full">
        <SuppliedStUSDSBalanceCard />
      </div>
      <div className="flex w-full flex-col justify-between gap-3 xl:flex-row">
        <UsdsBalanceCard />
        <UsdcBalanceCard />
      </div>
    </div>
  ) : (
    <div className="flex w-full flex-col justify-between gap-3 xl:flex-row">
      <SuppliedStUSDSBalanceCard />
      <UsdsBalanceCard />
    </div>
  );
}
