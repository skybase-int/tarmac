import { RewardsBalanceCard } from './RewardsBalanceCard';
import { SavingsBalanceCard } from './SavingsBalanceCard';
import { SealBalanceCard } from './SealBalanceCard';

export interface CardProps {
  url?: string;
  onExternalLinkClicked?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  chainIds?: number[];
  hideZeroBalance?: boolean;
}

interface ModulesBalancesProps {
  rewardsCardUrl?: string;
  savingsCardUrlMap?: Record<number, string>;
  sealCardUrl?: string;
  onExternalLinkClicked?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  hideModuleBalances?: boolean;
  chainIds?: number[];
  hideZeroBalances?: boolean;
}

export const ModulesBalances = ({
  rewardsCardUrl,
  savingsCardUrlMap,
  sealCardUrl,
  onExternalLinkClicked,
  hideModuleBalances,
  chainIds,
  hideZeroBalances
}: ModulesBalancesProps): React.ReactElement => {
  return (
    <div className="flex flex-col gap-2">
      {!hideModuleBalances && (
        <RewardsBalanceCard
          url={rewardsCardUrl}
          onExternalLinkClicked={onExternalLinkClicked}
          hideZeroBalance={hideZeroBalances}
        />
      )}
      {!hideModuleBalances && (
        <SavingsBalanceCard
          urlMap={savingsCardUrlMap}
          onExternalLinkClicked={onExternalLinkClicked}
          chainIds={chainIds}
          hideZeroBalance={hideZeroBalances}
        />
      )}
      <SealBalanceCard
        url={sealCardUrl}
        onExternalLinkClicked={onExternalLinkClicked}
        hideZeroBalance={hideZeroBalances}
      />
    </div>
  );
};
