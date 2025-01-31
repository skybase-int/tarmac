import { RewardsBalanceCard } from './RewardsBalanceCard';
import { SavingsBalanceCard } from './SavingsBalanceCard';
import { SealBalanceCard } from './SealBalanceCard';

export interface CardProps {
  onClick?: () => void;
  onExternalLinkClicked?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  chainIds?: number[];
}

interface ModulesBalancesProps {
  onClickRewardsCard?: () => void;
  onClickSavingsCard?: () => void;
  onClickSealCard?: () => void;
  onExternalLinkClicked?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  hideModuleBalances?: boolean;
  chainIds?: number[];
}

export const ModulesBalances = ({
  onClickRewardsCard,
  onClickSavingsCard,
  onClickSealCard,
  onExternalLinkClicked,
  hideModuleBalances,
  chainIds
}: ModulesBalancesProps): React.ReactElement => {
  return (
    <div className="flex flex-col gap-2">
      {!hideModuleBalances && (
        <RewardsBalanceCard onClick={onClickRewardsCard} onExternalLinkClicked={onExternalLinkClicked} />
      )}
      {!hideModuleBalances && (
        <SavingsBalanceCard
          onClick={onClickSavingsCard}
          onExternalLinkClicked={onExternalLinkClicked}
          chainIds={chainIds}
        />
      )}
      <SealBalanceCard onClick={onClickSealCard} onExternalLinkClicked={onExternalLinkClicked} />
    </div>
  );
};
