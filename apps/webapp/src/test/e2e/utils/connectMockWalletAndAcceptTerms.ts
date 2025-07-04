import { type Page } from '@playwright/test';

export const connectMockWalletAndAcceptTerms = async (page: Page, { batch }: { batch?: boolean } = {}) => {
  await page
    .getByRole('button', { name: batch ? 'Connect Batch Mock Wallet' : 'Connect Mock Wallet' })
    .first()
    .click();

  try {
    await page.getByTestId('end-of-terms').scrollIntoViewIfNeeded({ timeout: 2000 });
    await page.getByRole('checkbox').click();
    await page.getByRole('button', { name: 'Agree and Sign' }).click();
  } catch (error) {
    console.error('Error accepting terms: ', error);
    console.log('Skipping terms acceptance');
    return;
  }
};
