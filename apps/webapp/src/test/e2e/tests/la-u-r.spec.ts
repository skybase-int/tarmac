import { expect, test } from '../fixtures.ts';
import { approveOrPerformAction } from '../utils/approveOrPerformAction.ts';
import { connectMockWalletAndAcceptTerms } from '../utils/connectMockWalletAndAcceptTerms.ts';

test('Linked Action - Upgrade DAI then get reward', async ({ page }) => {
  await page.goto(
    '?widget=upgrade&input_amount=100&linked_action=rewards&reward=0x0650CAF159C5A49f711e8169D4336ECB9b950275'
  );
  await connectMockWalletAndAcceptTerms(page);
  const arrowStepIndicators = page.locator('[data-testid="arrow-step-indicator"]');
  await expect(arrowStepIndicators).toHaveCount(2);

  await approveOrPerformAction(page, 'Upgrade');

  await page.getByRole('button', { name: 'Go to Rewards' }).first().click();

  await approveOrPerformAction(page, 'Supply');

  await page.getByRole('button', { name: 'Back to Rewards' }).first().click();
});
