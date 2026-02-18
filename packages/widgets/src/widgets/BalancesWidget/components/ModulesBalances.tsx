import {
  TOKENS,
  useAvailableTokenRewardContracts,
  useMultiChainSavingsBalances,
  usePrices,
  useRewardsSuppliedBalance,
  useStUsdsData,
  useTotalUserSealed,
  useTotalUserStaked
} from '@jetstreamgg/sky-hooks';
import { RewardsBalanceCard } from './RewardsBalanceCard';
import { SavingsBalanceCard } from './SavingsBalanceCard';
import { SealBalanceCard } from './SealBalanceCard';
import { StakeBalanceCard } from './StakeBalanceCard';
import { StUSDSBalanceCard } from './StUSDSBalanceCard';
import { isMainnetId, isTestnetId } from '@jetstreamgg/sky-utils';
import { useChainId, useConnection } from 'wagmi';
import { useMemo } from 'react';
import { formatUnits } from 'viem';

export enum ModuleCardVariant {
  default = 'default',
  alt = 'alt'
}

export interface CardProps {
  url?: string;
  onExternalLinkClicked?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  chainIds?: number[];
  loading?: boolean;
  error?: string;
  totalUserRewardsSupplied?: bigint;
  savingsBalances?: { chainId: number; balance: bigint }[];
  sealBalance?: bigint;
  stakeBalance?: bigint;
  variant?: ModuleCardVariant;
}

interface ModulesBalancesProps {
  rewardsCardUrl?: string;
  savingsCardUrlMap?: Record<number, string>;
  sealCardUrl?: string;
  onExternalLinkClicked?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  chainIds?: number[];
  stakeCardUrl?: string;
  stusdsCardUrl?: string;
  variant?: ModuleCardVariant;
  hideZeroBalances?: boolean;
  showAllNetworks?: boolean;
}

export const ModulesBalances = ({
  rewardsCardUrl,
  savingsCardUrlMap,
  sealCardUrl,
  onExternalLinkClicked,
  chainIds,
  stakeCardUrl,
  stusdsCardUrl,
  variant = ModuleCardVariant.default,
  hideZeroBalances = false,
  showAllNetworks = true
}: ModulesBalancesProps): React.ReactElement => {
  const { address } = useConnection();
  const currentChainId = useChainId();
  const mainnetChainId = isTestnetId(currentChainId) ? 314310 : 1;
  const rewardContracts = useAvailableTokenRewardContracts(mainnetChainId);

  const usdsSkyRewardContract = rewardContracts.find(
    f => f.supplyToken.symbol === TOKENS.usds.symbol && f.rewardToken.symbol === TOKENS.sky.symbol
  );
  const usdsCleRewardContract = rewardContracts.find(
    f => f.supplyToken.symbol === TOKENS.usds.symbol && f.rewardToken.symbol === TOKENS.cle.symbol
  );
  const usdsSpkRewardContract = rewardContracts.find(
    f => f.supplyToken.symbol === TOKENS.usds.symbol && f.rewardToken.symbol === TOKENS.spk.symbol
  );

  const {
    data: usdsSkySuppliedBalance,
    isLoading: usdsSkySuppliedBalanceLoading,
    error: usdsSkySuppliedBalanceError
  } = useRewardsSuppliedBalance({
    chainId: mainnetChainId,
    address,
    contractAddress: usdsSkyRewardContract?.contractAddress as `0x${string}`
  });

  const {
    data: usdsSpkSuppliedBalance,
    isLoading: usdsSpkSuppliedBalanceLoading,
    error: usdsSpkSuppliedBalanceError
  } = useRewardsSuppliedBalance({
    chainId: mainnetChainId,
    address,
    contractAddress: usdsSpkRewardContract?.contractAddress as `0x${string}`
  });

  const {
    data: usdsCleSuppliedBalance,
    isLoading: usdsCleSuppliedBalanceIsLoading,
    error: usdsCleSuppliedBalanceError
  } = useRewardsSuppliedBalance({
    chainId: mainnetChainId,
    address,
    contractAddress: usdsCleRewardContract?.contractAddress as `0x${string}`
  });

  const rewardsLoading =
    usdsSkySuppliedBalanceLoading || usdsSpkSuppliedBalanceLoading || usdsCleSuppliedBalanceIsLoading;

  const suppliedBalanceError =
    usdsSkySuppliedBalanceError || usdsCleSuppliedBalanceError || usdsSpkSuppliedBalanceError;

  const totalUserRewardsSupplied =
    usdsSkySuppliedBalance !== undefined &&
    usdsCleSuppliedBalance !== undefined &&
    usdsSpkSuppliedBalance !== undefined
      ? usdsSkySuppliedBalance + usdsCleSuppliedBalance + usdsSpkSuppliedBalance
      : 0n;

  const { data: totalUserSealed, isLoading: sealLoading, error: totalUserSealedError } = useTotalUserSealed();
  const {
    data: totalUserStaked,
    isLoading: stakeLoading,
    error: totalUserStakedError
  } = useTotalUserStaked();

  const { data: stUsdsData, isLoading: stUsdsLoading, error: stUsdsError } = useStUsdsData();

  const {
    data: multichainSavingsBalances,
    isLoading: savingsLoading,
    error: multichainSavingsBalancesError
  } = useMultiChainSavingsBalances({ chainIds });

  const sortedSavingsBalances = Object.entries(multichainSavingsBalances ?? {})
    .sort(([, a], [, b]) => (b > a ? 1 : b < a ? -1 : 0))
    .map(([chainId, balance]) => ({
      chainId: Number(chainId),
      balance
    }));

  const savingsBalancesWithBalanceFilter = hideZeroBalances
    ? sortedSavingsBalances.filter(({ balance }) => balance > 0n)
    : sortedSavingsBalances;

  const filteredAndSortedSavingsBalances = showAllNetworks
    ? savingsBalancesWithBalanceFilter
    : savingsBalancesWithBalanceFilter.filter(({ chainId }) => chainId === currentChainId);

  const totalSavingsBalance = filteredAndSortedSavingsBalances?.reduce(
    (acc, { balance }) => acc + balance,
    0n
  );

  const hideRewards = Boolean(
    suppliedBalanceError ||
      (totalUserRewardsSupplied === 0n && hideZeroBalances) ||
      (!showAllNetworks && !isMainnetId(currentChainId))
  );

  const hideSeal = Boolean(
    totalUserSealedError ||
      (totalUserSealed === 0n && hideZeroBalances) ||
      (!showAllNetworks && !isMainnetId(currentChainId))
  );

  const hideStake = Boolean(
    totalUserStakedError ||
      (totalUserStaked === 0n && hideZeroBalances) ||
      (!showAllNetworks && !isMainnetId(currentChainId))
  );

  const hideStUSDS = Boolean(
    !stusdsCardUrl || // Hide if no URL is provided (feature flag disabled)
      stUsdsError ||
      stUsdsData?.userSuppliedUsds === 0n || //always hide zero balances for expert modules
      (!showAllNetworks && !isMainnetId(currentChainId))
  );

  const hideSavings = Boolean(
    multichainSavingsBalancesError || (totalSavingsBalance === 0n && hideZeroBalances)
  );

  const hideModuleBalances = hideSavings && hideRewards && hideSeal;

  // Fetch prices for USD value calculation
  const { data: pricesData } = usePrices();

  // Calculate USD value helper
  const calculateUsdValue = (amount: bigint, decimals: number, price: string | undefined): number => {
    if (!price || amount === 0n) return 0;
    return parseFloat(formatUnits(amount, decimals)) * parseFloat(price);
  };

  // Create sorted modules array based on USD value
  const sortedModules = useMemo(() => {
    const modules: Array<{
      id: 'rewards' | 'savings' | 'stusds' | 'staking' | 'seal';
      usdValue: number;
      hidden: boolean;
    }> = [
      {
        id: 'rewards',
        usdValue: calculateUsdValue(totalUserRewardsSupplied, 18, pricesData?.USDS?.price),
        hidden: hideModuleBalances || hideRewards
      },
      {
        id: 'savings',
        usdValue: calculateUsdValue(totalSavingsBalance ?? 0n, 18, pricesData?.USDS?.price),
        hidden: hideModuleBalances || hideSavings
      },
      {
        id: 'stusds',
        usdValue: calculateUsdValue(stUsdsData?.userSuppliedUsds ?? 0n, 18, pricesData?.USDS?.price),
        hidden: hideModuleBalances || hideStUSDS
      },
      {
        id: 'staking',
        usdValue: calculateUsdValue(totalUserStaked ?? 0n, 18, pricesData?.SKY?.price),
        hidden: hideStake
      },
      {
        id: 'seal',
        usdValue: calculateUsdValue(totalUserSealed ?? 0n, 18, pricesData?.MKR?.price),
        hidden: hideSeal
      }
    ];

    return modules.filter(m => !m.hidden).sort((a, b) => b.usdValue - a.usdValue);
  }, [
    totalUserRewardsSupplied,
    totalSavingsBalance,
    stUsdsData?.userSuppliedUsds,
    totalUserStaked,
    totalUserSealed,
    pricesData,
    hideModuleBalances,
    hideRewards,
    hideSavings,
    hideStUSDS,
    hideStake,
    hideSeal
  ]);

  // Render functions for each module type
  const renderModule = (moduleId: 'rewards' | 'savings' | 'stusds' | 'staking' | 'seal') => {
    switch (moduleId) {
      case 'rewards':
        return (
          <RewardsBalanceCard
            key="rewards"
            url={rewardsCardUrl}
            onExternalLinkClicked={onExternalLinkClicked}
            loading={rewardsLoading}
            totalUserRewardsSupplied={totalUserRewardsSupplied}
            variant={variant}
          />
        );
      case 'savings':
        return (
          <SavingsBalanceCard
            key="savings"
            urlMap={savingsCardUrlMap ?? {}}
            onExternalLinkClicked={onExternalLinkClicked}
            loading={savingsLoading}
            savingsBalances={filteredAndSortedSavingsBalances}
            variant={variant}
          />
        );
      case 'stusds':
        return (
          <StUSDSBalanceCard
            key="stusds"
            url={stusdsCardUrl}
            onExternalLinkClicked={onExternalLinkClicked}
            loading={stUsdsLoading}
            variant={variant}
          />
        );
      case 'staking':
        return (
          <StakeBalanceCard
            key="staking"
            loading={stakeLoading}
            stakeBalance={totalUserStaked}
            onExternalLinkClicked={onExternalLinkClicked}
            url={stakeCardUrl}
            variant={variant}
          />
        );
      case 'seal':
        return (
          <SealBalanceCard
            key="seal"
            onExternalLinkClicked={onExternalLinkClicked}
            url={sealCardUrl}
            loading={sealLoading}
            sealBalance={totalUserSealed}
            variant={variant}
          />
        );
    }
  };

  return <div className="flex flex-col gap-2">{sortedModules.map(module => renderModule(module.id))}</div>;
};
