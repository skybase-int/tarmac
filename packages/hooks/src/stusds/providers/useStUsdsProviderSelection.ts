import { useMemo } from 'react';
import { useNativeStUsdsProvider } from './useNativeStUsdsProvider';
import { useCurveStUsdsProvider } from './useCurveStUsdsProvider';
import { compareRates } from './rateComparison';
import { STUSDS_PROVIDER_CONFIG } from './constants';
import {
  StUsdsProviderType,
  StUsdsProviderStatus,
  StUsdsSelectionReason,
  StUsdsQuoteParams,
  StUsdsProviderSelectionResult,
  StUsdsDirection
} from './types';

/**
 * Main orchestration hook that selects the optimal provider for stUSDS operations.
 *
 * Selection logic:
 * 1. If native is blocked and Curve available → select Curve
 * 2. If Curve is blocked and native available → select native
 * 3. If both available → compare rates with threshold buffer
 * 4. If both blocked → set allProvidersBlocked: true
 *
 * @param params - Quote parameters (amount and direction)
 * @returns Selection result with recommended provider and reasoning
 */
export function useStUsdsProviderSelection(params: StUsdsQuoteParams): StUsdsProviderSelectionResult {
  const { direction } = params;

  // Get data from both providers
  const {
    data: nativeData,
    isLoading: isNativeLoading,
    error: nativeError,
    refetch: refetchNative
  } = useNativeStUsdsProvider(params);

  const {
    data: curveData,
    isLoading: isCurveLoading,
    error: curveError,
    refetch: refetchCurve
  } = useCurveStUsdsProvider(params);

  // Determine which provider to use
  const selection = useMemo(() => {
    // Default values while loading
    let selectedProvider = StUsdsProviderType.NATIVE;
    let selectionReason = StUsdsSelectionReason.NATIVE_DEFAULT;
    let allProvidersBlocked = false;
    let rateDifferencePercent = 0;

    // Check availability based on direction
    const isNativeAvailable =
      nativeData?.state.status === StUsdsProviderStatus.AVAILABLE &&
      (direction === StUsdsDirection.DEPOSIT ? nativeData.state.canDeposit : nativeData.state.canWithdraw);

    const isCurveAvailable =
      curveData?.state.status === StUsdsProviderStatus.AVAILABLE &&
      (direction === StUsdsDirection.DEPOSIT ? curveData.state.canDeposit : curveData.state.canWithdraw);

    // Selection logic
    if (!isNativeAvailable && !isCurveAvailable) {
      // Both providers blocked
      allProvidersBlocked = true;
      selectionReason = StUsdsSelectionReason.ALL_BLOCKED;
      // Default to native for display purposes
      selectedProvider = StUsdsProviderType.NATIVE;
    } else if (!isNativeAvailable && isCurveAvailable) {
      // Only Curve available
      selectedProvider = StUsdsProviderType.CURVE;
      selectionReason = StUsdsSelectionReason.CURVE_ONLY_AVAILABLE;
      // Calculate rate difference even when native is blocked
      const comparison = compareRates(nativeData?.quote, curveData?.quote, STUSDS_PROVIDER_CONFIG);
      rateDifferencePercent = comparison.differencePercent;
    } else if (isNativeAvailable && !isCurveAvailable) {
      // Only native available
      selectedProvider = StUsdsProviderType.NATIVE;
      selectionReason = StUsdsSelectionReason.NATIVE_ONLY_AVAILABLE;
    } else {
      // Both available - compare rates
      const comparison = compareRates(nativeData?.quote, curveData?.quote, STUSDS_PROVIDER_CONFIG);

      rateDifferencePercent = comparison.differencePercent;

      if (comparison.isSignificantDifference && comparison.betterProvider) {
        if (comparison.betterProvider === StUsdsProviderType.CURVE) {
          selectedProvider = StUsdsProviderType.CURVE;
          selectionReason = StUsdsSelectionReason.CURVE_BETTER_RATE;
        } else {
          selectedProvider = StUsdsProviderType.NATIVE;
          selectionReason = StUsdsSelectionReason.NATIVE_BETTER_RATE;
        }
      } else {
        // Rates are similar, prefer native
        selectedProvider = StUsdsProviderType.NATIVE;
        selectionReason = StUsdsSelectionReason.NATIVE_DEFAULT;
      }
    }

    return {
      selectedProvider,
      selectionReason,
      allProvidersBlocked,
      rateDifferencePercent
    };
  }, [nativeData, curveData, direction]);

  const isLoading = isNativeLoading || isCurveLoading;
  const error = nativeError || curveError;

  const refetch = () => {
    refetchNative();
    refetchCurve();
  };

  // Get the quote from the selected provider
  const selectedQuote =
    selection.selectedProvider === StUsdsProviderType.CURVE ? curveData?.quote : nativeData?.quote;

  return {
    selectedProvider: selection.selectedProvider,
    selectionReason: selection.selectionReason,
    selectedQuote,
    nativeProvider: nativeData,
    curveProvider: curveData,
    allProvidersBlocked: selection.allProvidersBlocked,
    rateDifferencePercent: selection.rateDifferencePercent,
    isLoading,
    error: error as Error | null,
    refetch
  };
}
