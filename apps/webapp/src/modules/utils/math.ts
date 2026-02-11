export function absBigInt(bigint: bigint) {
  if (bigint < 0n) return -bigint;
  else return bigint;
}

/** Resolve token decimals which can be a plain number or a chain-keyed object */
export function resolveDecimals(decimals: number | { [key: number]: number }, chainId: number): number {
  return typeof decimals === 'number' ? decimals : decimals[chainId];
}

/** Scale an amount from its native decimals to a target base decimals (defaults to 18) */
export function scaleToBaseDecimals(amount: bigint, tokenDecimals: number, baseDecimals = 18): bigint {
  if (tokenDecimals === baseDecimals) return amount;
  if (tokenDecimals < baseDecimals) {
    return amount * 10n ** BigInt(baseDecimals - tokenDecimals);
  }
  return amount / 10n ** BigInt(tokenDecimals - baseDecimals);
}
