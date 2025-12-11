import { useLingui } from '@lingui/react';
import { Text } from '@widgets/shared/components/ui/Typography';
import { HStack } from '@widgets/shared/components/ui/layout/HStack';
import { StUsdsProviderType, StUsdsSelectionReason, StUsdsBlockedReason } from '@jetstreamgg/sky-hooks';
import { CurveLogo } from '@widgets/shared/components/icons/CurveLogo';
import { getProviderMessage, StUSDSFlow } from '../lib/constants';

export type ProviderIndicatorProps = {
  selectedProvider: StUsdsProviderType;
  selectionReason: StUsdsSelectionReason;
  rateDifferencePercent: number;
  flow: StUSDSFlow;
  isLoading?: boolean;
  /** Specific reason why native is blocked */
  nativeBlockedReason?: StUsdsBlockedReason;
};

/**
 * Shows which liquidity provider is being used for the transaction.
 * Only displays when Curve is selected (native is the default).
 */
export function ProviderIndicator({
  selectedProvider,
  selectionReason,
  rateDifferencePercent,
  flow,
  isLoading = false,
  nativeBlockedReason
}: ProviderIndicatorProps) {
  const { i18n } = useLingui();

  // Don't show indicator when using native with default reason
  if (
    selectedProvider === StUsdsProviderType.NATIVE &&
    selectionReason === StUsdsSelectionReason.NATIVE_DEFAULT
  ) {
    return null;
  }

  // Don't show while loading
  if (isLoading) {
    return null;
  }

  const isCurve = selectedProvider === StUsdsProviderType.CURVE;

  const message = getProviderMessage(selectionReason, rateDifferencePercent, flow, nativeBlockedReason, i18n);

  const isWarning = selectionReason === StUsdsSelectionReason.ALL_BLOCKED;
  const isInfo =
    selectionReason === StUsdsSelectionReason.CURVE_ONLY_AVAILABLE ||
    selectionReason === StUsdsSelectionReason.CURVE_BETTER_RATE;

  return (
    <HStack
      className={`w-full items-start justify-center rounded-lg px-3 py-2 ${
        isWarning ? 'bg-error/10' : isInfo ? 'bg-accent/10' : 'bg-surface'
      }`}
      gap={2}
    >
      {isCurve && !isWarning && <CurveLogo className="text-textSecondary mt-[3px] h-4 w-4" />}
      {isWarning && (
        <svg
          className="text-error h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
            fill="currentColor"
          />
        </svg>
      )}
      <Text variant="small" className={isWarning ? 'text-error' : 'text-textSecondary'}>
        {message}
      </Text>
    </HStack>
  );
}
