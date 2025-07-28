import { Intent } from '@/lib/enums';
import { ModuleCard } from '../ModuleCard';
import { t } from '@lingui/core/macro';
import { HStack } from '@/modules/layout/components/HStack';
import { PairTokenIcons, PopoverRateInfo } from '@jetstreamgg/sky-widgets';
import { mainnet } from 'viem/chains';
import { Text } from '@/modules/layout/components/Typography';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDecimalPercentage, isL2ChainId } from '@jetstreamgg/sky-utils';
import {
  TOKENS,
  useAvailableTokenRewardContracts,
  useHighestRateFromChartData,
  useRewardsChartInfo
} from '@jetstreamgg/sky-hooks';
import { useChainId } from 'wagmi';

export function RewardsCard() {
  const chainId = useChainId();
  const isL2 = isL2ChainId(chainId);

  const rewardContracts = useAvailableTokenRewardContracts(mainnet.id);

  const usdsSkyRewardContract = rewardContracts.find(
    f => f.supplyToken.symbol === TOKENS.usds.symbol && f.rewardToken.symbol === TOKENS.sky.symbol
  );

  const usdsSpkRewardContract = rewardContracts.find(
    f => f.supplyToken.symbol === TOKENS.usds.symbol && f.rewardToken.symbol === TOKENS.spk.symbol
  );

  // Fetch chart data for both reward contracts
  const { data: usdsSkyChartData, isLoading: usdsSkyChartDataLoading } = useRewardsChartInfo({
    rewardContractAddress: usdsSkyRewardContract?.contractAddress as string
  });

  const { data: usdsSpkChartData, isLoading: usdsSpkChartDataLoading } = useRewardsChartInfo({
    rewardContractAddress: usdsSpkRewardContract?.contractAddress as string
  });

  // Find the highest rate from both contracts
  const highestRateData = useHighestRateFromChartData([usdsSkyChartData, usdsSpkChartData]);
  const chartDataLoading = usdsSkyChartDataLoading || usdsSpkChartDataLoading;
  const mostRecentRateNumber = highestRateData ? parseFloat(highestRateData.rate) : null;

  return (
    <ModuleCard
      intent={Intent.REWARDS_INTENT}
      module={t`Rewards`}
      title={t`Access rewards without giving up control`}
      subHeading={
        <div className="flex flex-wrap gap-2 lg:gap-4">
          <HStack gap={2}>
            <PairTokenIcons leftToken="USDS" rightToken="SKY" chainId={mainnet.id} />
            <Text className="text-textSecondary">With: USDS Get: SKY</Text>
          </HStack>
          <HStack gap={2}>
            <PairTokenIcons leftToken="USDS" rightToken="SPK" chainId={mainnet.id} />
            <Text className="text-textSecondary">With: USDS Get: SPK</Text>
          </HStack>
          <HStack gap={2}>
            <PairTokenIcons leftToken="USDS" rightToken="CLE" chainId={mainnet.id} />
            <Text className="text-textSecondary"> With: USDS Get: Chronicle Points</Text>
          </HStack>
        </div>
      }
      emphasisText={
        chartDataLoading ? (
          <Skeleton className="h-12 w-80" />
        ) : (
          <Text className="text-2xl lg:text-[32px]">
            Rates <span className="text-lg">up to</span>{' '}
            {mostRecentRateNumber ? formatDecimalPercentage(mostRecentRateNumber) : '0%'}
            <PopoverRateInfo type="str" iconClassName="mt-auto -translate-y-1/4 ml-2" />
          </Text>
        )
      }
      className="from-[#342596] to-[#0b7ce6]"
      notAvailable={isL2}
      soon={isL2}
      logoName="rewards"
    />
  );
}
