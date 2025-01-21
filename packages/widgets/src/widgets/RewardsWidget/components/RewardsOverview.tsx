import { WidgetContext } from '@/context/WidgetContext';
import { RewardContract, useAvailableTokenRewardContracts } from '@jetstreamgg/hooks';
import { useContext } from 'react';
import { useChainId } from 'wagmi';
import { RewardsAction } from '@/widgets/RewardsWidget/lib/constants';
import { RewardsStatsCard } from './RewardsStatsCard';
import { motion } from 'framer-motion';
import { positionAnimations } from '@/shared/animation/presets';

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
  const rewardContracts = useAvailableTokenRewardContracts(chainId);
  const { widgetState, setWidgetState } = useContext(WidgetContext);

  const handleRewardContractClick = (rewardContract: RewardContract) => {
    onSelectRewardContract(rewardContract);
    setWidgetState({
      ...widgetState,
      action: RewardsAction.SUPPLY
    });
  };

  return (
    <div className="space-y-4">
      {/* <motion.div variants={positionAnimations}>
        <Heading tag="h3" variant="small">
          <Trans>All rewards</Trans>
        </Heading>
      </motion.div> */}
      <motion.div className="space-y-3" variants={positionAnimations}>
        {rewardContracts.map(rewardContract => (
          <RewardsStatsCard
            key={`${rewardContract.name}${rewardContract.contractAddress}`}
            rewardContract={rewardContract}
            onClick={() => handleRewardContractClick(rewardContract)}
            isConnectedAndEnabled={isConnectedAndEnabled}
            onExternalLinkClicked={onExternalLinkClicked}
          />
        ))}
      </motion.div>
    </div>
  );
};
