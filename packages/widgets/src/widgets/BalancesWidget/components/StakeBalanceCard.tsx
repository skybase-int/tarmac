import {
  usePrices,
  useHighestRateFromChartData,
  useStakeRewardContracts,
  useMultipleRewardsChartInfo,
  useCurrentUrnIndex,
  useStakeUrnAddress,
  useRewardContractsToClaim
} from '@jetstreamgg/sky-hooks';
import { formatBigInt, formatDecimalPercentage, formatNumber } from '@jetstreamgg/sky-utils';
import { Text } from '@widgets/shared/components/ui/Typography';
import { t } from '@lingui/core/macro';
import { InteractiveStatsCard } from '@widgets/shared/components/ui/card/InteractiveStatsCard';
import { Skeleton } from '@widgets/components/ui/skeleton';
import { formatUnits } from 'viem';
import { CardProps } from './ModulesBalances';
import { PopoverRateInfo } from '@widgets/shared/components/ui/PopoverRateInfo';
import { useChainId } from 'wagmi';

export const StakeBalanceCard = ({ loading, stakeBalance, url, onExternalLinkClicked }: CardProps) => {
  const currentChainId = useChainId();
  const { data: pricesData, isLoading: pricesLoading } = usePrices();

  // Fetch chart data for all stake reward contracts
  const { data: stakeRewardContracts } = useStakeRewardContracts();
  const { data: stakeRewardsChartsInfoData } = useMultipleRewardsChartInfo({
    rewardContractAddresses: stakeRewardContracts?.map(({ contractAddress }) => contractAddress) || []
  });

  // Get user's URN count and addresses for staking rewards
  const { data: currentUrnIndex } = useCurrentUrnIndex();
  const urnCount = Number(currentUrnIndex || 0n);

  // Check multiple URNs for rewards (since user has 4 URNs) - using useStakeUrnAddress
  const { data: urn0Address } = useStakeUrnAddress(urnCount > 0 ? BigInt(0) : undefined);
  const { data: urn1Address } = useStakeUrnAddress(urnCount > 1 ? BigInt(1) : undefined);
  const { data: urn2Address } = useStakeUrnAddress(urnCount > 2 ? BigInt(2) : undefined);
  const { data: urn3Address } = useStakeUrnAddress(urnCount > 3 ? BigInt(3) : undefined);

  // Use current chainId (supports Tenderly)
  const stakingChainId = currentChainId;

  // Fetch unclaimed rewards for the first URN from all staking reward contracts
  const stakeContractAddresses = (stakeRewardContracts?.map(c => c.contractAddress) as `0x${string}`[]) || [];

  // Check rewards for each URN
  const { data: rewards0 } = useRewardContractsToClaim({
    rewardContractAddresses: stakeContractAddresses,
    userAddress: urn0Address,
    chainId: stakingChainId,
    enabled: !!urn0Address && stakeContractAddresses.length > 0
  });

  const { data: rewards1 } = useRewardContractsToClaim({
    rewardContractAddresses: stakeContractAddresses,
    userAddress: urn1Address,
    chainId: stakingChainId,
    enabled: !!urn1Address && stakeContractAddresses.length > 0
  });

  const { data: rewards2 } = useRewardContractsToClaim({
    rewardContractAddresses: stakeContractAddresses,
    userAddress: urn2Address,
    chainId: stakingChainId,
    enabled: !!urn2Address && stakeContractAddresses.length > 0
  });

  const { data: rewards3 } = useRewardContractsToClaim({
    rewardContractAddresses: stakeContractAddresses,
    userAddress: urn3Address,
    chainId: stakingChainId,
    enabled: !!urn3Address && stakeContractAddresses.length > 0
  });

  // Combine all rewards from all URNs
  const allUnclaimedRewardsData = [
    ...(rewards0 || []),
    ...(rewards1 || []),
    ...(rewards2 || []),
    ...(rewards3 || [])
  ];

  // Find the highest rate
  const highestRateData = useHighestRateFromChartData(stakeRewardsChartsInfoData || []);

  const totalStakedValue =
    stakeBalance && pricesData?.SKY
      ? parseFloat(formatUnits(stakeBalance, 18)) * parseFloat(pricesData.SKY.price)
      : 0;

  // Calculate total unclaimed rewards value in USD from all URNs
  const totalUnclaimedRewardsValue =
    allUnclaimedRewardsData.length > 0
      ? allUnclaimedRewardsData.reduce((total, reward) => {
          const price = pricesData?.[reward.rewardSymbol]?.price || '0';
          const rewardAmount = parseFloat(formatUnits(reward.claimBalance, 18));
          return total + rewardAmount * parseFloat(price);
        }, 0)
      : 0;

  return (
    <InteractiveStatsCard
      title={t`SKY supplied to Staking Engine`}
      tokenSymbol="SKY"
      headerRightContent={
        loading ? (
          <Skeleton className="w-32" />
        ) : (
          <Text>{`${stakeBalance ? formatBigInt(stakeBalance) : '0'}`}</Text>
        )
      }
      footer={
        <div className="flex flex-col gap-2">
          <div className="z-[99999] flex w-fit items-center gap-1.5">
            <Text variant="small" className="text-bullish leading-4">
              {`Rates up to: ${formatDecimalPercentage(parseFloat(highestRateData?.rate || '0'))}`}
            </Text>
            <PopoverRateInfo
              type="srr"
              onExternalLinkClicked={onExternalLinkClicked}
              iconClassName="h-[13px] w-[13px]"
            />
          </div>
          {totalUnclaimedRewardsValue > 0 ? (
            <div className="flex w-full items-center justify-between">
              <Text variant="small" className="text-textSecondary">
                {t`Unclaimed rewards`}
              </Text>
              <Text variant="small" className="text-textPrimary">
                ${formatNumber(totalUnclaimedRewardsValue, { maxDecimals: 2 })}
              </Text>
            </div>
          ) : null}
        </div>
      }
      footerRightContent={
        loading || pricesLoading ? (
          <Skeleton className="h-[13px] w-20" />
        ) : stakeBalance !== undefined && !!pricesData?.SKY ? (
          <Text variant="small" className="text-textSecondary">
            $
            {formatNumber(totalStakedValue, {
              maxDecimals: 2
            })}
          </Text>
        ) : undefined
      }
      url={url}
    />
  );
};
