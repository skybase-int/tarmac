import { formatUnits } from 'viem';
import { TOKENS, getTokenDecimals } from '@jetstreamgg/sky-hooks';
import type { PriceData } from '@jetstreamgg/sky-hooks';

interface UnclaimedRewardData {
  rewardSymbol: string;
  claimBalance: bigint;
}

interface UnclaimedRewardsResult {
  totalUnclaimedRewardsValue: number;
  uniqueRewardTokens: string[];
}

export const calculateUnclaimedRewards = (
  unclaimedRewardsData: UnclaimedRewardData[] | undefined,
  pricesData: Record<string, PriceData> | undefined,
  chainId: number
): UnclaimedRewardsResult => {
  if (!unclaimedRewardsData || !pricesData) {
    return { totalUnclaimedRewardsValue: 0, uniqueRewardTokens: [] };
  }

  return unclaimedRewardsData.reduce(
    (acc, reward) => {
      const price = pricesData[reward.rewardSymbol]?.price || '0';
      const tokenSymbol = reward.rewardSymbol.toLowerCase() as keyof typeof TOKENS;
      const token = TOKENS[tokenSymbol];
      const decimals = getTokenDecimals(token, chainId);
      const rewardAmount = parseFloat(formatUnits(reward.claimBalance, decimals));
      acc.totalUnclaimedRewardsValue += rewardAmount * parseFloat(price);

      if (!acc.uniqueRewardTokens.includes(reward.rewardSymbol)) {
        acc.uniqueRewardTokens.push(reward.rewardSymbol);
      }

      return acc;
    },
    { totalUnclaimedRewardsValue: 0, uniqueRewardTokens: [] as string[] }
  );
};
