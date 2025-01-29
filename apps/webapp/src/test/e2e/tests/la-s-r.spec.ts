import { expect, test } from '../fixtures.ts';
import { approveOrPerformAction } from '../utils/approveOrPerformAction.ts';
import { connectMockWalletAndAcceptTerms } from '../utils/connectMockWalletAndAcceptTerms.ts';

test.skip('Linked Action - Trade USDC then get reward', async ({ page }) => {
  await page.goto(
    '?widget=trade&source_token=USDC&target_token=USDS&input_amount=10&linked_action=rewards&reward=0x5eeB3D8D60B06a44f6124a84EeE7ec0bB747BE6d'
  );
  await connectMockWalletAndAcceptTerms(page);

  const arrowStepIndicators = page.locator('[data-testid="arrow-step-indicator"]');
  await expect(arrowStepIndicators).toHaveCount(2);

  await page.getByRole('button', { name: 'Review trade' }).click();
  await page.getByRole('button', { name: 'Approve' }).first().click();
  await expect(page.getByRole('heading', { name: 'Success' })).toBeVisible();
  await page.getByRole('button', { name: 'Continue' }).last().click();
  await expect(page.getByRole('heading', { name: 'Trade completed' })).toBeVisible();

  await page.getByRole('button', { name: 'Add USDS to wallet' }).click();

  await page.getByRole('button', { name: 'Go to Rewards' }).click();

  await approveOrPerformAction(page, 'Supply');

  await page.getByRole('button', { name: 'Back to Rewards' }).click();
});
