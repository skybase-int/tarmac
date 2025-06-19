import { useBatchToggle } from '@/modules/ui/hooks/useBatchToggle';
import { Toggle } from './ui/toggle';
import { Zap } from '@/modules/icons/Zap';

export function BatchTransactionsToggle() {
  const [batchEnabled, setBatchEnabled] = useBatchToggle();

  const handleToggle = (checked: boolean) => {
    setBatchEnabled(checked);
  };

  return (
    <Toggle
      variant="singleSwitcherBright"
      className="hidden h-10 w-10 rounded-xl p-0 md:flex"
      pressed={batchEnabled}
      onPressedChange={handleToggle}
      aria-label="Toggle details"
    >
      <Zap width={28} height={28} />
    </Toggle>
  );
}
