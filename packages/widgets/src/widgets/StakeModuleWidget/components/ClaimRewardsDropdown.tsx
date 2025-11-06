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
  selectedReward,
  selectedVoteDelegate,
  onStakeUrnChange
}: {
  stakeRewardContracts: {
    contractAddress: `0x${string}`;
  }[];
  urnAddress: `0x${string}`;
  index: bigint;
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
    setIsSelectDelegateCompleted,
    setRestakeSkyRewards
  } = useContext(StakeModuleWidgetContext);

  const chainId = useChainId();
  const [isOpen, setIsOpen] = useState(false);

  const { data: claimableRewardContracts } = useRewardContractsToClaim({
    rewardContractAddresses: stakeRewardContracts.map(({ contractAddress }) => contractAddress),
    userAddress: urnAddress,
    chainId
  });

  const handleSelectOption = useCallback(
    ({ contracts, restakeSky = false }: { contracts: `0x${string}`[] | undefined; restakeSky?: boolean }) => {
      setIsOpen(false);

      setWidgetState((prev: WidgetState) => ({
        ...prev,
        action: StakeAction.MULTICALL
      }));

      setActiveUrn({ urnAddress, urnIndex: index }, onStakeUrnChange ?? (() => {}));
      setCurrentStep(StakeStep.SUMMARY);

      setSelectedRewardContract(selectedReward);
      setSelectedDelegate(selectedVoteDelegate);
      setRewardContractsToClaim(contracts);
      setRestakeSkyRewards(restakeSky);

      setIsLockCompleted(true);
      setIsBorrowCompleted(true);
      setIsSelectRewardContractCompleted(true);
      setIsSelectDelegateCompleted(true);
    },
    [
      urnAddress,
      index,
      selectedVoteDelegate,
      selectedReward,
      setWidgetState,
      setActiveUrn,
      onStakeUrnChange,
      setCurrentStep,
      setSelectedRewardContract,
      setSelectedDelegate,
      setRewardContractsToClaim,
      setRestakeSkyRewards,
      setIsLockCompleted,
      setIsBorrowCompleted,
      setIsSelectRewardContractCompleted,
      setIsSelectDelegateCompleted
    ]
  );

  const sortedClaimableRewardContracts = useMemo(() => {
    if (!claimableRewardContracts) return [];

    return [...claimableRewardContracts].sort((a, b) => {
      const aIsSky = a.rewardSymbol?.toUpperCase?.() === 'SKY';
      const bIsSky = b.rewardSymbol?.toUpperCase?.() === 'SKY';

      if (aIsSky && !bIsSky) return -1;
      if (!aIsSky && bIsSky) return 1;
      return 0;
    });
  }, [claimableRewardContracts]);

  const claimableRewardContractAddresses = useMemo(
    () => sortedClaimableRewardContracts.map(({ contractAddress }) => contractAddress),
    [sortedClaimableRewardContracts]
  );

  const skyReward = useMemo(
    () => sortedClaimableRewardContracts.find(({ rewardSymbol }) => rewardSymbol?.toUpperCase?.() === 'SKY'),
    [sortedClaimableRewardContracts]
  );
  const skyContractAddress = skyReward?.contractAddress;
  const hasSkyReward = !!skyReward;
  const hasMultipleRewards = sortedClaimableRewardContracts.length > 1;
  const skySymbol = skyReward?.rewardSymbol?.toUpperCase?.() ?? 'SKY';

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
            {hasSkyReward && hasMultipleRewards && skyContractAddress && (
              <Button
                variant={null}
                onClick={() =>
                  handleSelectOption({
                    contracts: claimableRewardContractAddresses.length
                      ? claimableRewardContractAddresses
                      : undefined,
                    restakeSky: true
                  })
                }
                className={cn(
                  'text-text flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm bg-blend-overlay transition',
                  'bg-transparent hover:bg-[#FFFFFF0D]'
                )}
              >
                <Text>Claim all &amp; Restake {skySymbol}</Text>
              </Button>
            )}
            {hasSkyReward && hasMultipleRewards && skyContractAddress && (
              <Button
                variant={null}
                onClick={() =>
                  handleSelectOption({
                    contracts: [skyContractAddress],
                    restakeSky: true
                  })
                }
                className={cn(
                  'text-text flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm bg-blend-overlay transition',
                  'bg-transparent hover:bg-[#FFFFFF0D]'
                )}
              >
                <Text>
                  Claim {formatBigInt(skyReward?.claimBalance ?? 0n)} {skySymbol} &amp; Restake
                </Text>
              </Button>
            )}
            {sortedClaimableRewardContracts.map(({ contractAddress, claimBalance, rewardSymbol }) => (
              <Button
                key={contractAddress}
                variant={null}
                onClick={() => handleSelectOption({ contracts: [contractAddress] })}
                className={cn(
                  'text-text flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm bg-blend-overlay transition',
                  'bg-transparent hover:bg-[#FFFFFF0D]'
                )}
              >
                <Text>{`Claim only ${formatBigInt(claimBalance)} ${rewardSymbol}`}</Text>
              </Button>
            ))}
            <Button
              variant={null}
              onClick={() =>
                handleSelectOption({
                  contracts: claimableRewardContractAddresses.length
                    ? claimableRewardContractAddresses
                    : undefined
                })
              }
              className={cn(
                'text-text flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm bg-blend-overlay transition',
                'bg-transparent hover:bg-[#FFFFFF0D]'
              )}
            >
              <Text>Claim all rewards</Text>
            </Button>
          </VStack>
        </PopoverContent>
      </Popover>
    </div>
  );
}
