import {
  RewardContract,
  useAvailableTokenRewardContracts,
  useRewardsChartInfo,
  useRewardsRate,
  useRewardsPeriodFinish,
  useRewardsRewardsBalance,
  useRewardsSuppliedBalance,
  useRewardsTotalSupplied
} from '@jetstreamgg/hooks';
import { useAccount, useChainId } from 'wagmi';

const RewardsChartInfo = ({ rewardContract }: { rewardContract: RewardContract }) => {
  const rewardContractTokenAddress = rewardContract.contractAddress;

  const {
    data: rewardData,
    error: rewardError,
    isLoading: rewardIsLoading
  } = useRewardsChartInfo({ rewardContractAddress: rewardContractTokenAddress });

  if (rewardIsLoading) return <div>Loading reward chart info...</div>;
  if (rewardError) return <div>Error fetching reward chart info</div>;

  const rewardJsonString = JSON.stringify(
    rewardData,
    (key, value) => (typeof value === 'bigint' ? value.toString() : value) // convert BigInt to string
  );

  return (
    <div>
      <h3>{`useRewardsChartInfo(${rewardContractTokenAddress}) ${rewardContract.name} reward contract`}</h3>
      <pre>{rewardJsonString}</pre>
    </div>
  );
};

const RewardHooksData = ({
  rewardContract,
  chainId,
  walletAddress
}: {
  rewardContract: RewardContract;
  chainId: number;
  walletAddress: `0x${string}`;
}) => {
  const {
    data: rate,
    error: rateError,
    isLoading: rateIsLoading
  } = useRewardsRate({ chainId, contractAddress: rewardContract.contractAddress as `0x${string}` });

  const {
    data: rewardsBalance,
    error: rewardsBalanceError,
    isLoading: rewardsBalanceIsLoading
  } = useRewardsRewardsBalance({
    chainId,
    contractAddress: rewardContract.contractAddress as `0x${string}`,
    address: walletAddress
  });

  const {
    data: periodFinish,
    error: periodFinishError,
    isLoading: periodFinishIsLoading
  } = useRewardsPeriodFinish({
    chainId,
    contractAddress: rewardContract.contractAddress as `0x${string}`
  });

  const {
    data: suppliedBalance,
    error: rewardsSuppliedError,
    isLoading: rewardsSuppliedIsLoading
  } = useRewardsSuppliedBalance({
    chainId,
    contractAddress: rewardContract.contractAddress as `0x${string}`,
    address: walletAddress
  });

  const {
    data: totalSupplied,
    error: totalSuppliedError,
    isLoading: totalSuppliedIsLoading
  } = useRewardsTotalSupplied({
    chainId,
    contractAddress: rewardContract.contractAddress as `0x${string}`
  });

  if (
    rateIsLoading ||
    periodFinishIsLoading ||
    rewardsBalanceIsLoading ||
    totalSuppliedIsLoading ||
    rewardsSuppliedIsLoading
  ) {
    return <div>Loading reward hooks data...</div>;
  }

  if (rateError || periodFinishError || rewardsBalanceError || totalSuppliedError || rewardsSuppliedError) {
    return <div>Error fetching reward hooks data</div>;
  }

  return (
    <>
      <div>{rewardContract.name}</div>
      <div>Rate: {rate.formatted}</div>
      <div>Rewards Balance: {rewardsBalance?.toString()}</div>
      <div>Period Finish: {periodFinish?.toString()}</div>
      <div>Supplied Balance: {suppliedBalance?.toString()}</div>
      <div>Total Supplied: {totalSupplied?.toString()}</div>
    </>
  );
};

export const UseRewardsChartInfoData = () => {
  const chainId = useChainId();
  const rewardContracts = useAvailableTokenRewardContracts(chainId);
  const { address: walletAddress } = useAccount();
  return (
    <>
      {walletAddress &&
        rewardContracts.map(rewardContract => {
          return (
            <div key={rewardContract.name}>
              {rewardContract.name}
              <RewardsChartInfo rewardContract={rewardContract} />
              <RewardHooksData
                rewardContract={rewardContract}
                chainId={chainId}
                walletAddress={walletAddress}
              />
            </div>
          );
        })}
    </>
  );
};
