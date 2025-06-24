import { expect, type Page } from '@playwright/test';
import { interceptAndRejectTransactions } from './rejectTransaction';

export type Action =
  | 'Supply'
  | 'Withdraw'
  | 'Upgrade'
  | 'Revert'
  | 'Trade'
  | 'Approve'
  | 'Approve supply amount'
  | 'Approve seal amount'
  | 'Approve staking amount'
  | 'Approve repay amount'
  | 'Continue'
  | 'Confirm'
  | 'Submit'
  | 'Begin migration'
  | 'Migrate'
  | 'Continue to migrate'
  | 'Confirm your position';

type approveOrPerformActionOptions = {
  reject?: boolean;
  buttonPosition?: number;
};

export const approveOrPerformAction = async (
  page: Page,
  action: Action,
  options?: approveOrPerformActionOptions
) => {
  const { reject = false, buttonPosition = 0 } = options || {};

  await page.getByTestId('widget-button').getByText('Review').click();

  const actionText = `Confirm ${action.toLowerCase()}`;
  const actionButton = page
    .locator(`role=button >> text=/^(${actionText}|Confirm 2 transactions)$/`)
    .nth(buttonPosition);
  await actionButton.waitFor({ state: 'attached' }); // Ensure the button is in the DOM
  await expect(actionButton).toBeEnabled(); // Wait for the button to be enabled

  if (reject) {
    await interceptAndRejectTransactions(page, 200, true);
  }
  await actionButton.click();
};

export const performAction = async (page: Page, action: Action) => {
  await page.getByTestId('widget-button').getByText('Review').click();
  const actionButton = page.locator('role=button >> text=/^Confirm bundled transaction$/').nth(0);
  await actionButton.waitFor({ state: 'attached' }); // Ensure the button is in the DOM
  await expect(actionButton).toBeEnabled(); // Wait for the button to be enabled
  await actionButton.click();
  await expect(page.getByTestId('step-indicator').last()).toHaveText(action);
};
