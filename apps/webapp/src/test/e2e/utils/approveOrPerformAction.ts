import { expect, type Page } from '@playwright/test';
import { interceptAndRejectTransactions } from './rejectTransaction';

export type Action =
  | 'Supply'
  | 'Withdraw'
  | 'Upgrade'
  | 'Revert'
  | 'Trade'
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

  const widgetButton = page.getByTestId('widget-button').nth(buttonPosition);
  await widgetButton.waitFor({ state: 'attached' }); // Ensure the button is in the DOM
  await expect(widgetButton).toHaveText(/^Confirm/);
  await expect(widgetButton).toBeEnabled(); // Wait for the button to be enabled

  if (reject) {
    await interceptAndRejectTransactions(page, 200, true);
  }
  await widgetButton.click();
  const stepIndicator = page.getByTestId('step-indicator').last();
  const isStepIndicatorVisible = await stepIndicator.isVisible();
  // Some flows that don't require approval like rewards withdraw and mainnet savings withdraw don't show the step indicator
  if (isStepIndicatorVisible) {
    await expect(stepIndicator).toHaveText(action);
  }
};

export const performAction = async (page: Page, action: Action) => {
  await page.getByTestId('widget-button').getByText('Review').click();
  const actionButton = page.locator('role=button >> text=/^Confirm bundled transaction$/').nth(0);
  await actionButton.waitFor({ state: 'attached' }); // Ensure the button is in the DOM
  await expect(actionButton).toBeEnabled(); // Wait for the button to be enabled
  await actionButton.click();
  await expect(page.getByTestId('step-indicator').last()).toHaveText(action);
};
