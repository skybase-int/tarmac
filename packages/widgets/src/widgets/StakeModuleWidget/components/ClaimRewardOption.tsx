import { useRewardContractTokens, useRewardsRewardsBalance } from '@jetstreamgg/sky-hooks';
import { formatBigInt } from '@jetstreamgg/sky-utils';
import { useChainId } from 'wagmi';
import { Text } from '@widgets/shared/components/ui/Typography';
import { cn } from '@widgets/lib/utils';
import { Button } from '@widgets/components/ui/button';

export function ClaimRewardOption({
  contractAddress,
  urnAddress,
  isSelected,
  onSelect
}: {
  contractAddress: `0x${string}`;
  urnAddress: `0x${string}`;
  isSelected: boolean;
  onSelect: (option: `0x${string}`) => void;
}) {
  const chainId = useChainId();

  const { data: rewardsBalance } = useRewardsRewardsBalance({
    contractAddress,
    address: urnAddress,
    chainId
  });

  const { data: rewardContractTokens } = useRewardContractTokens(contractAddress);

  // Don't render if no balance or no token data
  if (!rewardsBalance || !rewardContractTokens || rewardsBalance === 0n) {
    return null;
  }

  return (
    <Button
      variant={null}
      onClick={() => onSelect(contractAddress)}
      className={cn(
        'text-text flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm bg-blend-overlay transition',
        isSelected ? 'bg-surface' : 'bg-transparent hover:bg-[#FFFFFF0D]'
      )}
    >
      <Text>{`Claim ${formatBigInt(rewardsBalance)} ${rewardContractTokens.rewardsToken.symbol}`}</Text>
    </Button>
  );
}
