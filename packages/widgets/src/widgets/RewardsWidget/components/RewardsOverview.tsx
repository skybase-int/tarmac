import { WidgetContext } from '@/context/WidgetContext';
import {
  RewardContract,
  useAvailableTokenRewardContracts,
  useRewardsWithUserBalance
} from '@jetstreamgg/hooks';
import { useContext, useMemo } from 'react';
import { useAccount, useChainId } from 'wagmi';
import { RewardsAction } from '@/widgets/RewardsWidget/lib/constants';
import { RewardsStatsCard } from './RewardsStatsCard';
import { motion } from 'framer-motion';
import { positionAnimations } from '@/shared/animation/presets';
import { Heading } from '@/shared/components/ui/Typography';
import { Trans } from '@lingui/react/macro';

type RewardsOverviewProps = {
  onSelectRewardContract: (rewardContract: RewardContract) => void;
  isConnectedAndEnabled: boolean;
  onExternalLinkClicked?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
};

export const RewardsOverview = ({
  onSelectRewardContract,
  onExternalLinkClicked,
  isConnectedAndEnabled = true
}: RewardsOverviewProps) => {
  const chainId = useChainId();
  const { address } = useAccount();
  const rewardContracts = useAvailableTokenRewardContracts(chainId);
  const { widgetState, setWidgetState } = useContext(WidgetContext);

  const { data: rewardsWithUserBalance } = useRewardsWithUserBalance({
    address,
    chainId,
    contractAddresses: rewardContracts.map(rewardContract => rewardContract.contractAddress as `0x${string}`)
  });

  const [userRewards, allRewards] = useMemo(() => {
    const userRewards: RewardContract[] = [];
    const allRewards: RewardContract[] = [];

    rewardContracts.forEach(rewardContract => {
      const rewardWithUserBalance = rewardsWithUserBalance?.find(
        reward => reward.rewardContract === rewardContract.contractAddress
      );

      if (!!rewardWithUserBalance && rewardWithUserBalance.userHasBalance) {
        userRewards.push(rewardContract);
      } else {
        allRewards.push(rewardContract);
      }
    });

    return [userRewards, allRewards];
  }, [rewardContracts, rewardsWithUserBalance]);

  const handleRewardContractClick = (rewardContract: RewardContract) => {
    onSelectRewardContract(rewardContract);
    setWidgetState({
      ...widgetState,
      action: RewardsAction.SUPPLY
    });
  };

  return (
    <div className="space-y-4">
      {userRewards.length > 0 && (
        <motion.div className="space-y-3" variants={positionAnimations}>
          <Heading tag="h3" variant="medium">
            <Trans>My rewards</Trans>
          </Heading>
          {userRewards.map(rewardContract => (
            <RewardsStatsCard
              key={`${rewardContract.name}${rewardContract.contractAddress}`}
              rewardContract={rewardContract}
              onClick={() => handleRewardContractClick(rewardContract)}
              isConnectedAndEnabled={isConnectedAndEnabled}
              onExternalLinkClicked={onExternalLinkClicked}
            />
          ))}
        </motion.div>
      )}
      {allRewards.length > 0 && (
        <motion.div className="space-y-3" variants={positionAnimations}>
          <Heading tag="h3" variant="medium">
            <Trans>All rewards</Trans>
          </Heading>
          {allRewards.map(rewardContract => (
            <RewardsStatsCard
              key={`${rewardContract.name}${rewardContract.contractAddress}`}
              rewardContract={rewardContract}
              onClick={() => handleRewardContractClick(rewardContract)}
              isConnectedAndEnabled={isConnectedAndEnabled}
              onExternalLinkClicked={onExternalLinkClicked}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};
