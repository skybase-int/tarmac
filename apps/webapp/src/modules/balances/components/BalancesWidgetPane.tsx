import { WidgetStateChangeParams, SavingsFlow, BalancesWidget } from '@jetstreamgg/widgets';
import { useSearchParams } from 'react-router-dom';
import { SharedProps } from '@/modules/app/types/Widgets';
import { QueryParams } from '@/lib/constants';
import { BalancesWidgetProps } from 'node_modules/@jetstreamgg/widgets/dist/widgets/BalancesWidget';

export function BalancesWidgetPane(sharedProps: SharedProps & BalancesWidgetProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const flow = (searchParams.get(QueryParams.Flow) || undefined) as SavingsFlow | undefined;

  const onBalancesWidgetStateChange = ({ widgetState }: WidgetStateChangeParams) => {
    // Set tab search param based on widgetState.flow
    if (widgetState.flow) {
      setSearchParams(prev => {
        prev.set(QueryParams.Flow, widgetState.flow);
        return prev;
      });
    }
  };

  return (
    <BalancesWidget
      {...sharedProps}
      externalWidgetState={{
        flow
      }}
      onWidgetStateChange={onBalancesWidgetStateChange}
    />
  );
}
