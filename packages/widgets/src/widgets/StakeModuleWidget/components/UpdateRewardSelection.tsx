import { Button } from '@widgets/components/ui/button';
import { lsSkyUsdsRewardAddress, useStakeRewardContracts } from '@jetstreamgg/sky-hooks';
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@widgets/components/ui/popover';
import { useChainId } from 'wagmi';
import { SaRewardsCard } from './SaRewardsCard';
import { ChevronDown } from 'lucide-react';

export const UpdateRewardSelection = () => {
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
        className="bg-container w-80 rounded-xl border-0 p-2 backdrop-blur-[50px]"
        sideOffset={8}
      >
        <div className="flex flex-col gap-2">
          {filteredRewardContracts?.map(({ contractAddress }) => (
            <SaRewardsCard
              key={contractAddress}
              contractAddress={contractAddress}
              // onExternalLinkClicked={onExternalLinkClicked}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
