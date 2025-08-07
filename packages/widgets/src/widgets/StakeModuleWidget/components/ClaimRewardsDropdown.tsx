import { Button } from '@widgets/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@widgets/components/ui/popover';
import { WidgetContext } from '@widgets/context/WidgetContext';
import { Text } from '@widgets/shared/components/ui/Typography';
import { useRewardContractTokens, useRewardsRewardsBalance } from '@jetstreamgg/sky-hooks';
import { formatBigInt } from '@jetstreamgg/sky-utils';
import { useContext, useEffect, useState } from 'react';
import { useChainId } from 'wagmi';
import { TxStatus } from '@widgets/shared/constants';
import { WidgetState } from '@widgets/shared/types/widgetState';
import { StakeAction, StakeScreen } from '../lib/constants';
import { StakeModuleWidgetContext } from '../context/context';
import { ChevronDown } from 'lucide-react';
import { cn } from '@widgets/lib/utils';
import { VStack } from '@widgets/shared/components/ui/layout/VStack';
import { ClaimRewardOption } from './ClaimRewardOption';

export function ClaimRewardsDropdown({
  stakeRewardContracts,
  urnAddress,
  index,
  claimPrepared,
  claimExecute
}: {
  stakeRewardContracts: {
    contractAddress: `0x${string}`;
  }[];
  urnAddress: `0x${string}`;
  index: bigint;
  claimPrepared: boolean;
  claimExecute: () => void;
}) {
  const { setTxStatus, setExternalLink, setShowStepIndicator, setWidgetState } = useContext(WidgetContext);
  const { indexToClaim, setIndexToClaim, rewardContractToClaim, setRewardContractToClaim } =
    useContext(StakeModuleWidgetContext);

  const chainId = useChainId();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState<`0x${string}`>(
    stakeRewardContracts[0].contractAddress
  );

  // Fetch data only for the selected contract
  const { data: selectedRewardsBalance } = useRewardsRewardsBalance({
    contractAddress: selectedContract,
    address: urnAddress,
    chainId
  });

  const { data: selectedRewardTokens } = useRewardContractTokens(selectedContract);

  const handleClaimClick = () => {
    if (selectedContract) {
      setIndexToClaim(index);
      setRewardContractToClaim(selectedContract);
    }
  };

  const handleOptionSelect = (option: `0x${string}`) => {
    setSelectedContract(option);
    setIsOpen(false);
  };

  useEffect(() => {
    if (
      indexToClaim === index &&
      selectedContract &&
      rewardContractToClaim === selectedContract &&
      claimPrepared
    ) {
      setShowStepIndicator(false);
      setWidgetState((prev: WidgetState) => ({
        ...prev,
        action: StakeAction.CLAIM,
        screen: StakeScreen.TRANSACTION
      }));
      setTxStatus(TxStatus.INITIALIZED);
      setExternalLink(undefined);
      claimExecute();
    }
  }, [indexToClaim, index, rewardContractToClaim, selectedContract, claimPrepared]);

  if (!stakeRewardContracts || stakeRewardContracts.length === 0) return null;

  // Multiple options - show split button
  const isProcessing =
    indexToClaim === index && selectedContract && rewardContractToClaim === selectedContract;
  const isDisabled = !!rewardContractToClaim && indexToClaim !== undefined;

  return (
    <div className="relative flex">
      <Button
        variant="secondary"
        onClick={handleClaimClick}
        disabled={isDisabled}
        className="flex-1 rounded-r-none border-r-0"
      >
        <Text>
          {isProcessing
            ? 'Preparing your claim transaction...'
            : selectedRewardsBalance && selectedRewardTokens
              ? `Claim ${formatBigInt(selectedRewardsBalance)} ${selectedRewardTokens.rewardsToken.symbol}`
              : 'Select reward to claim'}
        </Text>
      </Button>

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
            {stakeRewardContracts.map(({ contractAddress }) => (
              <ClaimRewardOption
                key={contractAddress}
                contractAddress={contractAddress}
                urnAddress={urnAddress}
                isSelected={selectedContract === contractAddress}
                onSelect={handleOptionSelect}
              />
            ))}
          </VStack>
        </PopoverContent>
      </Popover>
    </div>
  );
}
