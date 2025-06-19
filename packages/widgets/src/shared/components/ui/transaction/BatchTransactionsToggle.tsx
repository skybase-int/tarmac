import { Toggle } from '@widgets/components/ui/toggle';
import { Zap } from '../../icons/Icons';

export function BatchTransactionsToggle({
  batchEnabled,
  setBatchEnabled
}: {
  batchEnabled: boolean;
  setBatchEnabled: (enabled: boolean) => void;
}) {
  const handleToggle = (checked: boolean) => {
    setBatchEnabled(checked);
  };

  return (
    <Toggle
      variant="singleSwitcher"
      className="hidden h-10 w-10 rounded-xl md:flex"
      pressed={batchEnabled}
      onPressedChange={handleToggle}
      aria-label="Toggle details"
    >
      <Zap width={24} height={24} background={false} />
    </Toggle>
  );
}
