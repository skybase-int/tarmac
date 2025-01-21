import { RewardContract, WriteHook } from '@jetstreamgg/hooks';
import { formatBigInt } from '@jetstreamgg/utils';
import { Trans } from '@lingui/react/macro';
import { t } from '@lingui/core/macro';
import { Skeleton } from '@/components/ui/skeleton';
import { LoadingButton } from '@/shared/components/ui/LoadingButton';
import { Text } from '@/shared/components/ui/Typography';

type HarvestRewardsProps = {
  rewardContract?: RewardContract;
  claim?: WriteHook;
  rewardsBalance?: bigint;
};

export function HarvestRewards({ rewardContract, claim, rewardsBalance }: HarvestRewardsProps) {
  return (
    <div className="flex w-full flex-col">
      <div className="flex justify-between">
        <div>
          <Text>
            <Trans>My Rewards</Trans> ✨
          </Text>
        </div>
        <div>
          {rewardsBalance || rewardsBalance === 0n ? (
            <Text>
              {formatBigInt(rewardsBalance)} {rewardContract?.rewardToken.symbol}
            </Text>
          ) : (
            <Skeleton className="h-[20px] w-[75px] rounded-full" />
          )}
        </div>
      </div>
      <div>
        <div className="mt-2">
          {!!(rewardsBalance && rewardsBalance > 0n) && (
            <div className="mt-3">
              <LoadingButton
                variant="pill"
                onClick={claim?.execute}
                buttonText={t`Harvest`}
                isLoading={claim?.isLoading}
                loadingText={t`Harvesting...`}
                data-testid="harvest-button"
              />
            </div>
          )}

          {!!(rewardsBalance && rewardsBalance <= 0n) && (
            <Text>
              <Trans>No rewards available, supply {rewardContract?.supplyToken.name} to earn rewards</Trans>
            </Text>
          )}
        </div>
      </div>
    </div>
  );
}
