/**
 * Calculate the total liquidity buffer to account for both yield accrual
 * and stability fee accrual on staking engine debt
 * @param currentTotalAssets - Current total assets in the vault
 * @param ysr - Yield savings rate from the contract
 * @param stakingEngineDebt - Current staking engine debt
 * @param stabilityFeeRate - Stability fee rate for the staking engine
 * @param bufferMinutes - Time buffer in minutes (default 30)
 * @returns The total buffer amount to subtract from max withdrawal
 */
export function calculateLiquidityBuffer(
  currentTotalAssets: bigint, // scaled by 1e18, wei
  ysr: bigint, // scaled by 1e27, 1 + per second rate
  stakingEngineDebt: bigint, // scaled by 1e18, wei
  stabilityFeeRate: bigint, // scaled by 1e27, annual rate
  bufferMinutes: number = 30 //30 minutes
): bigint {
  if (bufferMinutes <= 0) {
    return 0n;
  }

  const secondsInBuffer = BigInt(bufferMinutes * 60);
  const yearlySeconds = 365n * 24n * 60n * 60n;
  const BASE_RATE = 10n ** 27n;

  // Calculate yield accrual on total assets
  let yieldAccrual = 0n;
  if (currentTotalAssets > 0n && ysr > BASE_RATE) {
    // ysr is (1 + per_second_rate), so subtract 1 to get actual rate
    const actualYieldRate = ysr - BASE_RATE;
    // Apply rate for buffer period: assets * rate * time
    yieldAccrual = (currentTotalAssets * actualYieldRate * secondsInBuffer) / BASE_RATE;
  }

  // Calculate debt accrual on staking engine debt
  let debtAccrual = 0n;
  if (stakingEngineDebt > 0n && stabilityFeeRate > 0n) {
    // Convert annual rate to buffer period: debt * annual_rate * (buffer_time / year_time)
    debtAccrual =
      (stakingEngineDebt * stabilityFeeRate * secondsInBuffer * 10n ** 9n) / (yearlySeconds * BASE_RATE);
  }

  console.log('yieldAccrual', yieldAccrual);
  console.log('debtAccrual', debtAccrual);
  console.log('debtAccrual - yieldAccrual / 10^18', (debtAccrual - yieldAccrual) / 10n ** 18n);

  // Return net buffer (debt growth minus yield growth)
  return debtAccrual > yieldAccrual ? debtAccrual - yieldAccrual : 0n;
}
