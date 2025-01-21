import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { positionAnimations } from '@/shared/animation/presets';
import { MotionVStack } from '@/shared/components/ui/layout/MotionVStack';
import { Text } from '@/shared/components/ui/Typography';
import { BoostedRewardsData } from '@jetstreamgg/hooks';
import { Trans } from '@lingui/react/macro';
import { BoostedRewards } from '@/shared/components/icons/BoostedRewards';
import { useTokenImage } from '@/shared/hooks/useTokenImage';
import { formatBigInt } from '@jetstreamgg/utils';

const BoostedRewardsBanner = ({
  boostedRewardsData
}: {
  boostedRewardsData: BoostedRewardsData | undefined;
}) => {
  const skyImageSrc = useTokenImage('sky_purple');

  return (
    <Card className="w-full p-0 lg:p-0">
      <div className="relative h-full w-full overflow-hidden rounded-[20px]">
        <div
          className="absolute h-full w-full"
          style={{
            background: 'radial-gradient(258.73% 268.92% at 116.69% 275.4%, #F7A7F9 0%, #6D28FF 100%)'
          }}
        />
        <div
          className="absolute left-[80%] h-full w-[45%]"
          style={{
            background: 'linear-gradient(0deg, #F7A7F9 0%, #00DDFB 300%)',
            clipPath: 'polygon(100% 20%, 10% 100%, 0 100%, 55% 0)'
          }}
        />
        <div className="absolute -bottom-2 right-2 h-full w-28">
          <BoostedRewards className="h-full w-full" />
        </div>
        {skyImageSrc && (
          <div className="absolute -bottom-2 right-2 h-full w-28">
            <img src={skyImageSrc} alt="SKY token" />
          </div>
        )}
        <div className="relative z-10 h-full w-full p-3 lg:p-6">
          <Text className="mb-2">
            <Trans>Boosted rewards</Trans>
          </Text>
          {boostedRewardsData?.amount !== undefined && (
            <Text variant="large" className="text-2xl">
              {formatBigInt(boostedRewardsData.amount)} SKY
            </Text>
          )}
        </div>
      </div>
    </Card>
  );
};

export function BoostedRewardsSection({
  boostedRewardsData,
  claimBoostedRewards,
  isClaimBoostedRewardsDisabled
}: {
  boostedRewardsData: BoostedRewardsData | undefined;
  claimBoostedRewards: () => void;
  isClaimBoostedRewardsDisabled: boolean;
}) {
  return (
    <MotionVStack className="mb-6 w-full space-y-6" variants={positionAnimations}>
      <BoostedRewardsBanner boostedRewardsData={boostedRewardsData} />
      <Card>
        <Text className="mb-3">
          <Trans>You can claim your boosted rewards now and hold your SKY.</Trans>
        </Text>
        {/* TODO: Do we want to keep this button? */}
        {/* <div onClick={() => {}} className="mb-3 cursor-pointer">
          <Text tag="span" className="text-textEmphasis">
            <Trans>Learn more about boosted rewards</Trans>
          </Text>
        </div> */}
        <Button
          className="w-full text-[16px]"
          disabled={isClaimBoostedRewardsDisabled}
          onClick={claimBoostedRewards}
        >
          <Trans>Claim boosted rewards</Trans>
        </Button>
      </Card>
    </MotionVStack>
  );
}
