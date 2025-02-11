import {
  SavingsWidget,
  L2SavingsWidget,
  TxStatus,
  SavingsAction,
  WidgetStateChangeParams,
  SavingsFlow
} from '@jetstreamgg/widgets';
import { TOKENS, useSavingsHistory } from '@jetstreamgg/hooks';
import { QueryParams, REFRESH_DELAY } from '@/lib/constants';
import { isL2ChainId } from '@jetstreamgg/utils';
import { SharedProps } from '@/modules/app/types/Widgets';
import { LinkedActionSteps } from '@/modules/config/context/ConfigContext';
import { useConfigContext } from '@/modules/config/hooks/useConfigContext';
import { useSearchParams } from 'react-router-dom';
import { deleteSearchParams } from '@/modules/utils/deleteSearchParams';
import { useSubgraphUrl } from '@/modules/app/hooks/useSubgraphUrl';
import { useChainId } from 'wagmi';

export function SavingsWidgetPane(sharedProps: SharedProps) {
  const subgraphUrl = useSubgraphUrl();
  const { linkedActionConfig, updateLinkedActionConfig, exitLinkedActionMode } = useConfigContext();
  const { mutate: refreshSavingsHistory } = useSavingsHistory(subgraphUrl);
  const [searchParams, setSearchParams] = useSearchParams();
  const chainId = useChainId();

  const isL2 = isL2ChainId(chainId);
  const isRestrictedMiCa = import.meta.env.VITE_RESTRICTED_BUILD_MICA === 'true';

  const disallowedTokens =
    isRestrictedMiCa && isL2 ? { supply: [TOKENS.usdc], withdraw: [TOKENS.usdc] } : undefined;

  const tab = (searchParams.get(QueryParams.Tab) || undefined) as 'left' | 'right' | undefined;

  const onSavingsWidgetStateChange = ({
    hash,
    txStatus,
    widgetState,
    originToken
  }: WidgetStateChangeParams) => {
    // Set tab search param based on widgetState.flow
    if (widgetState.flow) {
      setSearchParams(prevParams => {
        const params = new URLSearchParams(prevParams);
        // only set tab if it was set already
        if (params.get(QueryParams.Tab)) {
          params.set(QueryParams.Tab, widgetState.flow === SavingsFlow.SUPPLY ? 'left' : 'right');
        }
        return params;
      });
    }

    if (originToken) {
      setSearchParams(prevParams => {
        const params = new URLSearchParams(prevParams);
        if (params.get(QueryParams.SourceToken)) {
          params.set(QueryParams.SourceToken, originToken);
        }
        return params;
      });
    }

    // After a successful linked action sUPPLY, set the final step to "success"
    if (
      widgetState.action === SavingsAction.SUPPLY &&
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
      [SavingsAction.SUPPLY, SavingsAction.WITHDRAW].includes(widgetState.action)
    ) {
      setTimeout(() => {
        refreshSavingsHistory();
      }, REFRESH_DELAY);
    }
  };

  const Widget = isL2 ? L2SavingsWidget : SavingsWidget;

  return (
    <Widget
      {...sharedProps}
      onWidgetStateChange={onSavingsWidgetStateChange}
      externalWidgetState={{
        amount: linkedActionConfig?.inputAmount,
        token: isL2 ? linkedActionConfig?.sourceToken : undefined,
        tab
      }}
      disallowedTokens={disallowedTokens}
    />
  );
}
