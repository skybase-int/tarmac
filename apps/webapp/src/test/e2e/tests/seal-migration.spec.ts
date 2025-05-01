import { lsMkrUsdsRewardAddress, mkrAddress, sealModuleAddress } from '@jetstreamgg/hooks';
import { expect, test } from '../fixtures';
import { setErc20Balance } from '../utils/setBalance';
import { TENDERLY_CHAIN_ID } from '@/data/wagmi/config/testTenderlyChain';
import { newSealPosition } from '../utils/newSealPosition';
import { approveToken } from '../utils/approveToken';
import { mkrAbi } from 'node_modules/@jetstreamgg/hooks/src/generated';
import { updateSealDebtCeiling } from '../utils/updateSealDebtCeiling';
import { connectMockWalletAndAcceptTerms } from '../utils/connectMockWalletAndAcceptTerms';
import { approveOrPerformAction } from '../utils/approveOrPerformAction';

test.beforeAll(async () => {
  await Promise.all([
    setErc20Balance(mkrAddress[TENDERLY_CHAIN_ID], '1000'),
    approveToken(mkrAddress[TENDERLY_CHAIN_ID], sealModuleAddress[TENDERLY_CHAIN_ID], '100', mkrAbi),
    // Increase the debt ceiling in the seal module to the same value than in the stake module so we can open a position and borrow
    updateSealDebtCeiling(50000000000000000000000000000000000000000000000000000n)
  ]);

  // Create a new Seal position in the forked testnet before running the tests. Seal widget has the "Open new position" button disabled for the migration.
  await newSealPosition(
    '100',
    // Manually created delegate in the parent forked vnet
    '0x4e4393f93ac7ba34648a82ea2248d9bdbb1ff7e5',
    lsMkrUsdsRewardAddress[TENDERLY_CHAIN_ID],
    '38000'
  );

  // Restore the Seal debt ceiling to the initial value of 0 after creating position for a more realistic environment
  await updateSealDebtCeiling(0n);
});

test.beforeEach(async ({ page }) => {
  await page.goto('/seal-engine');
  await connectMockWalletAndAcceptTerms(page);
});

test('Migrate Seal position to Staking position', async ({ page }) => {
  // positions overview
  await expect(page.getByText('Position 1')).toBeVisible();
  await expect(page.getByText('100 MKR')).toBeVisible();
  await expect(page.getByText('38,000 USDS')).toBeVisible();

  // Migrate about
  await page.getByRole('button', { name: 'Migrate Position' }).click();

  await expect(page.getByTestId('migrate-from-card').getByText('Seal Position 1')).toBeVisible();
  await expect(page.getByTestId('migrate-to-card').getByText('Open new Staking position')).toBeVisible();

  await page.getByRole('checkbox').click();
  await page.getByTestId('widget-button').first().click();

  // select rewards
  await expect(page.getByText('Choose your reward token')).toBeVisible();
  await page.getByRole('button', { name: 'USDS' }).click();
  await expect(page.getByTestId('widget-button').first()).toBeEnabled();
  await page.getByTestId('widget-button').first().click();

  // select delegate
  await expect(page.getByText('Choose your delegate')).toBeVisible();
  await page.getByRole('button', { name: '0x8779' }).click();
  await expect(page.getByTestId('widget-button').first()).toBeEnabled();
  await page.getByTestId('widget-button').first().click();

  // position summary
  await expect(page.getByTestId('position-summary-card').getByText('Collateral to migrate')).toBeVisible();
  await expect(page.getByTestId('position-summary-card').getByText('100 MKR')).toBeVisible();
  await expect(page.getByTestId('position-summary-card').getByText('Debt to migrate')).toBeVisible();
  await expect(page.getByTestId('position-summary-card').getByText('38,000 USDS')).toBeVisible();
  await expect(page.getByTestId('position-summary-card').getByText('Stake reward')).toBeVisible();

  // Open staking position
  await approveOrPerformAction(page, 'Submit');
  expect(page.getByText('Your staking position is now active. Next, start migration.')).toBeVisible();

  // Approve migration contract
  await page.getByTestId('widget-button').first().click();
  expect(page.getByRole('heading', { name: 'Migration contract approved' })).toBeVisible({ timeout: 10000 });

  // Execute migration
  await approveOrPerformAction(page, 'Migrate');

  await expect(page.getByText('Test string to stop flow')).toBeVisible({ timeout: 15000 });
});
