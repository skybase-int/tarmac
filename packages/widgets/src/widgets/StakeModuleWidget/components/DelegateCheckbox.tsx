import { useId, useContext, useEffect } from 'react';
import { Checkbox } from '@widgets/components/ui/checkbox';
import { Text } from '@widgets/shared/components/ui/Typography';
import { Trans } from '@lingui/react/macro';
import { cn } from '@widgets/lib/utils';
import { useStakeUrnSelectedVoteDelegate, ZERO_ADDRESS } from '@jetstreamgg/sky-hooks';
import { StakeModuleWidgetContext } from '../context/context';
import { WidgetContext } from '@widgets/context/WidgetContext';
import { StakeFlow } from '../lib/constants';

interface DelegateCheckboxProps {
  isVisible?: boolean;
}

export const DelegateCheckbox = ({ isVisible = true }: DelegateCheckboxProps) => {
  const delegateCheckboxId = useId();
  const { activeUrn, wantsToDelegate, setWantsToDelegate } = useContext(StakeModuleWidgetContext);
  const { widgetState } = useContext(WidgetContext);

  const { data: urnSelectedVoteDelegate } = useStakeUrnSelectedVoteDelegate({
    urn: activeUrn?.urnAddress || ZERO_ADDRESS
  });

  // Determine if existing position has delegation
  const hasExistingDelegate = urnSelectedVoteDelegate && urnSelectedVoteDelegate !== ZERO_ADDRESS;

  // Update wantsToDelegate when activeUrn changes
  useEffect(() => {
    if (wantsToDelegate !== undefined) {
      return;
    }

    if (widgetState.flow === StakeFlow.OPEN) {
      setWantsToDelegate(false);
    } else if (hasExistingDelegate !== undefined) {
      setWantsToDelegate(hasExistingDelegate);
    } else {
      setWantsToDelegate(false);
    }
  }, [hasExistingDelegate, widgetState.flow, activeUrn?.urnIndex, setWantsToDelegate, wantsToDelegate]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="flex items-center px-3 pt-1">
      <Checkbox
        id={delegateCheckboxId}
        checked={wantsToDelegate}
        onCheckedChange={checked => setWantsToDelegate(checked === true)}
        disabled={!!hasExistingDelegate}
      />
      <label
        htmlFor={delegateCheckboxId}
        className={cn('ml-2', hasExistingDelegate ? 'cursor-not-allowed' : 'cursor-pointer')}
      >
        <Text variant="medium" className={cn(hasExistingDelegate ? 'text-textSecondary' : 'text-white')}>
          {hasExistingDelegate ? (
            <Trans>You are delegating voting power for this position</Trans>
          ) : (
            <Trans>Do you want to delegate voting power?</Trans>
          )}
        </Text>
      </label>
    </div>
  );
};
