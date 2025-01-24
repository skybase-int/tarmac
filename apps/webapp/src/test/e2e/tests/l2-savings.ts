import { test } from '@playwright/test';
import '../mock-rpc-call.ts';
import '../mock-vpn-check.ts';
import { setErc20Balance, setEthBalance } from '../utils/setBalance.ts';
import { usdcL2Address, usdsL2Address } from '@jetstreamgg/hooks';
import { connectMockWalletAndAcceptTerms } from '../utils/connectMockWalletAndAcceptTerms.ts';
import { switchToL2 } from '../utils/switchToL2.ts';
import { expect } from '@playwright/test';
import { approveOrPerformAction } from '../utils/approveOrPerformAction.ts';
import { NetworkName } from '../utils/constants.ts';
import { TENDERLY_BASE_CHAIN_ID, TENDERLY_ARBITRUM_CHAIN_ID } from '@/data/wagmi/config/testTenderlyChain.ts';

export const runL2SavingsTests = async ({
  networkName,
  chainId
}: {
  networkName: NetworkName;
  chainId: typeof TENDERLY_BASE_CHAIN_ID | typeof TENDERLY_ARBITRUM_CHAIN_ID;
}) => {
  test.beforeAll(async () => {
    await setEthBalance('100', networkName);
    await setErc20Balance(usdsL2Address[chainId], '100', 18, networkName);
    await setErc20Balance(usdcL2Address[chainId], '100', 6, networkName);
  });

  test(`Go to ${networkName} Savings, deposit usds and usdc, withdraw usdc and usds`, async ({ page }) => {
    await page.goto('/');
    await connectMockWalletAndAcceptTerms(page);
    await page.getByRole('tab', { name: 'Savings' }).click();
    await switchToL2(page, networkName);

    await expect(page.getByRole('button', { name: 'Transaction overview' })).not.toBeVisible();

    //supply usds
    await page.getByTestId('l2-savings-supply-input').click();
    await page.getByTestId('l2-savings-supply-input').fill('10');

    await expect(page.getByRole('button', { name: 'Transaction overview' })).toBeVisible();

    await approveOrPerformAction(page, 'Supply');

    await page.getByRole('button', { name: 'Back to Savings' }).click();

    //supply usdc
    await page.getByTestId('undefined-menu-button').click();
    await page.getByRole('button', { name: 'USDC USDC USDC' }).click();

    await page.getByTestId('l2-savings-supply-input').click();
    await page.getByTestId('l2-savings-supply-input').fill('10');

    await expect(page.getByRole('button', { name: 'Transaction overview' })).toBeVisible();

    await approveOrPerformAction(page, 'Supply');

    await page.getByRole('button', { name: 'Back to Savings' }).click();

    await page.getByRole('tab', { name: 'Withdraw' }).click();

    //withdraw usdc
    await page.getByTestId('l2-savings-withdraw-input').click();
    await page.getByTestId('l2-savings-withdraw-input').fill('10');
    await expect(page.getByRole('button', { name: 'Transaction overview' })).toBeVisible();

    await approveOrPerformAction(page, 'Withdraw');

    await page.getByRole('button', { name: 'Back to Savings' }).click();

    //withdraw usds
    await page.getByTestId('undefined-menu-button').click();
    await page.getByRole('button', { name: 'USDS USDS USDS' }).click();

    await page.getByTestId('l2-savings-withdraw-input').click();
    await page.getByTestId('l2-savings-withdraw-input').fill('10');

    await expect(page.getByRole('button', { name: 'Transaction overview' })).toBeVisible();

    await approveOrPerformAction(page, 'Withdraw');

    await page.getByRole('button', { name: 'Back to Savings' }).click();
  });
};
