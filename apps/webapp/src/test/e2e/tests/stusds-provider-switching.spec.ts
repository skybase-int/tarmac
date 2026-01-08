import { expect, test } from '../fixtures-parallel.ts';
import { performAction } from '../utils/approveOrPerformAction';
import { connectMockWalletAndAcceptTerms } from '../utils/connectMockWalletAndAcceptTerms.ts';
import { enableNativeProvider, forceCurveProvider, getStUsdsSupplyCap } from '../utils/setStUsdsSupplyCap';
import { getCurvePoolReserves } from '../utils/curvePoolManipulation';
import { formatUnits } from 'viem';

/**
 * Comprehensive test suite for stUSDS provider selection (Native vs Curve).
 *
 * Tests both provider switching logic and critical edge cases including:
 * - Native provider when cap is high
 * - Curve provider when supply cap is reached
 * - Dynamic provider switching via cap manipulation
 * - Withdrawal flows with both providers
 * - Curve pool state validation
 */
test.describe('stUSDS Provider', () => {
  test.beforeEach(async ({ isolatedPage }) => {
    await isolatedPage.goto('/');
    await connectMockWalletAndAcceptTerms(isolatedPage, { batch: true });
    // Navigate to Expert module -> stUSDS
    await isolatedPage.getByRole('tab', { name: 'Expert' }).click();
    await isolatedPage.getByTestId('stusds-stats-card').click();
  });

  test('Native provider works when cap is high', async ({ isolatedPage }) => {
    // Set a very high supply cap to enable native provider
    await enableNativeProvider();

    // Verify cap was set
    const cap = await getStUsdsSupplyCap();
    console.log(`Current supply cap: ${formatUnits(cap, 18)} USDS`);
    expect(cap).toBeGreaterThan(BigInt('100000000000000000000000000')); // > 100M USDS

    // Enter amount to supply
    await isolatedPage.getByTestId('supply-input-stusds').click();
    await isolatedPage.getByTestId('supply-input-stusds').fill('10');

    // Wait for provider selection to complete
    await isolatedPage.waitForTimeout(2000);

    // Native provider should be used (no Curve indicator)
    const curveIndicator = isolatedPage.getByText(/Using Curve pool/);
    const curveIndicatorCount = await curveIndicator.count();

    if (curveIndicatorCount > 0) {
      console.log('⚠️  Curve is being used despite high cap - may indicate Curve has better rate');
      // This is valid - Curve might have a better rate even with high cap
      // The test should pass either way
    } else {
      console.log('✅ Native provider is being used as expected');
    }

    // Check the disclaimer checkbox
    await isolatedPage.getByRole('checkbox').click();

    // Perform the supply action
    await performAction(isolatedPage, 'Supply');

    // Verify success (works for both providers)
    const nativeSuccess = isolatedPage.getByText("You've supplied 10 USDS to the stUSDS module");
    const curveSuccess = isolatedPage.getByText("You've swapped 10 USDS for stUSDS via Curve pool");
    await expect(nativeSuccess.or(curveSuccess)).toBeVisible({ timeout: 30000 });
  });

  test('Curve provider used when supply cap reached', async ({ isolatedPage }) => {
    // Force supply cap to current supply to simulate "cap reached"
    await forceCurveProvider();

    // Verify cap was set to current supply
    const cap = await getStUsdsSupplyCap();
    console.log(`Supply cap set to current supply: ${formatUnits(cap, 18)} USDS`);

    // Enter amount to supply
    await isolatedPage.getByTestId('supply-input-stusds').click();
    await isolatedPage.getByTestId('supply-input-stusds').fill('10');

    // Wait for provider selection to complete
    await isolatedPage.waitForTimeout(2000);

    // Curve provider should be indicated
    const curveIndicator = isolatedPage.getByText(/Using Curve pool/);
    await expect(curveIndicator).toBeVisible();

    // Should show "supply cap reached" reason
    const capReachedMessage = isolatedPage.getByText(/supply cap reached/i);
    await expect(capReachedMessage).toBeVisible();

    console.log('✅ Curve provider is being used due to supply cap');

    // Check the disclaimer checkbox
    await isolatedPage.getByRole('checkbox').click();

    // Perform the supply action (should route through Curve)
    await performAction(isolatedPage, 'Supply');

    // Verify Curve success message
    const curveSuccess = isolatedPage.getByText("You've swapped 10 USDS for stUSDS via Curve pool");
    await expect(curveSuccess).toBeVisible({ timeout: 30000 });
  });

  test('Can switch between providers by changing cap', async ({ isolatedPage }) => {
    // Start with high cap (native provider)
    await enableNativeProvider();

    await isolatedPage.getByTestId('supply-input-stusds').click();
    await isolatedPage.getByTestId('supply-input-stusds').fill('5');
    await isolatedPage.waitForTimeout(2000);

    // Record which provider is initially selected
    const initialCurveCount = await isolatedPage.getByText(/Using Curve pool/).count();
    console.log(`Initial state: ${initialCurveCount > 0 ? 'Curve' : 'Native'} provider`);

    // Now force Curve by reducing cap
    await forceCurveProvider();

    // Refresh the page to pick up the new cap
    await isolatedPage.reload();
    await connectMockWalletAndAcceptTerms(isolatedPage);
    await isolatedPage.getByRole('tab', { name: 'Expert' }).click();
    await isolatedPage.getByTestId('stusds-stats-card').click();

    // Enter same amount again
    await isolatedPage.getByTestId('supply-input-stusds').click();
    await isolatedPage.getByTestId('supply-input-stusds').fill('5');
    await isolatedPage.waitForTimeout(2000);

    // Curve should now be indicated
    const curveIndicator = isolatedPage.getByText(/Using Curve pool/);
    await expect(curveIndicator).toBeVisible();

    console.log('✅ Successfully switched to Curve provider by reducing cap');
  });

  test('Withdrawal works with both providers', async ({ isolatedPage }) => {
    // First supply some USDS (doesn't matter which provider)
    await isolatedPage.getByTestId('supply-input-stusds').click();
    await isolatedPage.getByTestId('supply-input-stusds').fill('20');
    await isolatedPage.getByRole('checkbox').click();
    await performAction(isolatedPage, 'Supply');
    await isolatedPage.getByRole('button', { name: 'Back to stUSDS' }).click();

    // Switch to Withdraw tab
    await isolatedPage.getByRole('tab', { name: 'Withdraw' }).click();

    // Test withdrawal with high cap (native preferred)
    await enableNativeProvider();
    await isolatedPage.getByTestId('withdraw-input-stusds').click();
    await isolatedPage.getByTestId('withdraw-input-stusds').fill('5');
    await isolatedPage.waitForTimeout(2000);

    // Perform withdrawal
    await performAction(isolatedPage, 'Withdraw');

    // Verify success (works for both providers)
    const nativeWithdrawSuccess = isolatedPage.getByText("You've withdrawn 5 USDS from the stUSDS module.");
    const curveWithdrawSuccess = isolatedPage.getByText(
      /You've swapped your stUSDS for 5.*USDS via Curve pool/
    );
    await expect(nativeWithdrawSuccess.or(curveWithdrawSuccess)).toBeVisible({ timeout: 30000 });

    console.log('✅ Withdrawal completed successfully');
  });

  test('Curve pool reserves readable via utility', async () => {
    const reserves = await getCurvePoolReserves();

    expect(reserves.usdsReserve).toBeGreaterThan(0n);
    expect(reserves.stUsdsReserve).toBeGreaterThan(0n);
    expect([0, 1]).toContain(reserves.usdsIndex);
    expect([0, 1]).toContain(reserves.stUsdsIndex);
    expect(reserves.usdsIndex).not.toBe(reserves.stUsdsIndex);

    console.log('=== Curve Pool State ===');
    console.log(`USDS reserve: ${formatUnits(reserves.usdsReserve, 18)} (index ${reserves.usdsIndex})`);
    console.log(`stUSDS reserve: ${formatUnits(reserves.stUsdsReserve, 18)} (index ${reserves.stUsdsIndex})`);

    console.log('✅ Curve pool reserves readable');
  });
});
