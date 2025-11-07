import {
  usePrices,
  useHighestRateFromChartData,
  useStakeRewardContracts,
  useMultipleRewardsChartInfo,
  useAllStakeUrnAddresses,
  useRewardContractsToClaim,
  TOKENS,
  getTokenDecimals
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
import { useChainId, useAccount } from 'wagmi';
import { TokenIcon } from '@widgets/shared/components/ui/token/TokenIcon';

export const StakeBalanceCard = ({ loading, stakeBalance, url, onExternalLinkClicked }: CardProps) => {
  const currentChainId = useChainId();
  const { address } = useAccount();
  const { data: pricesData, isLoading: pricesLoading } = usePrices();

  // Use current chain if it's mainnet or tenderly, otherwise default to mainnet
  const stakeChainId = isMainnetId(currentChainId) ? currentChainId : chainId.mainnet;

  const { data: stakeRewardContracts } = useStakeRewardContracts();
  const { data: stakeRewardsChartsInfoData } = useMultipleRewardsChartInfo({
    rewardContractAddresses: stakeRewardContracts?.map(({ contractAddress }) => contractAddress) || []
  });

  const stakeContractAddresses = (stakeRewardContracts?.map(c => c.contractAddress) as `0x${string}`[]) || [];

  const { data: urnAddresses } = useAllStakeUrnAddresses(address);

  const { data: allUnclaimedRewardsData } = useRewardContractsToClaim({
    rewardContractAddresses: stakeContractAddresses,
    addresses: urnAddresses,
    chainId: stakeChainId,
    enabled: urnAddresses.length > 0 && stakeContractAddresses.length > 0
  });

  const highestRateData = useHighestRateFromChartData(stakeRewardsChartsInfoData || []);

  const totalStakedValue =
    stakeBalance && pricesData?.SKY
      ? parseFloat(formatUnits(stakeBalance, 18)) * parseFloat(pricesData.SKY.price)
      : 0;

  const { totalUnclaimedRewardsValue, uniqueRewardTokens } =
    allUnclaimedRewardsData && allUnclaimedRewardsData.length > 0
      ? allUnclaimedRewardsData.reduce(
          (acc, reward) => {
            const price = pricesData?.[reward.rewardSymbol]?.price || '0';
            const tokenSymbol = reward.rewardSymbol.toLowerCase() as keyof typeof TOKENS;
            const token = TOKENS[tokenSymbol];
            const decimals = getTokenDecimals(token, stakeChainId);
            const rewardAmount = parseFloat(formatUnits(reward.claimBalance, decimals));
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
