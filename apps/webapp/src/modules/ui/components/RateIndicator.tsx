import { Text } from '@/modules/layout/components/Typography';
import { ArrowUp } from '@/modules/icons/ArrowUp';
import { ArrowDown } from '@/modules/icons/ArrowDown';

interface RateIndicatorProps {
  rateDifference: number;
  showPercentage?: boolean;
}

/**
 * Displays a rate indicator with an arrow and optional percentage.
 * Shows green up arrow with percentage for positive differences,
 * and gray down arrow (without percentage by default) for negative differences.
 */
export function RateIndicator({ rateDifference, showPercentage = true }: RateIndicatorProps) {
  if (rateDifference === 0) return null;

  const isBetterRate = rateDifference > 0;

  return (
    <div className={`ml-2 flex items-center gap-1 ${isBetterRate ? 'text-bullish' : 'text-textSecondary'}`}>
      {isBetterRate ? (
        <>
          <ArrowUp className="h-3.5 w-3.5 fill-current" />
          {showPercentage && (
            <Text variant="small" className="text-bullish">
              +{Math.abs(rateDifference).toFixed(2)}%
            </Text>
          )}
        </>
      ) : (
        <>
          <ArrowDown className="h-3.5 w-3.5 fill-current" />
          {showPercentage && (
            <Text variant="small" className="text-textSecondary">
              {Math.abs(rateDifference).toFixed(2)}%
            </Text>
          )}
        </>
      )}
    </div>
  );
}
