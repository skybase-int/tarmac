import { Skeleton } from '@/components/ui/skeleton';
import { MotionHStack } from '@/shared/components/ui/layout/MotionHStack';
import { TokenIcon } from '@/shared/components/ui/token/TokenIcon';
import { PopoverRateInfo } from '@/shared/components/ui/PopoverRateInfo';
import { Text } from '@/shared/components/ui/Typography';
import { StatsOverviewCardCore } from '@/shared/components/ui/card/StatsOverviewCardCore';
import { positionAnimations } from '@/shared/animation/presets';
import { useOverallSkyData } from '@jetstreamgg/hooks';
import { formatDecimalPercentage } from '@jetstreamgg/utils';
import { JSX } from 'react';

export const SavingsStatsCardCore = ({
  content,
  isLoading,
  onExternalLinkClicked
}: {
  content: JSX.Element;
  isLoading: boolean;
  onExternalLinkClicked?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}) => {
  const { data: overallSkyData, isLoading: isOverallSkyDataLoading } = useOverallSkyData();

  return (
    <StatsOverviewCardCore
      headerLeftContent={
        <MotionHStack className="items-center" gap={2} variants={positionAnimations}>
          <TokenIcon className="h-6 w-6" token={{ symbol: 'USDS' }} />
          <Text>Sky Savings Rate</Text>
        </MotionHStack>
      }
      headerRightContent={
        <MotionHStack className="items-center" gap={2} variants={positionAnimations}>
          <Text className="text-bullish">
            {isLoading || isOverallSkyDataLoading ? (
              <Skeleton className="bg-textSecondary h-5 w-12" />
            ) : overallSkyData?.skySavingsRatecRate ? (
              `Rate: ${formatDecimalPercentage(parseFloat(overallSkyData.skySavingsRatecRate))}`
            ) : (
              '--'
            )}
          </Text>
          <PopoverRateInfo type="ssr" onExternalLinkClicked={onExternalLinkClicked} />
        </MotionHStack>
      }
      content={content}
      className="cursor-default"
    />
  );
};
