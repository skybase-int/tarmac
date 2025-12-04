import { describe, expect, it } from 'vitest';
import {
  calculateEffectiveRate,
  calculateRateDifferencePercent,
  isRateDifferenceSignificant,
  calculateMinOutputWithSlippage,
  compareRates,
  applyBuffer
} from './rateComparison';
import { StUsdsProviderType, StUsdsQuote } from './types';
import { RATE_PRECISION, STUSDS_PROVIDER_CONFIG } from './constants';

// Helper to create a mock quote
const createMockQuote = (
  provider: StUsdsProviderType,
  inputAmount: bigint,
  outputAmount: bigint,
  isValid = true
): StUsdsQuote => ({
  providerType: provider,
  inputAmount,
  outputAmount,
  rateInfo: {
    outputAmount,
    effectiveRate: inputAmount > 0n ? (outputAmount * RATE_PRECISION.WAD) / inputAmount : 0n,
    feeAmount: 0n,
    estimatedSlippageBps: 0,
    priceImpactBps: 0
  },
  isValid,
  invalidReason: isValid ? undefined : 'Test invalid reason'
});

describe('Rate Comparison Utilities', () => {
  describe('calculateEffectiveRate', () => {
    it('should calculate rate correctly for equal amounts', () => {
      const input = 1000n * RATE_PRECISION.WAD;
      const output = 1000n * RATE_PRECISION.WAD;

      const rate = calculateEffectiveRate(input, output);

      // 1:1 rate should be exactly WAD (1e18)
      expect(rate).toBe(RATE_PRECISION.WAD);
    });

    it('should calculate rate correctly when output > input', () => {
      const input = 1000n * RATE_PRECISION.WAD;
      const output = 1010n * RATE_PRECISION.WAD; // 1% more

      const rate = calculateEffectiveRate(input, output);

      // Rate should be 1.01 * WAD
      expect(rate).toBe((101n * RATE_PRECISION.WAD) / 100n);
    });

    it('should calculate rate correctly when output < input', () => {
      const input = 1000n * RATE_PRECISION.WAD;
      const output = 990n * RATE_PRECISION.WAD; // 1% less

      const rate = calculateEffectiveRate(input, output);

      // Rate should be 0.99 * WAD
      expect(rate).toBe((99n * RATE_PRECISION.WAD) / 100n);
    });

    it('should return 0 for zero input', () => {
      const rate = calculateEffectiveRate(0n, 1000n * RATE_PRECISION.WAD);
      expect(rate).toBe(0n);
    });

    it('should return 0 for zero output', () => {
      const rate = calculateEffectiveRate(1000n * RATE_PRECISION.WAD, 0n);
      expect(rate).toBe(0n);
    });

    it('should handle very small amounts', () => {
      const input = 1n;
      const output = 1n;

      const rate = calculateEffectiveRate(input, output);

      expect(rate).toBe(RATE_PRECISION.WAD);
    });

    it('should handle very large amounts', () => {
      const input = 10n ** 30n; // 1 trillion tokens with 18 decimals
      const output = 10n ** 30n;

      const rate = calculateEffectiveRate(input, output);

      expect(rate).toBe(RATE_PRECISION.WAD);
    });
  });

  describe('calculateRateDifferencePercent', () => {
    const WAD = RATE_PRECISION.WAD;

    it('should return 0 for equal rates', () => {
      const diff = calculateRateDifferencePercent(WAD, WAD);
      expect(diff).toBe(0);
    });

    it('should return positive percent when rateA > rateB', () => {
      const rateA = (101n * WAD) / 100n; // 1.01
      const rateB = WAD; // 1.00

      const diff = calculateRateDifferencePercent(rateA, rateB);

      expect(diff).toBe(1); // 1% difference
    });

    it('should return negative percent when rateA < rateB', () => {
      const rateA = (99n * WAD) / 100n; // 0.99
      const rateB = WAD; // 1.00

      const diff = calculateRateDifferencePercent(rateA, rateB);

      expect(diff).toBe(-1); // -1% difference
    });

    it('should handle small differences (basis points)', () => {
      const rateA = (10001n * WAD) / 10000n; // 1.0001 (1 bps higher)
      const rateB = WAD;

      const diff = calculateRateDifferencePercent(rateA, rateB);

      expect(diff).toBeCloseTo(0.01, 2); // 0.01% = 1 bps
    });

    it('should return 100 when rateB is zero and rateA is positive', () => {
      const diff = calculateRateDifferencePercent(WAD, 0n);
      expect(diff).toBe(100);
    });

    it('should return 0 when both rates are zero', () => {
      const diff = calculateRateDifferencePercent(0n, 0n);
      expect(diff).toBe(0);
    });
  });

  describe('isRateDifferenceSignificant', () => {
    it('should return false when difference is below threshold', () => {
      // 0.05% difference, 10 bps (0.1%) threshold
      expect(isRateDifferenceSignificant(0.05, 10)).toBe(false);
    });

    it('should return true when difference equals threshold', () => {
      // 0.1% difference, 10 bps (0.1%) threshold
      expect(isRateDifferenceSignificant(0.1, 10)).toBe(true);
    });

    it('should return true when difference exceeds threshold', () => {
      // 0.2% difference, 10 bps (0.1%) threshold
      expect(isRateDifferenceSignificant(0.2, 10)).toBe(true);
    });

    it('should work with negative differences (absolute value)', () => {
      // -0.2% difference, 10 bps threshold
      expect(isRateDifferenceSignificant(-0.2, 10)).toBe(true);
    });

    it('should return false for zero difference', () => {
      expect(isRateDifferenceSignificant(0, 10)).toBe(false);
    });
  });

  describe('calculateMinOutputWithSlippage', () => {
    it('should reduce output by slippage percentage', () => {
      const output = 1000n * RATE_PRECISION.WAD;
      const slippageBps = 50; // 0.5%

      const minOutput = calculateMinOutputWithSlippage(output, slippageBps);

      // Expected: 1000 * (1 - 0.005) = 995
      expect(minOutput).toBe((9950n * RATE_PRECISION.WAD) / 10n);
    });

    it('should handle zero slippage', () => {
      const output = 1000n * RATE_PRECISION.WAD;

      const minOutput = calculateMinOutputWithSlippage(output, 0);

      expect(minOutput).toBe(output);
    });

    it('should handle 100% slippage (extreme case)', () => {
      const output = 1000n * RATE_PRECISION.WAD;

      const minOutput = calculateMinOutputWithSlippage(output, 10000);

      expect(minOutput).toBe(0n);
    });

    it('should handle small amounts', () => {
      const output = 100n; // Very small amount
      const slippageBps = 50;

      const minOutput = calculateMinOutputWithSlippage(output, slippageBps);

      // Should not underflow
      expect(minOutput).toBeLessThan(output);
      expect(minOutput).toBeGreaterThanOrEqual(0n);
    });
  });

  describe('applyBuffer', () => {
    it('should reduce amount by buffer percentage', () => {
      const amount = 1000n * RATE_PRECISION.WAD;
      const bufferBps = 5; // 0.05%

      const buffered = applyBuffer(amount, bufferBps);

      // Expected: 1000 * (1 - 0.0005) = 999.5
      expect(buffered).toBe((9995n * RATE_PRECISION.WAD) / 10n);
    });

    it('should handle zero buffer', () => {
      const amount = 1000n * RATE_PRECISION.WAD;

      const buffered = applyBuffer(amount, 0);

      expect(buffered).toBe(amount);
    });
  });

  describe('compareRates', () => {
    const config = STUSDS_PROVIDER_CONFIG;
    const WAD = RATE_PRECISION.WAD;

    it('should return null provider when both quotes are invalid', () => {
      const nativeQuote = createMockQuote(StUsdsProviderType.NATIVE, WAD, WAD, false);
      const curveQuote = createMockQuote(StUsdsProviderType.CURVE, WAD, WAD, false);

      const result = compareRates(nativeQuote, curveQuote, config);

      expect(result.betterProvider).toBeNull();
      expect(result.differencePercent).toBe(0);
      expect(result.isSignificantDifference).toBe(false);
    });

    it('should return null provider when both quotes are undefined', () => {
      const result = compareRates(undefined, undefined, config);

      expect(result.betterProvider).toBeNull();
      expect(result.differencePercent).toBe(0);
      expect(result.isSignificantDifference).toBe(false);
    });

    it('should select Curve when native quote is invalid', () => {
      const nativeQuote = createMockQuote(StUsdsProviderType.NATIVE, WAD, WAD, false);
      const curveQuote = createMockQuote(StUsdsProviderType.CURVE, WAD, WAD, true);

      const result = compareRates(nativeQuote, curveQuote, config);

      expect(result.betterProvider).toBe(StUsdsProviderType.CURVE);
      expect(result.differencePercent).toBe(100);
      expect(result.isSignificantDifference).toBe(true);
    });

    it('should select native when Curve quote is invalid', () => {
      const nativeQuote = createMockQuote(StUsdsProviderType.NATIVE, WAD, WAD, true);
      const curveQuote = createMockQuote(StUsdsProviderType.CURVE, WAD, WAD, false);

      const result = compareRates(nativeQuote, curveQuote, config);

      expect(result.betterProvider).toBe(StUsdsProviderType.NATIVE);
      expect(result.differencePercent).toBe(-100);
      expect(result.isSignificantDifference).toBe(true);
    });

    it('should select Curve when native is undefined', () => {
      const curveQuote = createMockQuote(StUsdsProviderType.CURVE, WAD, WAD, true);

      const result = compareRates(undefined, curveQuote, config);

      expect(result.betterProvider).toBe(StUsdsProviderType.CURVE);
      expect(result.isSignificantDifference).toBe(true);
    });

    it('should select native when Curve is undefined', () => {
      const nativeQuote = createMockQuote(StUsdsProviderType.NATIVE, WAD, WAD, true);

      const result = compareRates(nativeQuote, undefined, config);

      expect(result.betterProvider).toBe(StUsdsProviderType.NATIVE);
      expect(result.isSignificantDifference).toBe(true);
    });

    it('should return null provider when rates are equal', () => {
      const amount = 1000n * WAD;
      const nativeQuote = createMockQuote(StUsdsProviderType.NATIVE, amount, amount, true);
      const curveQuote = createMockQuote(StUsdsProviderType.CURVE, amount, amount, true);

      const result = compareRates(nativeQuote, curveQuote, config);

      expect(result.betterProvider).toBeNull();
      expect(result.differencePercent).toBe(0);
      expect(result.isSignificantDifference).toBe(false);
    });

    it('should return null provider when difference is below threshold', () => {
      const input = 10000n * WAD;
      // Curve gives 0.05% better rate (below 0.1% threshold)
      const nativeOutput = 10000n * WAD;
      const curveOutput = 10005n * WAD;

      const nativeQuote = createMockQuote(StUsdsProviderType.NATIVE, input, nativeOutput, true);
      const curveQuote = createMockQuote(StUsdsProviderType.CURVE, input, curveOutput, true);

      const result = compareRates(nativeQuote, curveQuote, config);

      expect(result.betterProvider).toBeNull();
      expect(result.differencePercent).toBeCloseTo(0.05, 2);
      expect(result.isSignificantDifference).toBe(false);
    });

    it('should select Curve when Curve rate exceeds threshold', () => {
      const input = 10000n * WAD;
      // Curve gives 0.2% better rate (above 0.1% threshold)
      const nativeOutput = 10000n * WAD;
      const curveOutput = 10020n * WAD;

      const nativeQuote = createMockQuote(StUsdsProviderType.NATIVE, input, nativeOutput, true);
      const curveQuote = createMockQuote(StUsdsProviderType.CURVE, input, curveOutput, true);

      const result = compareRates(nativeQuote, curveQuote, config);

      expect(result.betterProvider).toBe(StUsdsProviderType.CURVE);
      expect(result.differencePercent).toBeCloseTo(0.2, 2);
      expect(result.isSignificantDifference).toBe(true);
    });

    it('should select native when native rate exceeds threshold', () => {
      const input = 10000n * WAD;
      // Native gives 0.2% better rate
      const nativeOutput = 10020n * WAD;
      const curveOutput = 10000n * WAD;

      const nativeQuote = createMockQuote(StUsdsProviderType.NATIVE, input, nativeOutput, true);
      const curveQuote = createMockQuote(StUsdsProviderType.CURVE, input, curveOutput, true);

      const result = compareRates(nativeQuote, curveQuote, config);

      expect(result.betterProvider).toBe(StUsdsProviderType.NATIVE);
      expect(result.differencePercent).toBeCloseTo(-0.2, 1); // Use less strict precision
      expect(result.isSignificantDifference).toBe(true);
    });

    it('should handle exactly at threshold (boundary condition)', () => {
      const input = 10000n * WAD;
      // Exactly 0.1% (10 bps) difference - should be significant
      const nativeOutput = 10000n * WAD;
      const curveOutput = 10010n * WAD;

      const nativeQuote = createMockQuote(StUsdsProviderType.NATIVE, input, nativeOutput, true);
      const curveQuote = createMockQuote(StUsdsProviderType.CURVE, input, curveOutput, true);

      const result = compareRates(nativeQuote, curveQuote, config);

      expect(result.differencePercent).toBeCloseTo(0.1, 2);
      expect(result.isSignificantDifference).toBe(true);
      expect(result.betterProvider).toBe(StUsdsProviderType.CURVE);
    });
  });
});
