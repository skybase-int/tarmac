import { expect, test } from '../fixtures.ts';
import { approveOrPerformAction } from '../utils/approveOrPerformAction.ts';
import { setErc20Balance } from '../utils/setBalance.ts';
import { mkrAddress, usdsAddress } from '@jetstreamgg/hooks';
import { TENDERLY_CHAIN_ID } from '@/data/wagmi/config/testTenderlyChain.ts';
// import { withdrawAllAndReset } from '../utils/rewards.ts';
import { connectMockWalletAndAcceptTerms } from '../utils/connectMockWalletAndAcceptTerms.ts';

test.beforeAll(async () => {});

test.beforeEach(async ({ page }) => {
  await Promise.all([
    setErc20Balance(mkrAddress[TENDERLY_CHAIN_ID], '100'),
    setErc20Balance(usdsAddress[TENDERLY_CHAIN_ID], '38100')
  ]);
  await page.goto('/seal-engine');
  await connectMockWalletAndAcceptTerms(page);
});

test('Lock MKR, select rewards, select delegate, and open position', async ({ page }) => {
  // positions overview
  await expect(page.getByText('Position 1')).toBeVisible();

  // manage position
  await page.getByRole('button', { name: 'Manage Position' }).click();

  // borrow more and skip rewards and delegate selection
  await page.getByTestId('borrow-input-lse').fill('100');
  await expect(page.getByText('Insufficient collateral')).not.toBeVisible();
  await page.getByTestId('widget-button').click();

  await expect(page.getByText('Choose your reward token')).toBeVisible();
  await page.getByRole('button', { name: 'skip' }).click();
  await expect(page.getByText('Choose your delegate')).toBeVisible();
  await page.getByRole('button', { name: 'skip' }).click();

  await expect(page.getByText('Confirm your position').nth(0)).toBeVisible();
  await approveOrPerformAction(page, 'Confirm');
  expect(page.getByRole('heading', { name: 'Success!' })).toBeVisible();
  await expect(page.getByText("You've borrowed 100 USDS. Your position is updated.")).toBeVisible();
  await page.getByRole('button', { name: 'Manage your position(s)' }).click();
  await expect(page.getByText('Position 1')).toBeVisible();

  // repay all
  await page.getByRole('button', { name: 'Manage Position' }).click();
  // This value is time sensitive, so we use a regex to match the value between 14,474 and 15,473
  await expect(page.getByTestId('borrow-input-lse-balance')).toHaveText(/Limit 0 <> (14,474|15,473) USDS/);

  // switch tabs
  await page.getByRole('tab', { name: 'Unseal and pay back' }).click();
  // This value is time sensitive, so we use a regex to match the value between 28,119 and 28,120
  await expect(page.getByTestId('repay-input-lse-balance')).toHaveText(
    /Limit 0 <> (28,119|28,120), or (38,119|38,120) USDS/
  );

  // click repay 100% button
  await page.getByRole('button', { name: '100%' }).nth(1).click();

  // due to stability fee accumulation, the exact repay amount will change based on time
  const repayValue = Number(await page.getByTestId('repay-input-lse').inputValue());
  expect(repayValue).toBeGreaterThan(38119);
  expect(repayValue).toBeLessThan(38120);
  await page.getByTestId('widget-button').click();

  // skip the rewards and delegates and confirm position
  await expect(page.getByText('Choose your reward token')).toBeVisible();
  await page.getByRole('button', { name: 'skip' }).click();
  await expect(page.getByText('Choose your delegate')).toBeVisible();
  await page.getByRole('button', { name: 'skip' }).click();

  await expect(page.getByText('Confirm your position').nth(0)).toBeVisible();

  // need to approve
  await approveOrPerformAction(page, 'Approve repay amount');
  expect(page.getByRole('heading', { name: 'Token access approved' })).toBeVisible();

  await approveOrPerformAction(page, 'Continue');
  expect(page.getByRole('heading', { name: 'Success!' })).toBeVisible();
  // This value is time sensitive, so we use a regex to match the value between 38,119 and 38,120
  await expect(page.getByText(/You've repaid (38,119|38,120) USDS to exit your position./)).toBeVisible();
  await page.getByRole('button', { name: 'Manage your position(s)' }).click();
  await expect(page.getByText('Position 1')).toBeVisible();

  // unseal all
  await page.getByRole('button', { name: 'Manage Position' }).click();

  // switch tabs
  await page.getByRole('tab', { name: 'Unseal and pay back' }).click();
  await expect(page.getByTestId('supply-first-input-lse-balance')).toHaveText('100 MKR');

  // fill some MKR and proceed to skip the rewards and delegates and confirm position
  await page.getByTestId('supply-first-input-lse').fill('0.5');
  await page.getByTestId('widget-button').click();

  await expect(page.getByText('Choose your reward token')).toBeVisible();
  await page.getByRole('button', { name: 'skip' }).click();
  await expect(page.getByText('Choose your delegate')).toBeVisible();
  await page.getByRole('button', { name: 'skip' }).click();

  await expect(page.getByText('Confirm your position').nth(0)).toBeVisible();

  await approveOrPerformAction(page, 'Confirm');
  expect(page.getByRole('heading', { name: 'Success!' })).toBeVisible();
  await expect(
    page.getByText("You've unsealed 0.5 MKR to exit your position. An exit fee was applied.")
  ).toBeVisible();
  await page.getByRole('button', { name: 'Manage your position(s)' }).click();
  await expect(page.getByText('Position 1')).toBeVisible();
});
