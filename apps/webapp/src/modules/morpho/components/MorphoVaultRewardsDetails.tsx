import { useMorphoVaultRewards } from '@jetstreamgg/sky-hooks';
import { RewardsBalanceCard } from '@/modules/ui/components/BalanceCards';
import { t } from '@lingui/core/macro';

type MorphoVaultRewardsDetailsProps = {
  vaultAddress: `0x${string}`;
};

export function MorphoVaultRewardsDetails({ vaultAddress }: MorphoVaultRewardsDetailsProps) {
  const { data: rewardsData, isLoading, error } = useMorphoVaultRewards({ vaultAddress });

  // Build reward cards for each token with claimable rewards
  const rewardCards = rewardsData?.rewards
    .filter(r => r.amount > 0n)
    .map(reward => {
      const token = {
        symbol: reward.tokenSymbol,
        name: reward.tokenSymbol,
        decimals: reward.tokenDecimals
      };

      return (
        <RewardsBalanceCard
          key={reward.tokenAddress}
          balance={reward.formattedAmount}
          isLoading={isLoading}
          token={token}
          label={t`Accumulated Rewards`}
          error={error}
        />
      );
    });

  // Show reward cards if available, otherwise show a zero-state card
  const hasRewardCards = rewardCards && rewardCards.length > 0;

  const defaultToken = {
    symbol: '',
    name: '',
    decimals: 18
  };

  return (
    <div className="flex w-full flex-col gap-3">
      {hasRewardCards ? (
        rewardCards
      ) : (
        <RewardsBalanceCard
          balance={0n}
          isLoading={isLoading}
          token={defaultToken}
          label={t`Accumulated Rewards`}
          error={error}
        />
      )}
    </div>
  );
}
