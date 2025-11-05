import { Button } from '@widgets/components/ui/button';
import { Text } from '@widgets/shared/components/ui/Typography';
import { useRewardContractTokens, useRewardsRewardsBalance } from '@jetstreamgg/sky-hooks';
import { formatBigInt } from '@jetstreamgg/sky-utils';
import { useChainId } from 'wagmi';

export function ClaimRewardsButton({
  rewardContract,
  urnAddress,
  handleSelectOption
}: {
  rewardContract: `0x${string}`;
  urnAddress: `0x${string}`;
  handleSelectOption: (option: `0x${string}`[]) => void;
}) {
  const chainId = useChainId();

  const { data: rewardsBalance } = useRewardsRewardsBalance({
    contractAddress: rewardContract,
    address: urnAddress,
    chainId
  });

  const { data: rewardContractTokens } = useRewardContractTokens(rewardContract);

  if (!rewardsBalance || !rewardContractTokens) return null;

  return (
    <Button variant="secondary" onClick={() => handleSelectOption([rewardContract])}>
      <Text>
        Claim {formatBigInt(rewardsBalance)} {rewardContractTokens.rewardsToken.symbol}
      </Text>
    </Button>
  );
}
