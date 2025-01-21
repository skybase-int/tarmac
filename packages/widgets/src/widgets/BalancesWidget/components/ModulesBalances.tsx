import { RewardsBalanceCard } from './RewardsBalanceCard';
import { SavingsBalanceCard } from './SavingsBalanceCard';
import { SealBalanceCard } from './SealBalanceCard';
import { useChainId } from 'wagmi';
import { isBaseChainId } from '@jetstreamgg/utils';

export interface CardProps {
  onClick?: () => void;
  onExternalLinkClicked?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

interface ModulesBalancesProps {
  onClickRewardsCard?: () => void;
  onClickSavingsCard?: () => void;
  onClickSealCard?: () => void;
  onExternalLinkClicked?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  hideModuleBalances?: boolean;
}

export const ModulesBalances = ({
  onClickRewardsCard,
  onClickSavingsCard,
  onClickSealCard,
  onExternalLinkClicked,
  hideModuleBalances
}: ModulesBalancesProps): React.ReactElement => {
  const chainId = useChainId();
  const hideRewards = hideModuleBalances || isBaseChainId(chainId); //TODO: Update when base rewards are added
  const hideSeal = isBaseChainId(chainId);
  return (
    <div className="flex flex-col gap-2">
      {!hideRewards && (
        <RewardsBalanceCard onClick={onClickRewardsCard} onExternalLinkClicked={onExternalLinkClicked} />
      )}
      {!hideModuleBalances && (
        <SavingsBalanceCard onClick={onClickSavingsCard} onExternalLinkClicked={onExternalLinkClicked} />
      )}
      {!hideSeal && (
        <SealBalanceCard onClick={onClickSealCard} onExternalLinkClicked={onExternalLinkClicked} />
      )}
    </div>
  );
};
