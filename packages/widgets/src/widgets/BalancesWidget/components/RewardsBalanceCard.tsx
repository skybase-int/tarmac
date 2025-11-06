import {
  useAvailableTokenRewardContracts,
  useRewardsChartInfo,
  TOKENS,
  usePrices,
  useHighestRateFromChartData,
  useRewardContractsToClaim
} from '@jetstreamgg/sky-hooks';
import { formatBigInt, formatDecimalPercentage, formatNumber } from '@jetstreamgg/sky-utils';
import { Text } from '@widgets/shared/components/ui/Typography';
import { t } from '@lingui/core/macro';
import { InteractiveStatsCard } from '@widgets/shared/components/ui/card/InteractiveStatsCard';
import { Skeleton } from '@widgets/components/ui/skeleton';
import { PopoverRateInfo } from '@widgets/shared/components/ui/PopoverRateInfo';
import { formatUnits } from 'viem';
import { CardProps } from './ModulesBalances';
import { useChainId, useAccount } from 'wagmi';
import { isTestnetId } from '@jetstreamgg/sky-utils';

export const RewardsBalanceCard = ({
  url,
  onExternalLinkClicked,
  loading,
  totalUserRewardsSupplied
}: CardProps) => {
  const { address } = useAccount();
  const currentChainId = useChainId();
  const chainId = isTestnetId(currentChainId) ? 314310 : 1; //TODO: update once we add non-mainnet rewards
  const rewardContracts = useAvailableTokenRewardContracts(chainId);

  const usdsSkyRewardContract = rewardContracts.find(
    f => f.supplyToken.symbol === TOKENS.usds.symbol && f.rewardToken.symbol === TOKENS.sky.symbol
  );

  const usdsSpkRewardContract = rewardContracts.find(
    f => f.supplyToken.symbol === TOKENS.usds.symbol && f.rewardToken.symbol === TOKENS.spk.symbol
  );

  // Fetch chart data for both reward contracts
  const { data: usdsSkyChartData, isLoading: usdsSkyChartDataLoading } = useRewardsChartInfo({
    rewardContractAddress: usdsSkyRewardContract?.contractAddress as string,
    limit: 1
  });

  const { data: usdsSpkChartData, isLoading: usdsSpkChartDataLoading } = useRewardsChartInfo({
    rewardContractAddress: usdsSpkRewardContract?.contractAddress as string,
    limit: 1
  });

  // Find the highest rate from both contracts
  const highestRateData = useHighestRateFromChartData([usdsSkyChartData, usdsSpkChartData]);

  const { data: pricesData, isLoading: pricesLoading } = usePrices();

  // Fetch unclaimed rewards for all rewards contracts
  const rewardContractAddresses = rewardContracts
    .filter(c => c.supplyToken.symbol === TOKENS.usds.symbol)
    .map(c => c.contractAddress) as `0x${string}`[];

  const { data: unclaimedRewardsData, isLoading: unclaimedRewardsLoading } = useRewardContractsToClaim({
    rewardContractAddresses,
    userAddress: address,
    chainId,
    enabled: !!address
  });

  // Calculate total unclaimed rewards value in USD
  const totalUnclaimedRewardsValue = unclaimedRewardsData
    ? unclaimedRewardsData.reduce((total, reward) => {
        const price = pricesData?.[reward.rewardSymbol]?.price || '0';
        const rewardAmount = parseFloat(formatUnits(reward.claimBalance, 18));
        return total + rewardAmount * parseFloat(price);
      }, 0)
    : 0;

  const chartDataLoading = usdsSkyChartDataLoading || usdsSpkChartDataLoading;
  const mostRecentRateNumber = highestRateData ? parseFloat(highestRateData.rate) : null;

  return (
    <InteractiveStatsCard
      title={t`USDS supplied to Rewards`}
      tokenSymbol="USDS"
      headerRightContent={
        loading ? (
          <Skeleton className="w-32" />
        ) : (
          <Text>
            {`${totalUserRewardsSupplied !== undefined ? formatBigInt(totalUserRewardsSupplied) : '0'}`}
          </Text>
        )
      }
      footer={
        <div className="flex flex-col gap-2">
          {chartDataLoading ? (
            <Skeleton className="h-4 w-20" />
          ) : mostRecentRateNumber && mostRecentRateNumber > 0 ? (
            <div className="flex w-fit items-center gap-1.5">
              <Text variant="small" className="text-bullish leading-4">
                {`Rates up to: ${mostRecentRateNumber ? formatDecimalPercentage(mostRecentRateNumber) : '0%'}`}
              </Text>
              <PopoverRateInfo
                type="str"
                onExternalLinkClicked={onExternalLinkClicked}
                iconClassName="h-[13px] w-[13px]"
              />
            </div>
          ) : (
            <></>
          )}
          {unclaimedRewardsLoading ? (
            <Skeleton className="h-4 w-20" />
          ) : totalUnclaimedRewardsValue > 0 ? (
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
        ) : totalUserRewardsSupplied !== undefined && !!pricesData?.USDS ? (
          <Text variant="small" className="text-textSecondary">
            $
            {formatNumber(
              parseFloat(formatUnits(totalUserRewardsSupplied, 18)) * parseFloat(pricesData.USDS.price),
              {
                maxDecimals: 2
              }
            )}
          </Text>
        ) : undefined
      }
      url={url}
    />
  );
};
