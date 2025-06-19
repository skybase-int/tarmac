import { VStack } from '@/modules/layout/components/VStack';
import { useAvailableTokenRewardContracts, RewardContract } from '@jetstreamgg/sky-hooks';
import { Heading, Text } from '@/modules/layout/components/Typography';
import { useChainId } from 'wagmi';
import { LoadingErrorWrapper } from './LoadingErrorWrapper';
import { PopoverInfo } from './PopoverInfo';
import { TOKENS } from '@jetstreamgg/sky-hooks';
import { useOverallSkyData } from '@jetstreamgg/sky-hooks';
import { useRewardsRate } from '@jetstreamgg/sky-hooks';
import { formatDecimalPercentage } from '@jetstreamgg/sky-utils';

export function SavingsRate() {
  const { data, isLoading, error } = useOverallSkyData();
  const rate = formatDecimalPercentage(parseFloat(data?.skySavingsRatecRate || '0'));

  return (
    <LoadingErrorWrapper isLoading={isLoading} error={error}>
      {rate ? (
        <VStack>
          <div className="flex items-center gap-2">
            <Text variant="medium" className="text-white/80">
              With: USDS Get: USDS
            </Text>
          </div>
          <div className="flex items-center gap-2">
            <Heading className="text-[32px]"> Rate: {rate}</Heading>
            <PopoverInfo type="ssr" />
          </div>
        </VStack>
      ) : (
        <></>
      )}
    </LoadingErrorWrapper>
  );
}

export function RewardsRate({
  token,
  currentRewardContract
}: {
  token?: string;
  currentRewardContract?: RewardContract;
}) {
  const chainId = useChainId();
  const rewardContracts = useAvailableTokenRewardContracts(chainId);

  // Determine which reward contract to use
  let selectedRewardContract: RewardContract | undefined;

  if (currentRewardContract) {
    // Use the provided reward contract (from context)
    selectedRewardContract = currentRewardContract;
  } else if (token) {
    // Legacy behavior: filter by token and default to SKY
    const rewardContractsWithTokenMatch = rewardContracts.filter(
      rewardContract => rewardContract.supplyToken.name === token
    );
    selectedRewardContract = rewardContractsWithTokenMatch.filter(
      rewardContract => rewardContract.rewardToken === TOKENS.sky
    )[0];
  } else {
    // Default to SKY reward contract if no context provided
    selectedRewardContract = rewardContracts.find(
      rewardContract => rewardContract.rewardToken === TOKENS.sky
    );
  }

  console.log('selectedRewardContract', selectedRewardContract);
  // if no reward contract, don't show anything
  if (!selectedRewardContract) {
    return <></>;
  }

  // Use dynamic rate calculation instead of hardcoded API field
  const {
    data: rateData,
    isLoading,
    error
  } = useRewardsRate({
    contractAddress: selectedRewardContract.contractAddress as `0x${string}`,
    chainId
  });

  return (
    <LoadingErrorWrapper isLoading={isLoading} error={error}>
      {selectedRewardContract /*&& rateData?.formatted */ ? (
        <VStack>
          <div className="flex items-center gap-2">
            <Text variant="medium" className="text-white/80">
              {selectedRewardContract.name}
            </Text>
          </div>
          <div className="flex items-center gap-2">
            <Heading className="text-[32px]">Rate {rateData.formatted}</Heading>
            <PopoverInfo type="str" />
          </div>
        </VStack>
      ) : (
        <></>
      )}
    </LoadingErrorWrapper>
  );
}
