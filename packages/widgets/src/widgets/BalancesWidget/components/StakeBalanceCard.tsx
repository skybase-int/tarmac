import {
  usePrices,
  useHighestRateFromChartData,
  useStakeRewardContracts,
  useMultipleRewardsChartInfo,
  useRewardContractsToClaim,
  stakeModuleAddress,
  stakeModuleAbi
} from '@jetstreamgg/sky-hooks';
import {
  formatBigInt,
  formatDecimalPercentage,
  formatNumber,
  isMainnetId,
  chainId
} from '@jetstreamgg/sky-utils';
import { Text } from '@widgets/shared/components/ui/Typography';
import { t } from '@lingui/core/macro';
import { InteractiveStatsCard } from '@widgets/shared/components/ui/card/InteractiveStatsCard';
import { Skeleton } from '@widgets/components/ui/skeleton';
import { formatUnits } from 'viem';
import { CardProps } from './ModulesBalances';
import { PopoverRateInfo } from '@widgets/shared/components/ui/PopoverRateInfo';
import { useChainId, useAccount, useReadContract } from 'wagmi';
import { TokenIcon } from '@widgets/shared/components/ui/token/TokenIcon';

export const StakeBalanceCard = ({ loading, stakeBalance, url, onExternalLinkClicked }: CardProps) => {
  const currentChainId = useChainId();
  const { address } = useAccount();
  const { data: pricesData, isLoading: pricesLoading } = usePrices();

  // Use current chain if it's mainnet or tenderly, otherwise default to mainnet
  const stakingChainId = isMainnetId(currentChainId) ? currentChainId : chainId.mainnet;

  const { data: stakeRewardContracts } = useStakeRewardContracts();
  const { data: stakeRewardsChartsInfoData } = useMultipleRewardsChartInfo({
    rewardContractAddresses: stakeRewardContracts?.map(({ contractAddress }) => contractAddress) || []
  });

  const { data: currentUrnIndex } = useReadContract({
    chainId: stakingChainId,
    address: stakeModuleAddress[stakingChainId as keyof typeof stakeModuleAddress],
    abi: stakeModuleAbi,
    functionName: 'ownerUrnsCount',
    args: [address!],
    query: {
      enabled: !!address
    }
  });

  const urnCount = Number(currentUrnIndex || 0n);

  const { data: urn0Address } = useReadContract({
    chainId: stakingChainId,
    address: stakeModuleAddress[stakingChainId as keyof typeof stakeModuleAddress],
    abi: stakeModuleAbi,
    functionName: 'ownerUrns',
    args: [address!, BigInt(0)],
    query: {
      enabled: !!address && urnCount > 0
    }
  });

  const { data: urn1Address } = useReadContract({
    chainId: stakingChainId,
    address: stakeModuleAddress[stakingChainId as keyof typeof stakeModuleAddress],
    abi: stakeModuleAbi,
    functionName: 'ownerUrns',
    args: [address!, BigInt(1)],
    query: {
      enabled: !!address && urnCount > 1
    }
  });

  const { data: urn2Address } = useReadContract({
    chainId: stakingChainId,
    address: stakeModuleAddress[stakingChainId as keyof typeof stakeModuleAddress],
    abi: stakeModuleAbi,
    functionName: 'ownerUrns',
    args: [address!, BigInt(2)],
    query: {
      enabled: !!address && urnCount > 2
    }
  });

  const { data: urn3Address } = useReadContract({
    chainId: stakingChainId,
    address: stakeModuleAddress[stakingChainId as keyof typeof stakeModuleAddress],
    abi: stakeModuleAbi,
    functionName: 'ownerUrns',
    args: [address!, BigInt(3)],
    query: {
      enabled: !!address && urnCount > 3
    }
  });

  const stakeContractAddresses = (stakeRewardContracts?.map(c => c.contractAddress) as `0x${string}`[]) || [];

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

  const allUnclaimedRewardsData = [
    ...(rewards0 || []),
    ...(rewards1 || []),
    ...(rewards2 || []),
    ...(rewards3 || [])
  ];

  const highestRateData = useHighestRateFromChartData(stakeRewardsChartsInfoData || []);

  const totalStakedValue =
    stakeBalance && pricesData?.SKY
      ? parseFloat(formatUnits(stakeBalance, 18)) * parseFloat(pricesData.SKY.price)
      : 0;

  const { totalUnclaimedRewardsValue, uniqueRewardTokens } =
    allUnclaimedRewardsData.length > 0
      ? allUnclaimedRewardsData.reduce(
          (acc, reward) => {
            const price = pricesData?.[reward.rewardSymbol]?.price || '0';
            const rewardAmount = parseFloat(formatUnits(reward.claimBalance, 18));
            acc.totalUnclaimedRewardsValue += rewardAmount * parseFloat(price);
            if (!acc.uniqueRewardTokens.includes(reward.rewardSymbol)) {
              acc.uniqueRewardTokens.push(reward.rewardSymbol);
            }
            return acc;
          },
          { totalUnclaimedRewardsValue: 0, uniqueRewardTokens: [] as string[] }
        )
      : { totalUnclaimedRewardsValue: 0, uniqueRewardTokens: [] as string[] };

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
        <div className="flex flex-col gap-1">
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
          {totalUnclaimedRewardsValue > 0 && (
            <div className="flex items-center gap-1.5">
              <Text variant="small" className="text-textSecondary">
                {t`Unclaimed rewards`}
              </Text>
              <div className="flex items-center -space-x-0.5">
                {uniqueRewardTokens.map((tokenSymbol, index) => (
                  <div key={tokenSymbol} style={{ zIndex: uniqueRewardTokens.length - index }}>
                    <TokenIcon token={{ symbol: tokenSymbol }} width={16} className="h-4 w-4" noChain />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      }
      footerRightContent={
        loading || pricesLoading ? (
          <Skeleton className="h-[13px] w-20" />
        ) : (
          <div className="flex flex-col items-end gap-1">
            {stakeBalance !== undefined && !!pricesData?.SKY && (
              <Text variant="small" className="text-textSecondary">
                $
                {formatNumber(totalStakedValue, {
                  maxDecimals: 2
                })}
              </Text>
            )}
            {totalUnclaimedRewardsValue > 0 && (
              <Text variant="small" className="text-textPrimary">
                ${formatNumber(totalUnclaimedRewardsValue, { maxDecimals: 2 })}
              </Text>
            )}
          </div>
        )
      }
      url={url}
    />
  );
};
