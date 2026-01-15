# stUSDS Supply Cap Testing on Tenderly

This document explains how to manipulate the stUSDS supply cap on Tenderly to test both native and Curve provider scenarios.

## Overview

The stUSDS module has a supply cap that limits how much USDS can be deposited. When the cap is reached:
- **Native provider** becomes unavailable for deposits
- **Curve provider** automatically takes over as fallback

By manipulating the cap on Tenderly, you can test both scenarios.

## Utilities

Located in: `/apps/webapp/src/test/e2e/utils/setStUsdsSupplyCap.ts`

### Core Functions

#### `setStUsdsSupplyCap(capAmount: string, network?)`
Sets the supply cap to a specific amount.

```typescript
await setStUsdsSupplyCap('100000000', NetworkName.mainnet); // 100M USDS cap
```

#### `getStUsdsSupplyCap(network?)`
Gets the current supply cap.

```typescript
const cap = await getStUsdsSupplyCap();
console.log(`Current cap: ${formatUnits(cap, 18)} USDS`);
```

### Convenience Functions

#### `enableNativeProvider(network?)`
Sets a very high cap (1B USDS) to enable native provider testing.

```typescript
await enableNativeProvider(); // Sets 1B USDS cap
// Now native provider should be available
```

#### `forceCurveProvider(network?)`
Sets cap to current supply to force "supply cap reached" scenario.

```typescript
await forceCurveProvider(); // Cap = current supply
// Now Curve provider will be used
```

## Usage in Tests

See: `/apps/webapp/src/test/e2e/tests/stusds-provider-switching.spec.ts`

### Example 1: Test Native Provider

```typescript
test('Native provider works', async ({ isolatedPage }) => {
  // Enable native provider by setting high cap
  await enableNativeProvider();
  
  // Navigate to stUSDS
  await isolatedPage.goto('/');
  await connectMockWalletAndAcceptTerms(isolatedPage);
  await isolatedPage.getByRole('tab', { name: 'Expert' }).click();
  await isolatedPage.getByTestId('stusds-stats-card').click();
  
  // Make a deposit
  await isolatedPage.getByTestId('supply-input-stusds').fill('10');
  await isolatedPage.getByRole('checkbox').click();
  await performAction(isolatedPage, 'Supply');
  
  // Should succeed via native or Curve (Curve might have better rate)
  const success = isolatedPage.getByText(/supplied|swapped/);
  await expect(success).toBeVisible();
});
```

### Example 2: Test Curve Provider

```typescript
test('Curve provider when cap reached', async ({ isolatedPage }) => {
  // Force Curve by setting cap = current supply
  await forceCurveProvider();
  
  // Navigate to stUSDS
  await isolatedPage.goto('/');
  await connectMockWalletAndAcceptTerms(isolatedPage);
  await isolatedPage.getByRole('tab', { name: 'Expert' }).click();
  await isolatedPage.getByTestId('stusds-stats-card').click();
  
  // Make a deposit
  await isolatedPage.getByTestId('supply-input-stusds').fill('10');
  
  // Should show Curve indicator
  const curveIndicator = isolatedPage.getByText(/Using Curve pool/);
  await expect(curveIndicator).toBeVisible();
  
  // Should show reason
  const reason = isolatedPage.getByText(/supply cap reached/i);
  await expect(reason).toBeVisible();
});
```

### Example 3: Switch Between Providers

```typescript
test('Switch providers', async ({ isolatedPage }) => {
  // Start with native
  await enableNativeProvider();
  // ... make a deposit ...
  
  // Switch to Curve
  await forceCurveProvider();
  await isolatedPage.reload(); // Refresh to pick up new cap
  // ... make another deposit (should use Curve) ...
});
```

## How It Works

### Admin Impersonation

The utilities use Tenderly's account impersonation to call the contract's `file()` admin function:

```typescript
// Impersonate the Maker pause proxy (has admin rights)
const adminAddress = '0xBE8E3e3618f7474F8cB1d074A26afFef007E98FB';

// Encode file(bytes32 "cap", uint256 newCapValue) call
const calldata = encodeFunctionData({
  abi: [/* file function ABI */],
  functionName: 'file',
  args: [keccak256(toBytes('cap')), newCapValue]
});

// Send transaction from impersonated admin
await fetch(rpcUrl, {
  method: 'POST',
  body: JSON.stringify({
    method: 'eth_sendTransaction',
    params: [{
      from: adminAddress,
      to: stUsdsAddress,
      data: calldata
    }],
    jsonrpc: '2.0'
  })
});
```

### Contract Details

- **Contract**: stUSDS
- **Address**: `0x99CD4Ec3f88A45940936F469E4bB72A2A701EEB9`
- **Admin Address**: `0xBE8E3e3618f7474F8cB1d074A26afFef007E98FB` (Maker pause proxy)
- **Admin Function**: `file(bytes32 what, uint256 data)` - Used to set parameters
- **Network**: Mainnet / Tenderly mainnet fork

## Tips

1. **After changing cap**: Wait ~2 seconds for the UI to re-fetch data and update provider selection
2. **Page refresh**: Sometimes helpful after cap changes to ensure clean state
3. **Check console logs**: The utilities log helpful debug info
4. **Both providers valid**: Even with high cap, Curve might be selected if it has better rates (>10bps difference)

## Troubleshooting

### "Curve still being used despite high cap"
This is **expected behavior**. The provider selection logic prefers whichever provider has better rates. If Curve has a >10bps advantage, it will be selected even when native is available.

### "Cap not taking effect"
Try refreshing the page after changing the cap. The UI caches contract data and needs to refetch.

### "Permission denied errors"
The utility uses the Maker pause proxy address (`0xBE8E3e3618f7474F8cB1d074A26afFef007E98FB`) which has admin rights. On Tenderly, any address can send transactions (impersonation), so this should work automatically.

## Manual Testing

You can also use these utilities manually in the browser console:

1. Open DevTools console
2. Run:
```javascript
// Enable native provider
await enableNativeProvider()

// Or force Curve
await forceCurveProvider()

// Check current cap
const cap = await getStUsdsSupplyCap()
console.log('Current cap:', cap.toString())
```
