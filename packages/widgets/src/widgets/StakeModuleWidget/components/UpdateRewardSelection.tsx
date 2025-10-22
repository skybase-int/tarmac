import { Button } from '@widgets/components/ui/button';
import { Warning } from '@widgets/shared/components/icons/Warning';
import { Text } from '@widgets/shared/components/ui/Typography';
import { HStack } from '@widgets/shared/components/ui/layout/HStack';
import { VStack } from '@widgets/shared/components/ui/layout/VStack';
import { Trans } from '@lingui/react/macro';
import { lsSkyUsdsRewardAddress, useStakeRewardContracts } from '@jetstreamgg/sky-hooks';
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@widgets/components/ui/popover';
import { useChainId } from 'wagmi';
import { SaRewardsCard } from './SaRewardsCard';

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
    <VStack gap={3}>
      <HStack gap={2} className="items-center">
        <Warning boxSize={16} viewBox="0 0 16 16" className="flex-shrink-0 text-orange-400" />
        <Text className="text-textSecondary text-sm">
          <Trans>USDS rewards have been deprecated in favor of new SKY rewards</Trans>
        </Text>
      </HStack>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="secondary" className="w-full px-3">
            <Text>
              <Trans>Update Reward Selection</Trans>
            </Text>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="bg-container w-80 rounded-xl border-0 p-2 backdrop-blur-[50px]"
          align="end"
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
    </VStack>
  );
};
