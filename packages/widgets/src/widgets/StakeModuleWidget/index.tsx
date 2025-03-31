import { ErrorBoundary } from '@widgets/shared/components/ErrorBoundary';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { WidgetContext, WidgetProvider } from '@widgets/context/WidgetContext';
import { WidgetProps, WidgetState } from '@widgets/shared/types/widgetState';
import { WidgetContainer } from '@widgets/shared/components/ui/widget/WidgetContainer';
import { Heading } from '@widgets/shared/components/ui/Typography';
import { t } from '@lingui/core/macro';
import { Trans } from '@lingui/react/macro';
import { WidgetButtons } from '@widgets/shared/components/ui/widget/WidgetButtons';
import { CardAnimationWrapper } from '@widgets/shared/animation/Wrappers';
import { AnimatePresence, motion } from 'framer-motion';
import { TxStatus } from '@widgets/shared/constants';
import { VStack } from '@widgets/shared/components/ui/layout/VStack';
import { positionAnimations } from '@widgets/shared/animation/presets';
import { MotionVStack } from '@widgets/shared/components/ui/layout/MotionVStack';
import { useAccount, useChainId } from 'wagmi';
import { getStepTitle, StakeAction, StakeFlow, StakeScreen, StakeStep } from './lib/constants';
import { getNextStep, getPreviousStep, getStepIndex, getTotalSteps } from './lib/utils';
import { StepperBar } from './components/StepperBar';
import { UrnsList } from './components/UrnsList';
import { OpenNewUrn } from './components/OpenNewUrn';
import { SelectRewardContract } from './components/SelectRewardContract';
import { StakeModuleWidgetContext, StakeModuleWidgetProvider } from './context/context';
import { SelectDelegate } from './components/SelectDelegate';
import { PositionSummary } from './components/PositionSummary';
import {
  useCurrentUrnIndex,
  useSaNgtAllowance,
  useSaNstAllowance as useSealUsdsAllowance,
  useSaNgtApprove,
  useSaNstApprove as useSealUsdsApprove,
  useSaMulticall,
  useClaimRewards,
  useUrnAddress,
  useVault,
  ZERO_ADDRESS,
  useUrnSelectedRewardContract,
  useUrnSelectedVoteDelegate
} from '@jetstreamgg/hooks';
import { formatBigInt, getEtherscanLink, useDebounce } from '@jetstreamgg/utils';
import { useNotifyWidgetState } from '@widgets/shared/hooks/useNotifyWidgetState';
import { StakeModuleTransactionStatus } from './components/StakeModuleTransactionStatus';
import { Button } from '@widgets/components/ui/button';
import { HStack } from '@widgets/shared/components/ui/layout/HStack';
import { ArrowLeft } from 'lucide-react';
import { getValidatedState } from '@widgets/lib/utils';
import { UnconnectedState } from './components/UnconnectedState';
import { useLingui } from '@lingui/react';

export type OnStakeUrnChange = (
  urn: { urnAddress: `0x${string}` | undefined; urnIndex: bigint | undefined } | undefined
) => void;

type StakeModuleWidgetProps = WidgetProps & {
  onStakeUrnChange?: OnStakeUrnChange;
  onExternalLinkClicked?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  addRecentTransaction: any;
};

export const StakeModuleWidget = ({
  locale,
  rightHeaderComponent,
  onStakeUrnChange,
  externalWidgetState,
  onConnect,
  onNotification,
  onWidgetStateChange,
  onExternalLinkClicked,
  addRecentTransaction,
  referralCode
}: StakeModuleWidgetProps) => {
  return (
    <ErrorBoundary componentName="StakeModuleWidget">
      <WidgetProvider locale={locale}>
        <StakeModuleWidgetProvider>
          <StakeModuleWidgetWrapped
            rightHeaderComponent={rightHeaderComponent}
            onStakeUrnChange={onStakeUrnChange}
            externalWidgetState={externalWidgetState}
            onConnect={onConnect}
            onNotification={onNotification}
            onWidgetStateChange={onWidgetStateChange}
            onExternalLinkClicked={onExternalLinkClicked}
            addRecentTransaction={addRecentTransaction}
            referralCode={referralCode}
          />
        </StakeModuleWidgetProvider>
      </WidgetProvider>
    </ErrorBoundary>
  );
};

function StakeModuleWidgetWrapped({
  rightHeaderComponent,
  onStakeUrnChange,
  externalWidgetState,
  onConnect,
  enabled = true,
  onNotification,
  onWidgetStateChange,
  onExternalLinkClicked,
  addRecentTransaction,
  referralCode
}: StakeModuleWidgetProps) {
  const validatedExternalState = getValidatedState(externalWidgetState);
  const initialTabIndex = validatedExternalState?.tab === 'right' ? 1 : 0;
  const [tabIndex, setTabIndex] = useState<0 | 1>(initialTabIndex);
  const tabSide = tabIndex === 0 ? 'left' : 'right';
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    txStatus,
    widgetState,
    setWidgetState,
    setIsLoading,
    setButtonText,
    setIsDisabled,
    setTxStatus,
    setExternalLink,
    setShowStepIndicator
  } = useContext(WidgetContext);
  const { i18n } = useLingui();
  const chainId = useChainId();
  const { isConnected, isConnecting, address } = useAccount();
  const isConnectedAndEnabled = useMemo(() => isConnected && enabled, [isConnected, enabled]);
  const {
    isLockCompleted,
    isSelectRewardContractCompleted,
    isSelectDelegateCompleted,
    isBorrowCompleted,
    calldata,
    setCalldata,
    skyToLock,
    usdsToWipe,
    generateAllCalldata,
    currentStep,
    setCurrentStep,
    setActiveUrn,
    setSkyToLock,
    setUsdsToBorrow,
    setSelectedDelegate,
    setSelectedRewardContract,
    setSkyToFree,
    setUsdsToWipe,
    activeUrn,
    indexToClaim,
    setIndexToClaim,
    rewardContractToClaim,
    setRewardContractToClaim,
    wipeAll
  } = useContext(StakeModuleWidgetContext);

  // Returns the urn index to use for opening a new urn
  const { data: currentUrnIndex } = useCurrentUrnIndex();

  const { data: externalParamUrnAddress } = useUrnAddress(
    externalWidgetState?.urnIndex !== undefined ? BigInt(externalWidgetState.urnIndex) : -1n
  );
  const { data: externalParamVaultData } = useVault(externalParamUrnAddress || ZERO_ADDRESS);
  const { data: externalUrnRewardContract } = useUrnSelectedRewardContract({
    urn: externalParamUrnAddress || ZERO_ADDRESS
  });
  const { data: externalUrnVoteDelegate } = useUrnSelectedVoteDelegate({
    urn: externalParamUrnAddress || ZERO_ADDRESS
  });

  const urnIndexForTransaction = activeUrn?.urnIndex ?? currentUrnIndex;

  const debouncedLockAmount = useDebounce(skyToLock);
  const WIPE_BUFFER_MULTIPLIER = 100005n;
  const WIPE_BUFFER_DIVISOR = 100000n;
  // Approve a 0.005% extra amount of USDS to give users a time margin to pay the debt
  // before the transaction fails due to insufficient approval
  const debouncedUsdsAmount = useDebounce(
    wipeAll && usdsToWipe ? (usdsToWipe * WIPE_BUFFER_MULTIPLIER) / WIPE_BUFFER_DIVISOR : usdsToWipe
  );

  const {
    data: sealNgtAllowance,
    mutate: mutateSealNgtAllowance,
    isLoading: sealLockAllowanceLoading
  } = useSaNgtAllowance();

  const {
    data: sealUsdsAllowance,
    mutate: mutateSealUsdsAllowance,
    isLoading: sealUsdsAllowanceLoading
  } = useSealUsdsAllowance();

  useNotifyWidgetState({ widgetState, txStatus, onWidgetStateChange });

  /**
   * ACTIONS ----------------------------------------------------------------------------------
   */

  const allStepsComplete =
    isLockCompleted && isBorrowCompleted && isSelectRewardContractCompleted && isSelectDelegateCompleted;

  const lockNgtApprove = useSaNgtApprove({
    amount: debouncedLockAmount,
    onStart: (hash: string) => {
      addRecentTransaction?.({
        hash,
        description: t`Approving ${formatBigInt(debouncedLockAmount)} SKY`
      });
      setExternalLink(getEtherscanLink(chainId, hash, 'tx'));
      setTxStatus(TxStatus.LOADING);
      onWidgetStateChange?.({ hash, widgetState, txStatus: TxStatus.LOADING });
    },
    onSuccess: hash => {
      onNotification?.({
        title: t`Approve successful`,
        description: t`You approved SKY`,
        status: TxStatus.SUCCESS
      });
      setTxStatus(TxStatus.SUCCESS);
      mutateSealNgtAllowance();
      multicall.retryPrepare();
      onWidgetStateChange?.({ hash, widgetState, txStatus: TxStatus.SUCCESS });
    },
    onError: (error, hash) => {
      onNotification?.({
        title: t`Approval failed`,
        description: t`We could not approve your token allowance.`,
        status: TxStatus.ERROR
      });
      setTxStatus(TxStatus.ERROR);
      mutateSealNgtAllowance();
      onWidgetStateChange?.({ hash, widgetState, txStatus: TxStatus.ERROR });
      console.log(error);
    },
    enabled: widgetState.action === StakeAction.APPROVE && sealNgtAllowance !== undefined
  });

  const repayUsdsApprove = useSealUsdsApprove({
    amount: debouncedUsdsAmount,
    onStart: (hash: string) => {
      addRecentTransaction?.({
        hash,
        description: t`Approving ${formatBigInt(debouncedUsdsAmount)} USDS`
      });
      setExternalLink(getEtherscanLink(chainId, hash, 'tx'));
      setTxStatus(TxStatus.LOADING);
      onWidgetStateChange?.({ hash, widgetState, txStatus: TxStatus.LOADING });
    },
    onSuccess: hash => {
      onNotification?.({
        title: t`Approve successful`,
        description: t`You approved USDS`,
        status: TxStatus.SUCCESS
      });
      setTxStatus(TxStatus.SUCCESS);
      mutateSealUsdsAllowance();
      multicall.retryPrepare();
      onWidgetStateChange?.({ hash, widgetState, txStatus: TxStatus.SUCCESS });
    },
    onError: (error, hash) => {
      onNotification?.({
        title: t`Approval failed`,
        description: t`We could not approve your token allowance.`,
        status: TxStatus.ERROR
      });
      setTxStatus(TxStatus.ERROR);
      mutateSealUsdsAllowance();
      onWidgetStateChange?.({ hash, widgetState, txStatus: TxStatus.ERROR });
      console.log(error);
    },
    enabled: widgetState.action === StakeAction.APPROVE && sealUsdsAllowance !== undefined
  });

  const multicall = useSaMulticall({
    calldata,
    enabled: widgetState.action === StakeAction.MULTICALL && !!allStepsComplete,
    onStart: (hash: string) => {
      addRecentTransaction?.({ hash, description: t`Doing multicall` });
      setExternalLink(getEtherscanLink(chainId, hash, 'tx'));
      setTxStatus(TxStatus.LOADING);
      onWidgetStateChange?.({ hash, widgetState, txStatus: TxStatus.LOADING });
    },
    onSuccess: hash => {
      //TODO: fix all this copy
      onNotification?.({
        title: t`Approve successful`,
        description: t`You approved ${formatBigInt(debouncedLockAmount)} SKY`, // TODO fix copy
        status: TxStatus.SUCCESS
      });
      setTxStatus(TxStatus.SUCCESS);
      mutateSealNgtAllowance();
      // TODO Mutate balances here
      onWidgetStateChange?.({ hash, widgetState, txStatus: TxStatus.SUCCESS });
    },
    onError: (error, hash) => {
      console.log('error', error, hash);
      //TODO: fix all this copy
      onNotification?.({
        title: t`Approval failed`,
        description: t`We could not approve your token allowance.`,
        status: TxStatus.ERROR
      });
      setTxStatus(TxStatus.ERROR);
      mutateSealNgtAllowance();
      onWidgetStateChange?.({ hash, widgetState, txStatus: TxStatus.ERROR });
      console.log(error);
    }
  });

  const claimRewards = useClaimRewards({
    index: indexToClaim,
    rewardContract: rewardContractToClaim,
    to: address,
    enabled: indexToClaim !== undefined && !!rewardContractToClaim && !!address,
    onStart: (hash: string) => {
      addRecentTransaction?.({
        hash,
        description: 'Claiming rewards'
      });
      setExternalLink(getEtherscanLink(chainId, hash, 'tx'));
      setTxStatus(TxStatus.LOADING);
      onWidgetStateChange?.({ hash, widgetState, txStatus: TxStatus.LOADING });
    },
    onSuccess: (hash: string) => {
      //TODO: Update copy
      onNotification?.({
        title: t`Claim successful`,
        description: t`You claimed your rewards`,
        status: TxStatus.SUCCESS
      });
      setTxStatus(TxStatus.SUCCESS);
      // TODO: `useRewardsRewardsBalance` invalidates the query after every block,
      // do we need to invalidate it again here?
      // mutateRewardsBalance();
      setIndexToClaim(undefined);
      setRewardContractToClaim(undefined);
      onWidgetStateChange?.({ hash, widgetState, txStatus: TxStatus.SUCCESS });
    },
    onError: (error: Error, hash: string) => {
      //TODO: Update copy
      onNotification?.({
        title: t`Claim failed`,
        description: t`We could not claim your rewards.`,
        status: TxStatus.ERROR
      });
      setTxStatus(TxStatus.ERROR);
      onWidgetStateChange?.({ hash, widgetState, txStatus: TxStatus.ERROR });
      console.log(error);
    }
  });

  const shouldOpenFromWidgetButton =
    currentUrnIndex && currentUrnIndex > 0n && widgetState.action === StakeAction.OVERVIEW;

  /**
   * USEEFFECTS ----------------------------------------------------------------------------------
   */

  const needsLockAllowance = !!(sealNgtAllowance === undefined || sealNgtAllowance < debouncedLockAmount);
  const needsUsdsAllowance = !!(sealUsdsAllowance === undefined || sealUsdsAllowance < debouncedUsdsAmount);

  // Generate calldata when all steps are complete
  useEffect(() => {
    if (allStepsComplete && address && urnIndexForTransaction !== undefined) {
      setCalldata(generateAllCalldata(address, urnIndexForTransaction, referralCode));
    }
  }, [allStepsComplete, address, urnIndexForTransaction, generateAllCalldata, referralCode]);

  // Update button state according to action and tx
  // Ref: https://lingui.dev/tutorials/react-patterns#memoization-pitfall
  useEffect(() => {
    if (isConnectedAndEnabled) {
      if (
        widgetState.action === StakeAction.APPROVE &&
        txStatus === TxStatus.SUCCESS &&
        !needsLockAllowance &&
        !needsUsdsAllowance
      ) {
        setButtonText(t`Continue`);
      } else if (txStatus === TxStatus.SUCCESS) {
        setButtonText(t`Manage your position(s)`);
      } else if (txStatus === TxStatus.ERROR) {
        setButtonText(t`Retry`);
      } else if (
        widgetState.action === StakeAction.APPROVE &&
        currentStep === StakeStep.SUMMARY &&
        needsLockAllowance
      ) {
        setButtonText(t`Approve stake amount`);
      } else if (
        widgetState.action === StakeAction.APPROVE &&
        currentStep === StakeStep.SUMMARY &&
        needsUsdsAllowance
      ) {
        setButtonText(t`Approve repay amount`);
      } else if (widgetState.flow === StakeFlow.OPEN && currentStep === StakeStep.SUMMARY) {
        setButtonText(t`Confirm your position`);
      } else if (widgetState.flow === StakeFlow.MANAGE && currentStep === StakeStep.SUMMARY) {
        setButtonText(t`Confirm`);
      } else if (shouldOpenFromWidgetButton) {
        setButtonText(t`Open a new position`);
      } else if ([StakeStep.REWARDS, StakeStep.DELEGATE].includes(currentStep)) {
        setButtonText(t`Confirm`);
      } else if (currentStep === StakeStep.OPEN_BORROW) {
        setButtonText(t`Confirm position`);
      } else {
        // let's set it to Next for now
        setButtonText(t`Continue`);
      }
    } else {
      setButtonText(t`Connect Wallet`);
    }
  }, [
    widgetState,
    txStatus,
    isConnectedAndEnabled,
    shouldOpenFromWidgetButton,
    currentStep,
    needsLockAllowance,
    needsUsdsAllowance
  ]);

  // Set isLoading to be consumed by WidgetButton
  useEffect(() => {
    setIsLoading(isConnecting || txStatus === TxStatus.LOADING || txStatus === TxStatus.INITIALIZED);
  }, [isConnecting, txStatus]);

  const multicallDisabled =
    [TxStatus.INITIALIZED, TxStatus.LOADING].includes(txStatus) || !multicall.prepared || multicall.isLoading;

  const approveDisabled =
    [TxStatus.INITIALIZED, TxStatus.LOADING].includes(txStatus) ||
    (needsLockAllowance && (!lockNgtApprove.prepared || lockNgtApprove.isLoading)) ||
    (needsUsdsAllowance && (!repayUsdsApprove.prepared || repayUsdsApprove.isLoading)) ||
    (!needsLockAllowance && !needsUsdsAllowance && txStatus === TxStatus.SUCCESS && !multicall.prepared); //disable next button if multicall is not prepared

  // Set widget button to be disabled depending on which action we're in
  useEffect(() => {
    // Enable the button if not connected so the user can connect their wallet
    if (!isConnectedAndEnabled) {
      setIsDisabled(false);
      return;
    }

    // Disable the button if the exit fee hasn't been accepted
    if (shouldOpenFromWidgetButton) {
      setIsDisabled(false);
      return;
    }

    if (widgetState.action === StakeAction.CLAIM) {
      setIsDisabled(false);
      return;
    }

    setIsDisabled(
      (currentStep === StakeStep.OPEN_BORROW && (!isLockCompleted || !isBorrowCompleted)) ||
        (currentStep === StakeStep.REWARDS && !isSelectRewardContractCompleted) ||
        (currentStep === StakeStep.DELEGATE && !isSelectDelegateCompleted) ||
        (currentStep === StakeStep.SUMMARY &&
          ((widgetState.action === StakeAction.APPROVE && approveDisabled) ||
            (txStatus !== TxStatus.SUCCESS &&
              widgetState.action === StakeAction.MULTICALL &&
              multicallDisabled)))
    );
  }, [
    currentStep,
    isConnectedAndEnabled,
    widgetState.flow,
    widgetState.action,
    isLockCompleted,
    isSelectRewardContractCompleted,
    isSelectDelegateCompleted,
    isBorrowCompleted,
    shouldOpenFromWidgetButton,
    multicallDisabled,
    approveDisabled,
    txStatus
  ]);

  useEffect(() => {
    //Initialize the open flow only when we are connected
    if (isConnectedAndEnabled) {
      if (currentUrnIndex === 0n) {
        // Initialize the open position flow
        setWidgetState({
          flow: StakeFlow.OPEN,
          action: StakeAction.MULTICALL, // TODO: Define if this action is ABOUT or MULTICALL based on the data
          screen: StakeScreen.ACTION
        });
      } else if (currentUrnIndex && currentUrnIndex > 0n) {
        setWidgetState({
          flow: StakeFlow.MANAGE,
          action: StakeAction.OVERVIEW,
          screen: StakeScreen.ACTION
        });
      }
    } else {
      // Reset widget state when we are not connected
      setWidgetState({
        flow: null,
        action: null,
        screen: null
      });
      setCurrentStep(StakeStep.OPEN_BORROW);
    }
  }, [currentUrnIndex, isConnectedAndEnabled]);

  // If we need allowance, set the action to approve,
  useEffect(() => {
    if (
      widgetState.screen === StakeScreen.ACTION &&
      (widgetState.flow === StakeFlow.OPEN || (widgetState.flow === StakeFlow.MANAGE && activeUrn))
    ) {
      if (tabSide === 'right') {
        setWidgetState((prev: WidgetState) => ({
          ...prev,
          action:
            debouncedUsdsAmount > 0n && needsUsdsAllowance && !sealUsdsAllowanceLoading
              ? StakeAction.APPROVE
              : StakeAction.MULTICALL
        }));
      } else {
        setWidgetState((prev: WidgetState) => ({
          ...prev,
          action:
            debouncedLockAmount > 0n && needsLockAllowance && !sealLockAllowanceLoading
              ? StakeAction.APPROVE
              : StakeAction.MULTICALL
        }));
      }
    } // else { } //For single action managements, we'll need to be more detailed here
  }, [
    debouncedUsdsAmount,
    debouncedLockAmount,
    widgetState.screen,
    widgetState.flow,
    needsUsdsAllowance,
    sealUsdsAllowanceLoading,
    needsLockAllowance,
    sealLockAllowanceLoading,
    activeUrn,
    tabSide
  ]);

  useEffect(() => {
    if (widgetState.flow === StakeFlow.OPEN) {
      // Reset the wizard state when we start a new open flow
      setActiveUrn(undefined, onStakeUrnChange ?? (() => {}));
      setSkyToLock(0n);
      setUsdsToBorrow(0n);
      setSelectedDelegate(undefined);
      setSelectedRewardContract(undefined);
    }
  }, [widgetState.flow]);

  useEffect(() => {
    // Scroll to top when the flow or step changes
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [widgetState.flow, currentStep]);

  const showStep = !!widgetState.action && widgetState.action !== StakeAction.OVERVIEW;

  useEffect(() => {
    if (
      externalWidgetState?.urnIndex !== undefined &&
      externalWidgetState.urnIndex !== null &&
      !!externalParamUrnAddress
    ) {
      // Navigate to the Urn
      if (externalParamVaultData?.collateralAmount && externalUrnRewardContract) {
        setSelectedRewardContract(externalUrnRewardContract);
      } else {
        setSelectedRewardContract(undefined);
      }
      if (externalParamVaultData?.collateralAmount && externalUrnVoteDelegate) {
        setSelectedDelegate(externalUrnVoteDelegate);
      } else {
        setSelectedDelegate(undefined);
      }
      setWidgetState((prev: WidgetState) => ({
        ...prev,
        action: StakeAction.MULTICALL
      }));
      setActiveUrn(
        { urnAddress: externalParamUrnAddress, urnIndex: BigInt(externalWidgetState.urnIndex) },
        onStakeUrnChange ?? (() => {})
      );
      setCurrentStep(StakeStep.OPEN_BORROW);
    }
  }, [externalWidgetState?.urnIndex, externalParamUrnAddress]);

  // Handle network changes
  useEffect(() => {
    // Reset widget state when network changes
    setTxStatus(TxStatus.IDLE);
    setExternalLink(undefined);

    // Reset all state variables
    setSkyToLock(0n);
    setSkyToFree(0n);
    setUsdsToWipe(0n);
    setUsdsToBorrow(0n);

    // Reset claim-related state
    setIndexToClaim(undefined);
    setRewardContractToClaim(undefined);

    // Reset to initial widget state
    if (isConnectedAndEnabled) {
      if (currentUrnIndex === 0n) {
        // Initialize the open position flow
        setWidgetState({
          flow: StakeFlow.OPEN,
          action: StakeAction.MULTICALL,
          screen: StakeScreen.ACTION
        });
      } else if (currentUrnIndex && currentUrnIndex > 0n) {
        setWidgetState({
          flow: StakeFlow.MANAGE,
          action: StakeAction.OVERVIEW,
          screen: StakeScreen.ACTION
        });
      }
    } else {
      setWidgetState({
        flow: null,
        action: null,
        screen: null
      });
    }

    // Reset to first tab
    setTabIndex(0);

    // Reset current step
    setCurrentStep(StakeStep.OPEN_BORROW);

    // Reset active URN
    setActiveUrn(undefined, onStakeUrnChange ?? (() => {}));

    // Refresh allowances
    mutateSealNgtAllowance();
    mutateSealUsdsAllowance();
  }, [chainId]);

  /**
   * BUTTON CLICKS ----------------------------------------------------------------------------------
   */

  const nextOnClick = () => {
    setTxStatus(TxStatus.IDLE);
    setCurrentStep(getNextStep(currentStep));

    // setWidgetState((prev: WidgetState) => ({
    //   ...prev,
    //   screen: SealScreen.ACTION
    // }));

    // TODO: Handle all states to determine the next action, this is only to test navigation in the wizard
  };

  const approveOnClick = () => {
    setShowStepIndicator(true);
    // Need to set action to approve to trigger the tx screen content
    setWidgetState((prev: WidgetState) => ({
      ...prev,
      screen: StakeScreen.TRANSACTION
    }));
    setTxStatus(TxStatus.INITIALIZED);
    setExternalLink(undefined);
    if (needsLockAllowance) {
      lockNgtApprove.execute();
    } else if (needsUsdsAllowance) {
      repayUsdsApprove.execute();
    }
  };

  const onClickBack = () => {
    // TODO: This may need to handle other screens, this is for testing navigation in the wizard
    // const previousStep = getPreviousStep(widgetState.action);
    if (widgetState.screen !== StakeScreen.TRANSACTION) {
      setCurrentStep(getPreviousStep(currentStep));
    } else {
      if (widgetState.action === StakeAction.CLAIM) {
        setIndexToClaim(undefined);
        setRewardContractToClaim(undefined);
      }
      setWidgetState((prev: WidgetState) => ({
        ...prev,
        action: prev.action === StakeAction.CLAIM ? StakeAction.OVERVIEW : prev.action,
        screen: StakeScreen.ACTION
      }));
    }
    setTxStatus(TxStatus.IDLE);
    // setWidgetState((prev: WidgetState) => ({
    //   ...prev,
    //   action: previousAction
    // }));
  };

  const submitOnClick = () => {
    setShowStepIndicator(true);
    setWidgetState((prev: WidgetState) => ({
      ...prev,
      action: StakeAction.MULTICALL,
      screen: StakeScreen.TRANSACTION
    }));
    setTxStatus(TxStatus.INITIALIZED);
    setExternalLink(undefined);
    multicall.execute();
  };

  const claimOnClick = () => {
    setShowStepIndicator(false);
    setWidgetState((prev: WidgetState) => ({
      ...prev,
      action: StakeAction.CLAIM,
      screen: StakeScreen.TRANSACTION
    }));
    setTxStatus(TxStatus.INITIALIZED);
    setExternalLink(undefined);
    claimRewards.execute();
  };

  const finishOnClick = () => {
    setTxStatus(TxStatus.IDLE);
    setWidgetState({
      flow: StakeFlow.MANAGE,
      action: StakeAction.OVERVIEW,
      screen: StakeScreen.ACTION
    });
    setActiveUrn(undefined, onStakeUrnChange ?? (() => {}));
    setCurrentStep(StakeStep.OPEN_BORROW);
    setSkyToLock(0n);
    setSkyToFree(0n);
    setUsdsToWipe(0n);
    setUsdsToBorrow(0n);
    setTabIndex(0);
  };

  const handleClickOpenPosition = () => {
    setWidgetState({
      flow: StakeFlow.OPEN,
      action: StakeAction.MULTICALL,
      screen: StakeScreen.ACTION
    });
    setCurrentStep(StakeStep.OPEN_BORROW);
  };

  const onClickAction = !isConnectedAndEnabled
    ? onConnect
    : currentStep === StakeStep.SUMMARY &&
        widgetState.action === StakeAction.APPROVE &&
        txStatus === TxStatus.SUCCESS &&
        !needsLockAllowance &&
        !needsUsdsAllowance
      ? submitOnClick
      : txStatus === TxStatus.SUCCESS
        ? finishOnClick
        : currentStep === StakeStep.SUMMARY && widgetState.action === StakeAction.APPROVE
          ? approveOnClick
          : currentStep === StakeStep.SUMMARY && widgetState.action === StakeAction.MULTICALL
            ? submitOnClick
            : shouldOpenFromWidgetButton
              ? handleClickOpenPosition
              : widgetState.flow === StakeFlow.MANAGE && widgetState.action === StakeAction.CLAIM
                ? claimOnClick
                : widgetState.flow === StakeFlow.OPEN || widgetState.flow === StakeFlow.MANAGE
                  ? nextOnClick
                  : undefined;

  const [stepIndex, totalSteps] = useMemo(
    () => [getStepIndex(currentStep, widgetState.flow) + 1, getTotalSteps(widgetState.flow)],
    [widgetState.flow, currentStep]
  );

  // TODO make sure to show the secondary button after approval, but before continuing to multicall
  const showSecondaryButton = useMemo(() => {
    if (txStatus === TxStatus.INITIALIZED || txStatus === TxStatus.LOADING) {
      return false;
    }

    if (txStatus === TxStatus.ERROR) {
      return true;
    }

    if (txStatus === TxStatus.SUCCESS && widgetState.action !== StakeAction.APPROVE) {
      return false;
    }

    return (
      (widgetState.flow === StakeFlow.OPEN && currentStep !== StakeStep.OPEN_BORROW) ||
      // TODO update for manage:
      (widgetState.flow === StakeFlow.MANAGE && currentStep !== StakeStep.OPEN_BORROW)
    );
  }, [widgetState.flow, widgetState.action, txStatus, currentStep]);

  const handleViewAll = () => {
    setActiveUrn(undefined, onStakeUrnChange ?? (() => {}));
    onStakeUrnChange?.(undefined);
    setWidgetState((prev: WidgetState) => ({
      ...prev,
      flow: StakeFlow.MANAGE,
      action: StakeAction.OVERVIEW
    }));
    setCurrentStep(StakeStep.OPEN_BORROW);
    setSkyToLock(0n);
    setSkyToFree(0n);
    setUsdsToWipe(0n);
    setUsdsToBorrow(0n);
    setTabIndex(0);
  };

  const widgetStateLoaded = !!widgetState.flow && !!widgetState.action;

  return (
    <WidgetContainer
      ref={containerRef}
      contentClassname="mt-2"
      header={
        !widgetStateLoaded ||
        (widgetState.flow === StakeFlow.OPEN && currentUrnIndex === 0n) ||
        (widgetState.flow === StakeFlow.MANAGE && widgetState.action === StakeAction.OVERVIEW) ||
        widgetState.screen === StakeScreen.TRANSACTION ? (
          <VStack className="w-full">
            <Heading variant="x-large">
              <Trans>Staking Engine</Trans>
            </Heading>
          </VStack>
        ) : (
          // do we want to wrap this? <CardAnimationWrapper key="widget-back-button"></CardAnimationWrapper>
          <VStack className="w-full">
            <Button variant="link" onClick={handleViewAll} className="justify-start p-0">
              <HStack className="space-x-2">
                <ArrowLeft className="self-center" />
                <Heading tag="h3" variant="small" className="text-textSecondary">
                  View all positions
                </Heading>
              </HStack>
            </Button>
          </VStack>
        )
      }
      rightHeader={rightHeaderComponent}
      footer={
        <WidgetButtons
          enabled={enabled}
          onClickAction={onClickAction}
          onClickBack={onClickBack}
          showSecondaryButton={showSecondaryButton}
          onExternalLinkClicked={onExternalLinkClicked}
        />
      }
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {!isConnectedAndEnabled && <UnconnectedState />}
        {txStatus !== TxStatus.IDLE ? (
          <CardAnimationWrapper key="widget-transaction-status">
            <StakeModuleTransactionStatus onExternalLinkClicked={onExternalLinkClicked} />
          </CardAnimationWrapper>
        ) : (
          <div>
            {showStep && (
              <motion.div className="py-6" exit={{ opacity: 0, transition: { duration: 0 } }}>
                <StepperBar
                  step={stepIndex}
                  totalSteps={totalSteps}
                  title={i18n._(getStepTitle(currentStep, tabSide))}
                />
              </motion.div>
            )}
            <CardAnimationWrapper key="widget-inputs" className="w-full">
              <VStack className="w-full">
                <MotionVStack gap={0} className="w-full" variants={positionAnimations}>
                  {widgetState.flow === StakeFlow.MANAGE && (
                    <ManagePosition
                      isConnectedAndEnabled={isConnectedAndEnabled}
                      onExternalLinkClicked={onExternalLinkClicked}
                      currentStep={currentStep}
                      currentAction={widgetState.action}
                      onClickTrigger={setTabIndex}
                      tabSide={tabSide}
                      claimPrepared={claimRewards.prepared}
                      claimExecute={claimRewards.execute}
                      onStakeUrnChange={onStakeUrnChange}
                    />
                  )}
                  {widgetState.flow === StakeFlow.OPEN && (
                    <Wizard
                      isConnectedAndEnabled={isConnectedAndEnabled}
                      onExternalLinkClicked={onExternalLinkClicked}
                      currentStep={currentStep}
                      onClickTrigger={setTabIndex}
                      tabSide={tabSide}
                    />
                  )}
                </MotionVStack>
              </VStack>
            </CardAnimationWrapper>
          </div>
        )}
      </AnimatePresence>
    </WidgetContainer>
  );
}

const Wizard = ({
  isConnectedAndEnabled,
  onExternalLinkClicked,
  currentStep,
  onClickTrigger,
  tabSide
}: {
  isConnectedAndEnabled: boolean;
  onExternalLinkClicked?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  currentStep: StakeStep;
  onClickTrigger: any;
  tabSide: 'left' | 'right';
}) => {
  return (
    <div>
      {currentStep === StakeStep.OPEN_BORROW && (
        <OpenNewUrn
          isConnectedAndEnabled={isConnectedAndEnabled}
          onClickTrigger={onClickTrigger}
          tabSide={tabSide}
        />
      )}
      {currentStep === StakeStep.REWARDS && (
        <SelectRewardContract onExternalLinkClicked={onExternalLinkClicked} />
      )}
      {currentStep === StakeStep.DELEGATE && <SelectDelegate onExternalLinkClicked={onExternalLinkClicked} />}
      {currentStep === StakeStep.SUMMARY && <PositionSummary />}
    </div>
  );
};

const ManagePosition = ({
  isConnectedAndEnabled,
  onExternalLinkClicked,
  currentStep,
  currentAction,
  onClickTrigger,
  tabSide,
  claimPrepared,
  claimExecute,
  onStakeUrnChange
}: {
  isConnectedAndEnabled: boolean;
  onExternalLinkClicked?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  currentStep: StakeStep;
  currentAction: StakeAction;
  onClickTrigger: any;
  tabSide: 'left' | 'right';
  claimPrepared: boolean;
  claimExecute: () => void;
  onStakeUrnChange?: OnStakeUrnChange;
}) => {
  return currentAction === StakeAction.OVERVIEW ? (
    <UrnsList claimPrepared={claimPrepared} claimExecute={claimExecute} onStakeUrnChange={onStakeUrnChange} />
  ) : (
    <Wizard
      isConnectedAndEnabled={isConnectedAndEnabled}
      onExternalLinkClicked={onExternalLinkClicked}
      currentStep={currentStep}
      onClickTrigger={onClickTrigger}
      tabSide={tabSide}
    />
  );
};
