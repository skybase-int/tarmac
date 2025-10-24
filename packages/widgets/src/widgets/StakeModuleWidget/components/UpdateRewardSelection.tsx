import { Button } from '@widgets/components/ui/button';
import { lsSkyUsdsRewardAddress, useStakeRewardContracts } from '@jetstreamgg/sky-hooks';
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@widgets/components/ui/popover';
import { useChainId } from 'wagmi';
import { ChevronDown } from 'lucide-react';
import { StakeRewardsCardCompact } from './StakeRewardsCardCompact';
import { PopoverRateInfo } from '@widgets/shared/components/ui/PopoverRateInfo';
import { Text } from '@widgets/shared/components/ui/Typography';

export const UpdateRewardSelection = ({
  onExternalLinkClicked
}: {
  onExternalLinkClicked?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const chainId = useChainId();

  const { data: rewardContracts } = useStakeRewardContracts();
  const filteredRewardContracts = rewardContracts?.filter(
    ({ contractAddress }) =>
      contractAddress.toLowerCase() !==
      lsSkyUsdsRewardAddress[chainId as keyof typeof lsSkyUsdsRewardAddress]?.toLowerCase()
  );

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="h-6 w-6 p-0">
          <ChevronDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="bg-container w-88 rounded-xl border-0 p-2 backdrop-blur-[50px]"
        sideOffset={8}
      >
        <div className="flex flex-col gap-2">
          <div className="px-3">
            <Text className="mb-1 text-sm">Choose your reward token</Text>
            <div className="flex items-center gap-1">
              <Text className="text-textSecondary text-xs">About Staking Reward Rates</Text>
              <PopoverRateInfo
                type="srr"
                onExternalLinkClicked={onExternalLinkClicked}
                iconClassName="text-textSecondary h-3 w-3"
              />
            </div>
          </div>
          {filteredRewardContracts?.map(({ contractAddress }) => (
            <StakeRewardsCardCompact key={contractAddress} contractAddress={contractAddress} />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
