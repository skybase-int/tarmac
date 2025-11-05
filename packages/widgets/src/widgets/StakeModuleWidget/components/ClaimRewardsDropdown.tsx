import { Button } from '@widgets/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@widgets/components/ui/popover';
import { WidgetContext } from '@widgets/context/WidgetContext';
import { Text } from '@widgets/shared/components/ui/Typography';
import { useRewardContractsToClaim } from '@jetstreamgg/sky-hooks';
import { formatBigInt } from '@jetstreamgg/sky-utils';
import { useCallback, useContext, useMemo, useState } from 'react';
import { useChainId } from 'wagmi';
import { WidgetState } from '@widgets/shared/types/widgetState';
import { StakeAction, StakeStep } from '../lib/constants';
import { StakeModuleWidgetContext } from '../context/context';
import { ChevronDown } from 'lucide-react';
import { cn } from '@widgets/lib/utils';
import { VStack } from '@widgets/shared/components/ui/layout/VStack';
import { ClaimRewardsButton } from './ClaimRewardsButton';
import { OnStakeUrnChange } from '..';

export function ClaimRewardsDropdown({
  stakeRewardContracts,
  urnAddress,
  index,
  batchEnabledAndSupported,
  selectedReward,
  selectedVoteDelegate,
  onStakeUrnChange
}: {
  stakeRewardContracts: {
    contractAddress: `0x${string}`;
  }[];
  urnAddress: `0x${string}`;
  index: bigint;
  batchEnabledAndSupported: boolean;
  selectedReward: `0x${string}` | undefined;
  selectedVoteDelegate: `0x${string}` | undefined;
  onStakeUrnChange?: OnStakeUrnChange;
}) {
  const { setWidgetState } = useContext(WidgetContext);
  const {
    indexToClaim,
    rewardContractsToClaim,
    setRewardContractsToClaim,
    setActiveUrn,
    setCurrentStep,
    setSelectedRewardContract,
    setSelectedDelegate,
    setIsLockCompleted,
    setIsBorrowCompleted,
    setIsSelectRewardContractCompleted,
    setIsSelectDelegateCompleted
  } = useContext(StakeModuleWidgetContext);

  const chainId = useChainId();
  const [isOpen, setIsOpen] = useState(false);

  const { data: claimableRewardContracts } = useRewardContractsToClaim({
    rewardContractAddresses: stakeRewardContracts.map(({ contractAddress }) => contractAddress),
    userAddress: urnAddress,
    chainId
  });

  const handleSelectOption = useCallback(
    (option: `0x${string}`[] | undefined) => {
      setIsOpen(false);

      setWidgetState((prev: WidgetState) => ({
        ...prev,
        action: StakeAction.MULTICALL
      }));

      setActiveUrn({ urnAddress, urnIndex: index }, onStakeUrnChange ?? (() => {}));
      setCurrentStep(StakeStep.SUMMARY);

      setSelectedRewardContract(selectedReward);
      setSelectedDelegate(selectedVoteDelegate);
      setRewardContractsToClaim(option);

      setIsLockCompleted(true);
      setIsBorrowCompleted(true);
      setIsSelectRewardContractCompleted(true);
      setIsSelectDelegateCompleted(true);
    },
    [urnAddress, index, selectedVoteDelegate, selectedReward]
  );

  const claimableRewardContractAddresses = useMemo(
    () => claimableRewardContracts?.map(({ contractAddress }) => contractAddress),
    [claimableRewardContracts]
  );

  const isDisabled = !!rewardContractsToClaim?.length && indexToClaim !== undefined;

  if (!claimableRewardContracts || claimableRewardContracts.length === 0) return null;
  if (claimableRewardContracts.length === 1)
    return (
      <ClaimRewardsButton
        rewardContract={claimableRewardContracts[0].contractAddress}
        urnAddress={urnAddress}
        handleSelectOption={handleSelectOption}
      />
    );

  return (
    <div className="flex">
      <div className="border-textSecondary flex h-10 flex-1 items-center justify-center rounded-[12px] rounded-r-none border border-r-0 px-4 py-2">
        <Text className="text-text">Select reward to claim</Text>
      </div>

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="secondary"
            disabled={isDisabled}
            className="border-l-textSecondary rounded-l-none border-l px-3"
          >
            <ChevronDown className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')} />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="bg-container w-auto rounded-xl border-0 p-2 backdrop-blur-[50px]"
          align="end"
          sideOffset={8}
        >
          <VStack className="space-y-1">
            {claimableRewardContracts.map(({ contractAddress, claimBalance, rewardSymbol }) => (
              <Button
                key={contractAddress}
                variant={null}
                onClick={() => handleSelectOption([contractAddress])}
                className={cn(
                  'text-text flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm bg-blend-overlay transition',
                  'bg-transparent hover:bg-[#FFFFFF0D]'
                )}
              >
                <Text>{`Claim ${formatBigInt(claimBalance)} ${rewardSymbol}`}</Text>
              </Button>
            ))}
            {batchEnabledAndSupported && (
              <Button
                variant={null}
                onClick={() => handleSelectOption(claimableRewardContractAddresses)}
                className={cn(
                  'text-text flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm bg-blend-overlay transition',
                  'bg-transparent hover:bg-[#FFFFFF0D]'
                )}
              >
                <Text>Claim all rewards</Text>
              </Button>
            )}
          </VStack>
        </PopoverContent>
      </Popover>
    </div>
  );
}
