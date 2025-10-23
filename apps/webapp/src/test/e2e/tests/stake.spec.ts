import { expect, test } from '../fixtures.js';
import { approveOrPerformAction, performAction } from '../utils/approveOrPerformAction.js';
import { setErc20Balance } from '../utils/setBalance.js';
import { skyAddress, usdsAddress } from '@jetstreamgg/sky-hooks';
import { TENDERLY_CHAIN_ID } from '@/data/wagmi/config/testTenderlyChain.ts';
import { connectMockWalletAndAcceptTerms } from '../utils/connectMockWalletAndAcceptTerms.js';

test.beforeAll(async () => {});

test.beforeEach(async ({ page }) => {
  await Promise.all([
    setErc20Balance(skyAddress[TENDERLY_CHAIN_ID], '100000000'),
    setErc20Balance(usdsAddress[TENDERLY_CHAIN_ID], '1')
  ]);
  await page.goto('/');
  await connectMockWalletAndAcceptTerms(page);
  await page.getByRole('tab', { name: 'Stake' }).click();
});

test('Lock SKY, select rewards, select delegate, and open position', async ({ page }) => {
  // await page.getByRole('button', { name: 'Open a new position' }).click();
  await expect(page.getByTestId('supply-first-input-lse-balance')).toHaveText('100,000,000 SKY');

  // fill seal and borrow inputs and click next
  await page.getByTestId('supply-first-input-lse').fill('2400000');
  await page.getByTestId('borrow-input-lse').fill('38000');

  // check the delegation checkbox to enable delegate selection
  await page.getByText('Do you want to delegate voting power?').click();

  // // TODO: check all the params
  await expect(page.getByTestId('widget-button').first()).toBeEnabled({ timeout: 10000 });
  await page.getByTestId('widget-button').first().click();

  // select rewards
  await expect(page.getByText('Choose your reward token')).toBeVisible();
  await page.getByTestId('stake-reward-card').first().click();
  await expect(page.getByTestId('widget-button').first()).toBeEnabled();
  await page.getByTestId('widget-button').first().click();

  // select delegate
  await expect(page.getByText('Choose your delegate')).toBeVisible();
  await page
    .getByTestId(/^delegate-card-/)
    .first()
    .click(); // select the first delegate using data-testid
  await expect(page.getByTestId('widget-button').first()).toBeEnabled();
  await page.getByTestId('widget-button').first().click();

  // position summary
  await expect(page.getByText('Confirm your position').nth(0)).toBeVisible({ timeout: 10000 });
  await expect(page.getByTestId('position-summary-card').getByText('Staking').first()).toBeVisible();
  await expect(page.getByText('2.4M SKY')).toBeVisible();
  await expect(page.getByTestId('position-summary-card').getByText('Borrowing')).toBeVisible();
  await expect(page.getByText('38K USDS')).toBeVisible();
  await expect(page.getByTestId('position-summary-card').getByText('Staking reward')).toBeVisible();

  // confirm position
  await approveOrPerformAction(page, 'Open a position', { review: false });

  await expect(page.getByRole('heading', { name: 'Success!' })).toBeVisible({ timeout: 10000 });
  await expect(
    page.getByText("You've borrowed 38,000 USDS by staking 2,400,000 SKY. Your new position is open.")
  ).toBeVisible();

  // positions overview
  await page.getByRole('button', { name: 'Manage your position(s)' }).click();
  await expect(page.getByText('Position 1')).toBeVisible();

  // manage position
  await page.getByRole('button', { name: 'Manage Position' }).last().click();
  await expect(page.getByText('Your position 1')).toBeVisible();
  await expect(page.getByTestId('borrow-input-lse-balance')).toHaveText(/Limit 0 <> .+ USDS/);

  // verify the delegate checkbox is selected and disabled (since delegate was already chosen)
  const delegateCheckbox = page.getByRole('checkbox', {
    name: /You are delegating voting power for this position/i
  });
  await expect(delegateCheckbox).toBeChecked();
  await expect(delegateCheckbox).toBeDisabled();

  // borrow more and skip rewards and delegate selection
  await page.getByTestId('borrow-input-lse').fill('100');
  await expect(page.getByText('Insufficient collateral')).not.toBeVisible();
  await page.getByTestId('widget-button').first().click();

  await expect(page.getByText('Choose your reward token')).toBeVisible();
  await page.getByRole('button', { name: 'skip' }).click();
  await expect(page.getByText('Change your delegate')).toBeVisible();
  await page.getByRole('button', { name: 'skip' }).first().click();

  await expect(page.getByText('Confirm your position').nth(0)).toBeVisible();
  await approveOrPerformAction(page, 'Change Position', { review: false });
  await expect(page.getByRole('heading', { name: 'Success!' })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("You've borrowed 100 USDS. Your position is updated.")).toBeVisible();
  await page.getByRole('button', { name: 'Manage your position(s)' }).click();
  await expect(page.getByText('Position 1')).toBeVisible();

  // repay all
  await page.getByRole('button', { name: 'Manage Position' }).last().click();
  await expect(page.getByText('Your position 1')).toBeVisible();
  await expect(page.getByTestId('borrow-input-lse-balance')).toHaveText(/Limit 0 <> .+ USDS/);

  // switch tabs
  await page.getByRole('tab', { name: 'Unstake and pay back' }).click();
  await expect(page.getByTestId('repay-input-lse-balance')).toHaveText(/Limit 0 <> .+, or .+ USDS/);

  // click repay 100% button
  await page.getByRole('button', { name: '100%' }).nth(1).click();

  // due to stability fee accumulation, the exact repay amount will change based on time
  const repayValue = Number(await page.getByTestId('repay-input-lse').inputValue());
  expect(repayValue).toBeGreaterThan(38100);
  expect(repayValue).toBeLessThan(38101);
  await page.getByTestId('widget-button').first().click();

  // skip the rewards and delegates and confirm position
  await expect(page.getByText('Choose your reward token')).toBeVisible();
  await page.getByRole('button', { name: 'skip' }).click();
  await expect(page.getByText('Change your delegate')).toBeVisible();
  await page.getByRole('button', { name: 'skip' }).first().click();

  await expect(page.getByText('Confirm your position').nth(0)).toBeVisible();

  await approveOrPerformAction(page, 'Change Position', { review: false });
  await expect(page.getByRole('heading', { name: 'Success!' })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("You've repaid 38,100 USDS to exit your position.")).toBeVisible();
  await page.getByRole('button', { name: 'Manage your position(s)' }).click();
  await expect(page.getByText('Position 1')).toBeVisible();

  // unseal all
  await page.getByRole('button', { name: 'Manage Position' }).last().click();
  await expect(page.getByText('Your position 1')).toBeVisible();

  // switch tabs
  await page.getByRole('tab', { name: 'Unstake and pay back' }).click();
  await expect(page.getByTestId('supply-first-input-lse-balance')).toHaveText('2,400,000 SKY');

  // fill some SKY and proceed to skip the rewards and delegates and confirm position
  await page.getByTestId('supply-first-input-lse').fill('12000');
  await page.getByTestId('widget-button').first().click();

  await expect(page.getByText('Choose your reward token')).toBeVisible();
  await page.getByRole('button', { name: 'skip' }).click();
  await expect(page.getByText('Change your delegate')).toBeVisible();
  await page.getByRole('button', { name: 'skip' }).first().click();

  await expect(page.getByText('Confirm your position').nth(0)).toBeVisible();

  await approveOrPerformAction(page, 'Change Position', { review: false });
  await expect(page.getByRole('heading', { name: 'Success!' })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText("You've unstaked 12,000 SKY to exit your position.")).toBeVisible();
  await page.getByRole('button', { name: 'Manage your position(s)' }).click();
  await expect(page.getByText('Position 1')).toBeVisible();
});

test('Batch - Lock SKY, select rewards, select delegate, and open position', async ({ page }) => {
  await page.goto('/');
  await connectMockWalletAndAcceptTerms(page, { batch: true });
  await page.getByRole('tab', { name: 'Stake' }).click();

  await expect(page.getByTestId('supply-first-input-lse-balance')).toHaveText('100,000,000 SKY');

  // fill seal and borrow inputs and click next
  await page.getByTestId('supply-first-input-lse').fill('2400000');
  await page.getByTestId('borrow-input-lse').fill('38000');

  // check the delegation checkbox to enable delegate selection
  await page.getByText('Do you want to delegate voting power?').click();

  // // TODO: check all the params
  await expect(page.getByTestId('widget-button').first()).toBeEnabled({ timeout: 10000 });
  await page.getByTestId('widget-button').first().click();

  // select rewards
  await expect(page.getByText('Choose your reward token')).toBeVisible();
  await page.getByTestId('stake-reward-card').first().click();
  await expect(page.getByTestId('widget-button').first()).toBeEnabled();
  await page.getByTestId('widget-button').first().click();

  // select delegate
  await expect(page.getByText('Choose your delegate')).toBeVisible();
  await page
    .getByTestId(/^delegate-card-/)
    .first()
    .click(); // select the first delegate using data-testid
  await expect(page.getByTestId('widget-button').first()).toBeEnabled();
  await page.getByTestId('widget-button').first().click();

  // position summary
  await expect(page.getByText('Confirm your position').nth(0)).toBeVisible({ timeout: 10000 });
  await expect(page.getByTestId('position-summary-card').getByText('Staking').first()).toBeVisible();
  await expect(page.getByText('2.4M SKY')).toBeVisible();
  await expect(page.getByTestId('position-summary-card').getByText('Borrowing')).toBeVisible();
  await expect(page.getByText('38K USDS')).toBeVisible();
  await expect(page.getByTestId('position-summary-card').getByText('Staking reward')).toBeVisible();

  // confirm position
  await performAction(page, 'Open a position', { review: false });
  await expect(page.getByRole('heading', { name: 'Success!' })).toBeVisible();
  await expect(
    page.getByText("You've borrowed 38,000 USDS by staking 2,400,000 SKY. Your new position is open.")
  ).toBeVisible();
});

test('Checkbox unchecked - Delegate screen should not appear', async ({ page }) => {
  await expect(page.getByTestId('supply-first-input-lse-balance')).toHaveText('100,000,000 SKY');

  // fill seal and borrow inputs
  await page.getByTestId('supply-first-input-lse').fill('2400000');
  await page.getByTestId('borrow-input-lse').fill('38000');

  // verify checkbox is unchecked by default
  const checkbox = page.getByRole('checkbox', { name: /Do you want to delegate voting power?/i });
  await expect(checkbox).not.toBeChecked();

  // click next without checking the delegation checkbox
  await expect(page.getByTestId('widget-button').first()).toBeEnabled({ timeout: 10000 });
  await page.getByTestId('widget-button').first().click();

  // select rewards
  await expect(page.getByText('Choose your reward token')).toBeVisible();
  await page.getByTestId('stake-reward-card').first().click();
  await expect(page.getByTestId('widget-button').first()).toBeEnabled();
  await page.getByTestId('widget-button').first().click();

  // verify delegate screen is skipped and we go directly to position summary
  await expect(page.getByText('Choose your delegate')).not.toBeVisible();
  await expect(page.getByText('Confirm your position').nth(0)).toBeVisible({ timeout: 10000 });

  // verify position details are correct
  await expect(page.getByTestId('position-summary-card').getByText('Staking').first()).toBeVisible();
  await expect(page.getByText('2.4M SKY')).toBeVisible();
  await expect(page.getByTestId('position-summary-card').getByText('Borrowing')).toBeVisible();
  await expect(page.getByText('38K USDS')).toBeVisible();
  await expect(page.getByTestId('position-summary-card').getByText('Staking reward')).toBeVisible();

  // confirm position without delegate
  await approveOrPerformAction(page, 'Open a position', { review: false });

  await expect(page.getByRole('heading', { name: 'Success!' })).toBeVisible({ timeout: 10000 });
  await expect(
    page.getByText("You've borrowed 38,000 USDS by staking 2,400,000 SKY. Your new position is open.")
  ).toBeVisible();
});

test('Checkbox toggled off after delegate selection - Delegate should be cleared', async ({ page }) => {
  await expect(page.getByTestId('supply-first-input-lse-balance')).toHaveText('100,000,000 SKY');

  // fill seal and borrow inputs
  await page.getByTestId('supply-first-input-lse').fill('2400000');
  await page.getByTestId('borrow-input-lse').fill('38000');

  // check the delegation checkbox to enable delegate selection
  await page.getByText('Do you want to delegate voting power?').click();
  const checkbox = page.getByRole('checkbox', { name: /Do you want to delegate voting power?/i });
  await expect(checkbox).toBeChecked();

  // proceed to next screen
  await expect(page.getByTestId('widget-button').first()).toBeEnabled({ timeout: 10000 });
  await page.getByTestId('widget-button').first().click();

  // select rewards
  await expect(page.getByText('Choose your reward token')).toBeVisible();
  await page.getByTestId('stake-reward-card').first().click();
  await expect(page.getByTestId('widget-button').first()).toBeEnabled();
  await page.getByTestId('widget-button').first().click();

  // select a delegate
  await expect(page.getByText('Choose your delegate')).toBeVisible();
  await page
    .getByTestId(/^delegate-card-/)
    .first()
    .click();
  await expect(page.getByTestId('widget-button').first()).toBeEnabled();

  // go back to the initial screen using back button
  await page.getByRole('button', { name: 'back' }).click();
  await expect(page.getByText('Choose your reward token')).toBeVisible();
  await page.getByRole('button', { name: 'back' }).click();
  await expect(page.getByTestId('supply-first-input-lse-balance')).toHaveText('100,000,000 SKY');

  // uncheck the delegation checkbox
  await page.getByText('Do you want to delegate voting power?').click();
  await expect(checkbox).not.toBeChecked();

  // proceed forward again
  await expect(page.getByTestId('widget-button').first()).toBeEnabled({ timeout: 10000 });
  await page.getByTestId('widget-button').first().click();

  // select rewards again
  await expect(page.getByText('Choose your reward token')).toBeVisible();
  // await page.getByTestId('stake-reward-card').first().click();
  await expect(page.getByTestId('widget-button').first()).toBeEnabled();
  await page.getByTestId('widget-button').first().click();

  // verify delegate screen is now skipped
  await expect(page.getByText('Choose your delegate')).not.toBeVisible();
  await expect(page.getByText('Confirm your position').nth(0)).toBeVisible({ timeout: 10000 });

  // verify position summary does NOT show any delegate information
  await expect(page.getByTestId('position-summary-card').getByText('Staking').first()).toBeVisible();
  await expect(page.getByText('2.4M SKY')).toBeVisible();
  await expect(page.getByTestId('position-summary-card').getByText('Borrowing')).toBeVisible();
  await expect(page.getByText('38K USDS')).toBeVisible();
  await expect(page.getByTestId('position-summary-card').getByText('Staking reward')).toBeVisible();
  // verify no delegate section appears in summary
  await expect(page.getByTestId('position-summary-card').getByText('BLUE')).not.toBeVisible();

  // confirm position
  await approveOrPerformAction(page, 'Open a position', { review: false });

  await expect(page.getByRole('heading', { name: 'Success!' })).toBeVisible({ timeout: 10000 });
  await expect(
    page.getByText("You've borrowed 38,000 USDS by staking 2,400,000 SKY. Your new position is open.")
  ).toBeVisible();

  // navigate to positions overview and verify the position was created without delegate
  await page.getByRole('button', { name: 'Manage your position(s)' }).click();
  await expect(page.getByText('Position 1')).toBeVisible();

  // verify no delegate information is shown in the position card
  const positionCard = page.getByRole('button', { name: 'Manage Position' }).last().locator('..');
  await expect(positionCard.getByText('BLUE')).not.toBeVisible();
  await expect(positionCard.getByText('Delegate')).not.toBeVisible();

  // manage position to verify no delegate is set
  await page.getByRole('button', { name: 'Manage Position' }).last().click();
  await expect(page.getByText('Your position 1')).toBeVisible();

  // verify the delegate checkbox is NOT checked and is enabled (no delegate was set)
  const manageDelegateCheckbox = page.getByRole('checkbox', {
    name: /Do you want to delegate voting power?/i
  });
  await expect(manageDelegateCheckbox).not.toBeChecked();
  await expect(manageDelegateCheckbox).toBeEnabled();
});
