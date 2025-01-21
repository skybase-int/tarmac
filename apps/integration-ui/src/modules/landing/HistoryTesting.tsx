// import { DetailSection } from '@/components/DetailSection';
// import { RewardsHistory } from '@/components/historyTable/RewardsHistory';
// import { SavingsHistory } from '@/components/historyTable/SavingsHistory';
// import { UpgradeHistory } from '@/components/historyTable/UpgradeHistory';
// import { useAvailableTokenRewardContracts } from '@jetstreamgg/hooks';
// import { useChainId } from 'wagmi';
import { TradeHistory } from '@/components/historyTable/TradeHistory';

export const HistoryTesting = () => {
  // const chainId = useChainId();
  // const rewardContracts = useAvailableTokenRewardContracts(chainId);

  return (
    <div>
      <TradeHistory />
      {/* <DetailSection title="Trade History">
      </DetailSection> */}
      {/* <DetailSection title="Upgrade History">
        <UpgradeHistory />
      </DetailSection>
      <DetailSection title="Savings History">
        <SavingsHistory />
      </DetailSection>
      <DetailSection title="Rewards History">
        {rewardContracts.map(rewardContract => {
          return (
            <div className="text-text" key={rewardContract.name}>
              <RewardsHistory rewardContract={rewardContract} />
            </div>
          );
        })}
      </DetailSection> */}
    </div>
  );
};
