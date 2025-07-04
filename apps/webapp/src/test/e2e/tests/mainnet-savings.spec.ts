import { expect, test } from '../fixtures.ts';
import { setErc20Balance } from '../utils/setBalance.ts';
import { sUsdsAddress, usdsAddress } from '@jetstreamgg/sky-hooks';
import { TENDERLY_CHAIN_ID } from '@/data/wagmi/config/testTenderlyChain.ts';
import { approveOrPerformAction, performAction } from '../utils/approveOrPerformAction.ts';
import { connectMockWalletAndAcceptTerms } from '../utils/connectMockWalletAndAcceptTerms.ts';
import { approveToken } from '../utils/approveToken.ts';

test('Supply and withdraw from Savings', async ({ page }) => {
  await page.goto('/');
  await connectMockWalletAndAcceptTerms(page);
  await page.getByRole('tab', { name: 'Savings' }).click();

  await expect(page.getByRole('button', { name: 'Transaction overview' })).not.toBeVisible();

  await page.getByTestId('supply-input-savings').click();
  await page.getByTestId('supply-input-savings').click();
  await page.getByTestId('supply-input-savings').fill('.02');
  await expect(page.getByRole('button', { name: 'Transaction overview' })).toBeVisible();
  await approveOrPerformAction(page, 'Supply');
  await page.getByRole('button', { name: 'Back to Savings' }).click();
  await page.getByRole('tab', { name: 'Withdraw' }).click();

  await page.getByTestId('withdraw-input-savings').click();
  // Tx overview should be hidden if the input is 0 or empty
  await page.getByTestId('withdraw-input-savings').fill('0');
  await expect(page.getByRole('button', { name: 'Transaction overview' })).not.toBeVisible();
  await page.getByTestId('withdraw-input-savings').fill('.01');
  await expect(page.getByRole('button', { name: 'Transaction overview' })).toBeVisible();

  approveOrPerformAction(page, 'Withdraw');

  await expect(page.getByText("You've withdrawn 0.01 USDS from the Sky Savings Rate module")).toBeVisible();
  //TODO: why is the finish button disabled?
  await page.getByRole('button', { name: 'Back to Savings' }).click();
});

test('supply with insufficient usds balance', async ({ page }) => {
  await page.goto('/');
  await connectMockWalletAndAcceptTerms(page);
  await page.getByRole('tab', { name: 'Savings' }).click();

  const balanceLabel = page.getByTestId('supply-input-savings-balance');
  await expect(balanceLabel).not.toHaveText('No wallet connected');
  const balanceText = ((await balanceLabel.innerText()) as string).split(' ')[0].trim();
  await page.getByTestId('supply-input-savings').click();
  await page.getByTestId('supply-input-savings').fill(`500${balanceText}`); // Supply an amount greater than the balance
  await expect(page.getByText('Insufficient funds')).toBeVisible();
});

test('withdraw with insufficient savings balance', async ({ page }) => {
  await page.goto('/');
  await connectMockWalletAndAcceptTerms(page);
  await page.getByRole('tab', { name: 'Savings' }).click();
  await page.getByRole('tab', { name: 'Withdraw' }).click();

  await page.getByTestId('withdraw-input-savings-max').click();
  const reviewButton = await page
    .waitForSelector('role=button[name="Review"]', { timeout: 500 })
    .catch(() => null);

  // If there's no review button after clicking 100%, it means we don't any USDS supplied
  if (reviewButton) {
    await approveOrPerformAction(page, 'Withdraw');
    await expect(page.getByText("You've withdrawn 0.01 USDS from the Sky Savings Rate module")).toBeVisible();
    // await expect(page.locator('text=successfully withdrew')).toHaveCount(2);
    await page.getByRole('button', { name: 'Back to Savings' }).click();
  }

  await page.getByTestId('withdraw-input-savings').click();
  await page.getByTestId('withdraw-input-savings').fill('100');
  await expect(page.getByText('Insufficient funds.')).toBeVisible();
  const reviewButtonDisabled = page.getByTestId('widget-button');
  expect(reviewButtonDisabled).toHaveText('Review');
  expect(reviewButtonDisabled).toBeDisabled();
});

test('Balance changes after a successful supply', async ({ page }) => {
  await setErc20Balance(usdsAddress[TENDERLY_CHAIN_ID], '10');

  await page.goto('/');
  await connectMockWalletAndAcceptTerms(page);
  await page.getByRole('tab', { name: 'Savings' }).click();
  await expect(page.getByTestId('supply-input-savings-balance')).toHaveText('10 USDS');

  const suppliedBalancedText = await page.getByTestId('supplied-balance').innerText();
  const preSupplyBalance = parseFloat(suppliedBalancedText) || 0;

  await page.getByTestId('supply-input-savings').click();
  await page.getByTestId('supply-input-savings').fill('2');
  await approveOrPerformAction(page, 'Supply');
  await page.getByRole('button', { name: 'Back to Savings' }).click();

  await expect(page.getByTestId('supply-input-savings-balance')).toHaveText('8 USDS', { timeout: 15000 });

  const expectedBalance = preSupplyBalance + 2;
  expect(await page.getByTestId('supplied-balance').innerText()).toBe(`${expectedBalance} USDS`);
});

test('Balance changes after a successful withdraw', async ({ page }) => {
  await setErc20Balance(usdsAddress[TENDERLY_CHAIN_ID], '10');

  await page.goto('/');
  await connectMockWalletAndAcceptTerms(page);
  await page.getByRole('tab', { name: 'Savings' }).click();

  // Supply some USDS
  await page.getByTestId('supply-input-savings').click();
  await page.getByTestId('supply-input-savings').fill('4');
  await approveOrPerformAction(page, 'Supply');
  await page.getByRole('button', { name: 'Back to Savings' }).click();

  // Withdraw
  await page.getByRole('tab', { name: 'Withdraw' }).click();

  const suppliedBalancedText = await page.getByTestId('supplied-balance').innerText();
  const prewithdrawBalance = parseFloat(suppliedBalancedText.replace('USDS', '').trim());

  await page.getByTestId('withdraw-input-savings').click();
  await page.getByTestId('withdraw-input-savings').fill('2');
  const reviewButton = await page
    .waitForSelector('role=button[name="Review"]', { timeout: 500 })
    .catch(() => null);
  if (reviewButton) {
    await approveOrPerformAction(page, 'Withdraw');
  }
  await page.getByRole('button', { name: 'Back to Savings' }).click();

  const expectedBalance = prewithdrawBalance - 2;
  if (expectedBalance >= 1) {
    // We supplied 4 and then withdrew 2
    await expect(page.getByTestId('supplied-balance')).toHaveText('2 USDS', { timeout: 15000 });
  } else {
    const zeroBalance = Number(
      (await page.getByTestId('supplied-balance').innerText()).split(' ')[0].replace('<', '').trim()
    );
    expect(zeroBalance).toBeLessThan(1);
  }
});

test('supply with enough allowance does not require approval', async ({ page }) => {
  await approveToken(usdsAddress[TENDERLY_CHAIN_ID], sUsdsAddress[TENDERLY_CHAIN_ID], '100');

  await page.goto('/');
  await connectMockWalletAndAcceptTerms(page);
  await page.getByRole('tab', { name: 'Savings' }).click();
  await page.getByTestId('supply-input-savings').click();
  await page.getByTestId('supply-input-savings').click();
  await page.getByTestId('supply-input-savings').fill('100');
  // Go to review screen
  await page.getByTestId('widget-button').click();
  // It should not ask for approval
  await expect(page.getByTestId('widget-button').last()).toHaveText(/^Confirm supply$/);

  // Supply and reset approval
  await page.getByTestId('widget-button').last().click();
});

test('supply without allowance requires approval', async ({ page }) => {
  await setErc20Balance(usdsAddress[TENDERLY_CHAIN_ID], '101');
  await page.goto('/');
  await connectMockWalletAndAcceptTerms(page);
  await page.getByRole('tab', { name: 'Savings' }).click();
  await page.getByTestId('supply-input-savings').click();
  await page.getByTestId('supply-input-savings').click();
  await page.getByTestId('supply-input-savings').fill('101');
  await page.getByTestId('widget-button').click();
  // It should ask to confirm 2 transactions, including the approval
  await expect(page.getByTestId('widget-button').last()).toHaveText('Confirm 2 transactions');
});

test('if not connected it should show a connect button', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('tab', { name: 'Savings' }).click();

  const widgetConnectButton = page
    .getByTestId('widget-container')
    .getByRole('button', { name: 'Connect Wallet' });

  await expect(page.getByRole('heading', { name: 'Connect to explore Sky' })).toBeVisible();

  // Check that Connect button is visible
  await expect(widgetConnectButton).toBeVisible();

  // After connecting, the button should disappear
  await connectMockWalletAndAcceptTerms(page);
  await expect(widgetConnectButton).not.toBeVisible();
});

test('percentage buttons work', async ({ page }) => {
  await page.goto('/');
  await connectMockWalletAndAcceptTerms(page);
  await page.getByRole('tab', { name: 'Savings' }).click();

  await page.getByRole('button', { name: '25%' }).click();
  expect(await page.getByTestId('supply-input-savings').inputValue()).toBe('25');
  await page.getByRole('button', { name: '50%' }).click();
  expect(await page.getByTestId('supply-input-savings').inputValue()).toBe('50');
  await page.getByRole('button', { name: '100%' }).click();
  expect(await page.getByTestId('supply-input-savings').inputValue()).toBe('100');

  await page.getByRole('tab', { name: 'Withdraw' }).click();
  const suppliedBalancedText = await page.getByTestId('withdraw-input-savings-balance').innerText();
  const withdrawBalance = parseFloat(suppliedBalancedText.replace('USDS', '').trim());

  await page.getByRole('button', { name: '25%' }).click();
  const input25 = (await page.getByTestId('withdraw-input-savings').inputValue()).replace('USDS', '').trim();
  const val25 = parseFloat(input25);
  expect(val25).toBeGreaterThanOrEqual(withdrawBalance * 0.25);
  expect(val25).toBeLessThanOrEqual(withdrawBalance * 0.25 + 0.1);

  await page.getByRole('button', { name: '50%' }).click();
  const input50 = (await page.getByTestId('withdraw-input-savings').inputValue()).replace('USDS', '').trim();
  const val50 = parseFloat(input50);
  expect(val50).toBeGreaterThanOrEqual(withdrawBalance * 0.5);
  expect(val50).toBeLessThanOrEqual(withdrawBalance * 0.5 + 0.1);

  await page.getByRole('button', { name: '100%' }).click();
  const input100 = (await page.getByTestId('withdraw-input-savings').inputValue()).replace('USDS', '').trim();
  const val100 = parseFloat(input100);
  expect(val100).toBeGreaterThanOrEqual(withdrawBalance);
});

test('enter amount button should be disabled', async ({ page }) => {
  await page.goto('/');
  await connectMockWalletAndAcceptTerms(page);
  await page.getByRole('tab', { name: 'Savings' }).click();

  await expect(
    page.getByTestId('widget-container').locator('button').filter({ hasText: 'Enter amount' })
  ).toBeDisabled();

  await page.getByTestId('supply-input-savings').click();
  await page.getByTestId('supply-input-savings').fill('0');

  await expect(
    page.getByTestId('widget-container').locator('button').filter({ hasText: 'Enter amount' })
  ).toBeDisabled();

  // Withdraw
  await page.getByRole('tab', { name: 'Withdraw' }).click();
  await expect(
    page.getByTestId('widget-container').locator('button').filter({ hasText: 'Enter amount' })
  ).toBeDisabled();
  await page.getByTestId('withdraw-input-savings').click();
  await page.getByTestId('withdraw-input-savings').fill('0');
  // TODO: Fix this in widgets package
  await expect(
    page.getByTestId('widget-container').locator('button').filter({ hasText: 'Enter amount' })
  ).toBeDisabled();
});

test('A supply error redirects to the error screen', async ({ page }) => {
  await setErc20Balance(usdsAddress[TENDERLY_CHAIN_ID], '101');
  await page.goto('/');
  await connectMockWalletAndAcceptTerms(page);
  await page.getByRole('tab', { name: 'Savings' }).click();
  await page.getByTestId('supply-input-savings').click();
  await page.getByTestId('supply-input-savings').fill('101');

  await approveOrPerformAction(page, 'Supply', { reject: true });

  expect(page.getByText('An error occurred during the supply flow.').last()).toBeVisible();
  expect(page.getByRole('button', { name: 'Back' }).last()).toBeVisible();
  expect(page.getByRole('button', { name: 'Back' }).last()).toBeEnabled();
  expect(page.getByRole('button', { name: 'Retry' }).last()).toBeVisible();
  await expect(page.getByRole('button', { name: 'Retry' }).last()).toBeEnabled({ timeout: 15000 });

  await page.getByRole('button', { name: 'Retry' }).last().click();

  await expect(page.getByText('An error occurred during the supply flow.')).toBeVisible();
});

test('A withdraw error redirects to the error screen', async ({ page }) => {
  await page.goto('/');
  await connectMockWalletAndAcceptTerms(page);
  await page.getByRole('tab', { name: 'Savings' }).click();

  // Supply some USDS
  await page.getByTestId('supply-input-savings').click();
  await page.getByTestId('supply-input-savings').fill('4');
  await approveOrPerformAction(page, 'Supply');
  await page.getByRole('button', { name: 'Back to Savings' }).click();

  // Then attempt to withdraw
  await page.getByRole('tab', { name: 'Withdraw' }).click();
  await page.getByTestId('withdraw-input-savings').click();
  await page.getByTestId('withdraw-input-savings').fill('1');

  await approveOrPerformAction(page, 'Withdraw', { reject: true });

  expect(page.getByText('An error occurred during the withdraw flow.').last()).toBeVisible();
  expect(page.getByRole('button', { name: 'Back' }).last()).toBeVisible();
  expect(page.getByRole('button', { name: 'Back' }).last()).toBeEnabled();
  expect(page.getByRole('button', { name: 'Retry' }).last()).toBeVisible();
  await expect(page.getByRole('button', { name: 'Retry' }).last()).toBeEnabled({ timeout: 15000 });

  await page.getByRole('button', { name: 'Retry' }).last().click();

  await expect(page.getByText('An error occurred during the withdraw flow.')).toBeVisible();
});

test('Details pane shows right data', async ({ page }) => {
  await page.goto('/');
  await connectMockWalletAndAcceptTerms(page);
  await page.getByRole('tab', { name: 'Savings' }).click();

  // Wait for data point to be ready
  await expect(page.getByTestId('savings-remaining-balance-details')).toContainText('USDS');

  const balanceDetails = await page.getByTestId('savings-remaining-balance-details').innerText();
  await expect(page.getByTestId('supply-input-savings-balance')).toHaveText(balanceDetails);

  await page.getByRole('tab', { name: 'Withdraw' }).click();
  // Wait for data point to be ready
  await expect(page.getByTestId('savings-supplied-balance-details')).toContainText('USDS');

  const detailsSuppliedBalance = await page.getByTestId('savings-supplied-balance-details').innerText();
  await expect(page.getByTestId('supplied-balance')).toHaveText(detailsSuppliedBalance);

  // close details pane
  await page.getByTestId('widget-container').getByLabel('Toggle details').click();
  await expect(page.getByTestId('savings-stats-section')).not.toBeVisible();

  // open details pane
  await page.getByTestId('widget-container').getByLabel('Toggle details').click();
  await expect(page.getByTestId('savings-stats-section')).toBeVisible();

  // Chart is present
  await expect(page.getByTestId('savings-chart')).toBeVisible();

  // History is present
  await expect(page.getByTestId('savings-history')).toBeVisible();
});

test('Batch - Supply to Savings', async ({ page }) => {
  await page.goto('/');
  await connectMockWalletAndAcceptTerms(page, { batch: true });
  await page.getByRole('tab', { name: 'Savings' }).click();

  await expect(page.getByRole('button', { name: 'Transaction overview' })).not.toBeVisible();

  await page.getByTestId('supply-input-savings').click();
  await page.getByTestId('supply-input-savings').fill('.02');
  await expect(page.getByRole('button', { name: 'Transaction overview' })).toBeVisible();
  await performAction(page, 'Supply');
  await page.getByRole('button', { name: 'Back to Savings' }).click();
});
