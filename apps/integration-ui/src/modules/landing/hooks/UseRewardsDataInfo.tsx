import { useAvailableTokenRewardContracts, useUserRewardsBalance, ZERO_ADDRESS } from '@jetstreamgg/hooks';
import { useAccount, useChainId } from 'wagmi';

const UseRewardsData = ({
  contractAddress,
  address,
  chainId
}: {
  contractAddress: `0x${string}`;
  address: `0x${string}`;
  chainId: number;
}) => {
  const {
    data: rewardsData,
    error: rewardsError,
    isLoading: rewardsIsLoading
  } = useUserRewardsBalance({
    contractAddress,
    address,
    chainId
  });

  if (rewardsIsLoading) return <div>Loading rewards data...</div>;
  if (rewardsError) return <div>Error fetching rewards data</div>;

  const rewardsJsonString = JSON.stringify(rewardsData, (key, value) => value);

  return (
    <div>
      <h3>useUserRewardsBalance</h3>

      <pre>{rewardsJsonString}</pre>
    </div>
  );
};

export const UseRewardsDataInfo = () => {
  const chainId = useChainId();
  const rewardContracts = useAvailableTokenRewardContracts(chainId);
  const { address } = useAccount();

  return (
    <div>
      {rewardContracts.map(rewardContract => {
        return (
          <div key={rewardContract.name}>
            <h4>{rewardContract.name}</h4>
            <UseRewardsData
              contractAddress={rewardContract.contractAddress as `0x${string}`}
              address={address || ZERO_ADDRESS}
              chainId={chainId}
            />
          </div>
        );
      })}
    </div>
  );
};
