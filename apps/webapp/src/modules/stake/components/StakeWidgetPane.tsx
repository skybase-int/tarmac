import {
  TxStatus,
  WidgetStateChangeParams,
  StakeFlow,
  StakeModuleWidget,
  StakeAction
} from '@jetstreamgg/widgets';
import { IntentMapping, QueryParams, REFRESH_DELAY } from '@/lib/constants';
import { SharedProps } from '@/modules/app/types/Widgets';
import { LinkedActionSteps } from '@/modules/config/context/ConfigContext';
import { useConfigContext } from '@/modules/config/hooks/useConfigContext';
import { useSearchParams } from 'react-router-dom';
import { deleteSearchParams } from '@/modules/utils/deleteSearchParams';
import { Intent } from '@/lib/enums';
import { useEffect } from 'react';

export function StakeWidgetPane(sharedProps: SharedProps) {
  const {
    linkedActionConfig,
    updateLinkedActionConfig,
    exitLinkedActionMode,
    selectedStakeUrnIndex,
    setSelectedStakeUrnIndex
  } = useConfigContext();
  // TODO: Implement `useStakeHistory` hook
  const refreshStakeHistory = () => {};
  // const { mutate: refreshStakeHistory } = useStakeHistory(); // Corrected hook name
  const [searchParams, setSearchParams] = useSearchParams();

  const onStakeUrnChange = (urn?: {
    urnAddress: `0x${string}` | undefined;
    urnIndex: bigint | undefined;
  }) => {
    setSearchParams(params => {
      if (urn?.urnAddress && urn?.urnIndex !== undefined) {
        params.set(QueryParams.Widget, IntentMapping[Intent.STAKE_INTENT]);
        params.set(QueryParams.UrnIndex, urn.urnIndex.toString());
      } else {
        params.delete(QueryParams.UrnIndex);
      }
      return params;
    });
    setSelectedStakeUrnIndex(urn?.urnIndex !== undefined ? Number(urn.urnIndex) : undefined);
  };

  const urnIndexParam = searchParams.get(QueryParams.UrnIndex);

  // Reset detail pane urn index when widget is mounted
  useEffect(() => {
    setSelectedStakeUrnIndex(
      urnIndexParam ? (isNaN(Number(urnIndexParam)) ? undefined : Number(urnIndexParam)) : undefined
    );

    // Reset when unmounting
    return () => {
      setSelectedStakeUrnIndex(undefined);
    };
  }, [urnIndexParam]);

  const onStakeWidgetStateChange = ({
    hash,
    txStatus,
    widgetState,
    stakeTab,
    originAmount
  }: WidgetStateChangeParams) => {
    if (widgetState.flow) {
      setSearchParams(prev => {
        prev.set(QueryParams.Flow, widgetState.flow);
        return prev;
      });
    }

    if (stakeTab) {
      setSearchParams(prev => {
        prev.set(QueryParams.StakeTab, stakeTab === StakeAction.FREE ? 'free' : 'lock'); // Example mapping
        return prev;
      });
    } else if (stakeTab === '') {
      setSearchParams(prev => {
        prev.delete(QueryParams.StakeTab);
        return prev;
      });
    }

    if (originAmount && originAmount !== '0') {
      setSearchParams(prev => {
        prev.set(QueryParams.InputAmount, originAmount);
        return prev;
      });
    } else if (originAmount === '') {
      setSearchParams(prev => {
        prev.delete(QueryParams.InputAmount);
        return prev;
      });
    }

    // After a successful linked action open flow, set the final step to "success"
    if (
      widgetState.flow === StakeFlow.OPEN &&
      txStatus === TxStatus.SUCCESS &&
      linkedActionConfig.step === LinkedActionSteps.COMPLETED_CURRENT
    ) {
      updateLinkedActionConfig({ step: LinkedActionSteps.COMPLETED_SUCCESS });
    }

    // Reset the linked action state and URL params after clicking "finish"
    if (txStatus === TxStatus.IDLE && linkedActionConfig.step === LinkedActionSteps.COMPLETED_SUCCESS) {
      exitLinkedActionMode();
      setSearchParams(prevParams => {
        const params = deleteSearchParams(prevParams);
        return params;
      });
    }

    if (
      hash &&
      txStatus === TxStatus.SUCCESS &&
      [StakeFlow.OPEN, StakeFlow.MANAGE].includes(widgetState.flow)
    ) {
      setTimeout(() => {
        refreshStakeHistory();
      }, REFRESH_DELAY);
    }
  };

  const stakeTabParam = searchParams.get(QueryParams.StakeTab);
  const stakeTab =
    stakeTabParam === 'free' ? StakeAction.FREE : stakeTabParam === 'lock' ? StakeAction.LOCK : undefined;
  const flowParam = searchParams.get(QueryParams.Flow);
  const flow = flowParam === 'open' ? StakeFlow.OPEN : undefined;

  return (
    <StakeModuleWidget
      {...sharedProps}
      onStakeUrnChange={onStakeUrnChange}
      onWidgetStateChange={onStakeWidgetStateChange}
      externalWidgetState={{
        amount: linkedActionConfig?.inputAmount,
        urnIndex: selectedStakeUrnIndex,
        stakeTab,
        flow
      }}
    />
  );
}
