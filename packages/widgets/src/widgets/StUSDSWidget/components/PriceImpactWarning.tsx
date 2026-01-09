import { useId } from 'react';
import { Text } from '@widgets/shared/components/ui/Typography';
import { Checkbox } from '@widgets/components/ui/checkbox';
import { cn } from '@widgets/lib/utils';
import { MAX_PRICE_IMPACT_BPS_WITHOUT_WARNING } from '../lib/constants';

type PriceImpactWarningProps = {
  priceImpactBps: number | undefined;
  swapAnyway: boolean;
  onSwapAnywayChange: (checked: boolean) => void;
};

export const PriceImpactWarning = ({
  priceImpactBps,
  swapAnyway,
  onSwapAnywayChange
}: PriceImpactWarningProps) => {
  const checkboxId = useId();

  if (priceImpactBps === undefined || priceImpactBps < MAX_PRICE_IMPACT_BPS_WITHOUT_WARNING) {
    return null;
  }

  const getTextColor = () => {
    if (priceImpactBps > 3000) return 'text-error'; // > 30%
    if (priceImpactBps > 500) return 'text-amber-400'; // > 5%
    return 'text-white';
  };

  // Convert basis points to percentage and round down to nearest integer for display
  const priceImpactPercent = Math.floor(priceImpactBps / 100);

  return (
    <div className="flex items-center px-3 pt-1">
      <Checkbox id={checkboxId} checked={swapAnyway} onCheckedChange={onSwapAnywayChange} />
      <label htmlFor={checkboxId} className="ml-2">
        <Text variant="medium" className={cn(getTextColor(), 'cursor-pointer')}>
          I understand the price impact is {priceImpactPercent}% and choose to proceed anyway
        </Text>
      </label>
    </div>
  );
};
