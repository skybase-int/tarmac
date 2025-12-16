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

export type StUsdsProviderSelectionParams = StUsdsQuoteParams & {
  /** Reference amount used for rate comparison when actual amount is 0.
   * This prevents UI flicker by allowing provider selection before user input. */
  referenceAmount?: bigint;
};

/**
 * Main orchestration hook that selects the optimal provider for stUSDS operations.
 *
 * Selection logic:
 * 1. If native is blocked and Curve available → select Curve
 * 2. If Curve is blocked and native available → select native
 * 3. If both available → compare rates with threshold buffer
 * 4. If both blocked → set allProvidersBlocked: true
 *
 * @param params - Quote parameters (amount, direction, and optional referenceAmount)
 * @returns Selection result with recommended provider and reasoning
 */
export function useStUsdsProviderSelection(
  params: StUsdsProviderSelectionParams
): StUsdsProviderSelectionResult {
  const { direction, amount, referenceAmount } = params;

  // Always use reference amount for provider selection (rate comparison)
  // This prevents UI flicker during typing since the selection stays stable
  const selectionAmount = referenceAmount ?? amount;
  const selectionParams: StUsdsQuoteParams = { amount: selectionAmount, direction };

  // Get stable provider data for selection (uses reference amount)
  const {
    data: nativeSelectionData,
    isLoading: isNativeSelectionLoading,
    error: nativeSelectionError,
    refetch: refetchNativeSelection
  } = useNativeStUsdsProvider(selectionParams);

  const {
    data: curveSelectionData,
    isLoading: isCurveSelectionLoading,
    error: curveSelectionError,
    refetch: refetchCurveSelection
  } = useCurveStUsdsProvider(selectionParams);

  // Get actual quote data for transactions (uses real amount)
  const quoteParams: StUsdsQuoteParams = { amount, direction };
  const {
    data: nativeQuoteData,
    isLoading: isNativeQuoteLoading,
    error: nativeQuoteError,
    refetch: refetchNativeQuote
  } = useNativeStUsdsProvider(quoteParams);

  const {
    data: curveQuoteData,
    isLoading: isCurveQuoteLoading,
    error: curveQuoteError,
    refetch: refetchCurveQuote
  } = useCurveStUsdsProvider(quoteParams);

  // Determine which provider to use (based on stable selection data)
  const selection = useMemo(() => {
    // Default values while loading
    let selectedProvider = StUsdsProviderType.NATIVE;
    let selectionReason = StUsdsSelectionReason.NATIVE_DEFAULT;
    let allProvidersBlocked = false;
    let rateDifferencePercent = 0;

    // Check availability based on direction (using stable selection data)
    const isNativeAvailable =
      nativeSelectionData?.state.status === StUsdsProviderStatus.AVAILABLE &&
      (direction === StUsdsDirection.SUPPLY
        ? nativeSelectionData.state.canDeposit
        : nativeSelectionData.state.canWithdraw);

    const isCurveAvailable =
      curveSelectionData?.state.status === StUsdsProviderStatus.AVAILABLE &&
      (direction === StUsdsDirection.SUPPLY
        ? curveSelectionData.state.canDeposit
        : curveSelectionData.state.canWithdraw);

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
      const comparison = compareRates(
        nativeSelectionData?.quote,
        curveSelectionData?.quote,
        STUSDS_PROVIDER_CONFIG
      );
      rateDifferencePercent = comparison.differencePercent;
    } else if (isNativeAvailable && !isCurveAvailable) {
      // Only native available
      selectedProvider = StUsdsProviderType.NATIVE;
      selectionReason = StUsdsSelectionReason.NATIVE_ONLY_AVAILABLE;
    } else {
      // Both available - compare rates (using stable selection data)
      const comparison = compareRates(
        nativeSelectionData?.quote,
        curveSelectionData?.quote,
        STUSDS_PROVIDER_CONFIG
      );

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
  }, [nativeSelectionData, curveSelectionData, direction]);

  // Loading state: selection is loading if selection data is loading
  // Quote loading is separate and doesn't affect selection stability
  const isSelectionLoading = isNativeSelectionLoading || isCurveSelectionLoading;
  const isQuoteLoading = isNativeQuoteLoading || isCurveQuoteLoading;
  const isLoading = isSelectionLoading || isQuoteLoading;

  const error = nativeSelectionError || curveSelectionError || nativeQuoteError || curveQuoteError;

  const refetch = () => {
    refetchNativeSelection();
    refetchCurveSelection();
    refetchNativeQuote();
    refetchCurveQuote();
  };

  // Get the quote from the selected provider (using actual amount quote data)
  // Only return a quote when there's an actual amount
  const selectedQuote =
    amount > 0n
      ? selection.selectedProvider === StUsdsProviderType.CURVE
        ? curveQuoteData?.quote
        : nativeQuoteData?.quote
      : undefined;

  // Return selection data state (stable) but quote data quotes (accurate for amount)
  return {
    selectedProvider: selection.selectedProvider,
    selectionReason: selection.selectionReason,
    selectedQuote,
    // Use selection data for provider state (stable), but include quote from quote data
    nativeProvider: nativeSelectionData
      ? { ...nativeSelectionData, quote: nativeQuoteData?.quote }
      : undefined,
    curveProvider: curveSelectionData ? { ...curveSelectionData, quote: curveQuoteData?.quote } : undefined,
    allProvidersBlocked: selection.allProvidersBlocked,
    rateDifferencePercent: selection.rateDifferencePercent,
    isSelectionLoading,
    isLoading,
    error: error as Error | null,
    refetch
  };
}
