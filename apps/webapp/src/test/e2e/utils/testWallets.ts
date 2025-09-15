import { getAddress, keccak256, toHex } from 'viem';

// Legacy hardcoded addresses for backward compatibility
export const TEST_WALLET_ADDRESSES: `0x${string}`[] = [
  '0x0944AB0c507A12052A5D766e43bf3a541e45A7Fc',
  '0xb4b115a488fe318d6ecc640bdcf5c2a174c8360a',
  '0xa877a5bb7f56b6ab41810d31e57213955778d3c8',
  '0x83553ca3cbd6a54df133f50bef96b922036e16e1',
  '0xeb20ac98e46b17a2dc2ca1bcc4b8b817a7799c75',
  '0x9ca96a17dc8f9c5c6d8761a452f7974869f8c286',
  '0x30b9f54ba699e3a10c9a733326f73422ba0ed5de',
  '0x96e5ada0e74382196f5b57bc4f012cdcae8949fe',
  '0xbf58ed406fbee2b9c966c47a7da78ff6a291dcc6',
  '0xd42aa67d4a0a7c1b3d390ea899e7b6b9e3715bf1'
] as const;

/**
 * Generate a deterministic address from a seed string
 * Creates valid Ethereum addresses that can be used in tests
 */
function generateDeterministicAddress(seed: string): `0x${string}` {
  // Create a hash from the seed
  const hash = keccak256(toHex(seed));
  // Take last 40 chars (20 bytes) to form an address
  const address = ('0x' + hash.slice(-40)) as `0x${string}`;
  return getAddress(address); // Ensure checksum format
}

/**
 * Get a test wallet address for a specific worker
 * Supports:
 * 1. Custom address via VITE_TEST_ADDRESS_<workerIndex> env var
 * 2. Dynamic generation via VITE_TEST_ADDRESS_SEED env var
 * 3. Falls back to hardcoded addresses
 */
export const getTestWalletAddress = (workerIndex: number): `0x${string}` => {
  // Check for worker-specific custom address
  // const workerSpecificAddress = process.env[`VITE_TEST_ADDRESS_${workerIndex}`] ||
  //                               (typeof window !== 'undefined' && (window as any).__TEST_ADDRESS__);
  // if (workerSpecificAddress) {
  //   try {
  //     return getAddress(workerSpecificAddress) as `0x${string}`;
  //   } catch (e) {
  //     console.error(`Invalid address for worker ${workerIndex}: ${workerSpecificAddress}`);
  //   }
  // }

  // Check for seed-based generation
  const seed = process.env.VITE_TEST_ADDRESS_SEED;
  if (seed) {
    // Generate unique address for each worker using seed + index
    return generateDeterministicAddress(`${seed}-worker-${workerIndex}`);
  }

  // Check if we should generate unlimited addresses
  const generateUnlimited = process.env.VITE_TEST_GENERATE_ADDRESSES === 'true';
  if (generateUnlimited || workerIndex >= TEST_WALLET_ADDRESSES.length) {
    // Generate deterministic address for workers beyond our hardcoded list
    return generateDeterministicAddress(`default-test-wallet-${workerIndex}`);
  }

  // Fall back to hardcoded addresses
  return TEST_WALLET_ADDRESSES[workerIndex];
};

/**
 * Get multiple test addresses (useful for batch operations)
 */
export function getTestAddresses(count: number, baseSeed?: string): `0x${string}`[] {
  const addresses: `0x${string}`[] = [];
  const seed = baseSeed || process.env.VITE_TEST_ADDRESS_SEED || 'test';

  for (let i = 0; i < count; i++) {
    if (baseSeed || process.env.VITE_TEST_ADDRESS_SEED) {
      addresses.push(generateDeterministicAddress(`${seed}-${i}`));
    } else {
      addresses.push(getTestWalletAddress(i));
    }
  }

  return addresses;
}
