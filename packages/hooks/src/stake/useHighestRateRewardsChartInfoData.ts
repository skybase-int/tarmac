import { lsSkyUsdsRewardAddress, lsSkySpkRewardAddress, useRewardsChartInfo } from '@jetstreamgg/sky-hooks';
import { useMemo } from 'react';
import { mainnet } from 'viem/chains';

export const useHighestRateRewardsChartInfoData = () => {
  // Fetch from this BA labs endpoint to get the rate
  const { data: lsSkyRewardsChartInfoData } = useRewardsChartInfo({
    rewardContractAddress: lsSkyUsdsRewardAddress[mainnet.id as keyof typeof lsSkyUsdsRewardAddress]
  });

  const { data: lsSpkRewardsChartInfoData } = useRewardsChartInfo({
    rewardContractAddress: lsSkySpkRewardAddress[mainnet.id as keyof typeof lsSkySpkRewardAddress]
  });

  const mostRecentLsSkyData = useMemo(
    () => lsSkyRewardsChartInfoData?.slice().sort((a, b) => b.blockTimestamp - a.blockTimestamp)[0],
    [lsSkyRewardsChartInfoData]
  );

  const mostRecentLsSpkData = useMemo(
    () => lsSpkRewardsChartInfoData?.slice().sort((a, b) => b.blockTimestamp - a.blockTimestamp)[0],
    [lsSpkRewardsChartInfoData]
  );

  const highestRateData = useMemo(() => {
    if (!mostRecentLsSkyData && !mostRecentLsSpkData) return null;
    if (!mostRecentLsSkyData) return mostRecentLsSpkData;
    if (!mostRecentLsSpkData) return mostRecentLsSkyData;

    const skyRate = parseFloat(mostRecentLsSkyData.rate || '0');
    const spkRate = parseFloat(mostRecentLsSpkData.rate || '0');

    return skyRate > spkRate ? mostRecentLsSkyData : mostRecentLsSpkData;
  }, [mostRecentLsSkyData, mostRecentLsSpkData]);

  return highestRateData;
};
