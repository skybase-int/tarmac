/**
 * Validates that cached VNets and snapshots are still functional
 * Returns true if VNets are healthy, false if they need to be recreated
 */

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getRpcUrlFromFile } from './utils/getRpcUrlFromFile';
import { NetworkName } from './utils/constants';
import { getTestAddresses } from './utils/testWallets';
import { formatUnits } from 'viem';
import { usdsAddress, usdcAddress, mkrAddress, usdsL2Address, usdcL2Address } from '@jetstreamgg/sky-hooks';
import { TENDERLY_CHAIN_ID } from '@/data/wagmi/config/testTenderlyChain';
import { base, arbitrum, optimism, unichain } from 'viem/chains';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ValidationResult {
  network: NetworkName;
  healthy: boolean;
  errors: string[];
}

/**
 * Get balance of an account (ETH or ERC20)
 */
async function getBalance(rpcUrl: string, address: string, tokenAddress?: string): Promise<bigint> {
  try {
    let result;

    if (!tokenAddress) {
      // Get ETH balance
      const response = await fetch(rpcUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: 1,
          jsonrpc: '2.0',
          method: 'eth_getBalance',
          params: [address, 'latest']
        })
      });
      result = await response.json();
    } else {
      // Get ERC20 balance using balanceOf call
      const balanceOfData = '0x70a08231' + address.slice(2).padStart(64, '0');
      const response = await fetch(rpcUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: 1,
          jsonrpc: '2.0',
          method: 'eth_call',
          params: [
            {
              to: tokenAddress,
              data: balanceOfData
            },
            'latest'
          ]
        })
      });
      result = await response.json();
    }

    if (result.error) {
      throw new Error(result.error.message);
    }

    return BigInt(result.result || '0x0');
  } catch (error) {
    throw new Error(`Failed to get balance: ${(error as Error).message}`);
  }
}

/**
 * Test if we can revert to a snapshot
 */
async function testSnapshotRevert(
  rpcUrl: string,
  network: NetworkName,
  snapshotId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(rpcUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: 1,
        jsonrpc: '2.0',
        method: 'evm_revert',
        params: [snapshotId]
      })
    });

    const result = await response.json();
    if (result.error) {
      return { success: false, error: result.error.message };
    }

    // After revert, create a new snapshot to restore the state
    const snapshotResponse = await fetch(rpcUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: 1,
        jsonrpc: '2.0',
        method: 'evm_snapshot',
        params: []
      })
    });

    const snapshotResult = await snapshotResponse.json();
    if (snapshotResult.error) {
      return { success: false, error: 'Revert succeeded but failed to recreate snapshot' };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

/**
 * Get L2 chain ID for a network
 */
function getL2ChainId(network: NetworkName): number | null {
  switch (network) {
    case NetworkName.base:
      return base.id;
    case NetworkName.arbitrum:
      return arbitrum.id;
    case NetworkName.optimism:
      return optimism.id;
    case NetworkName.unichain:
      return unichain.id;
    default:
      return null;
  }
}

/**
 * Validate accounts have expected balances after snapshot revert
 */
async function validateAccountBalances(
  network: NetworkName,
  rpcUrl: string,
  testAddress: string
): Promise<{ valid: boolean; errors: string[] }> {
  const errors: string[] = [];

  try {
    // Check ETH balance (should be ~100 ETH)
    const ethBalance = await getBalance(rpcUrl, testAddress);
    const ethAmount = parseFloat(formatUnits(ethBalance, 18));

    if (ethAmount < 10) {
      errors.push(`ETH balance too low: ${ethAmount.toFixed(2)} ETH (expected >= 10)`);
    }

    // Check token balances based on network
    if (network === NetworkName.mainnet) {
      // Mainnet tokens
      const tokenChecks = [
        { address: usdsAddress[TENDERLY_CHAIN_ID], name: 'USDS', decimals: 18, minAmount: 100 },
        { address: usdcAddress[TENDERLY_CHAIN_ID], name: 'USDC', decimals: 6, minAmount: 100 },
        { address: mkrAddress[TENDERLY_CHAIN_ID], name: 'MKR', decimals: 18, minAmount: 10 }
      ];

      for (const token of tokenChecks) {
        if (!token.address) continue;
        try {
          const balance = await getBalance(rpcUrl, testAddress, token.address);
          const amount = parseFloat(formatUnits(balance, token.decimals));

          if (amount < token.minAmount) {
            errors.push(
              `${token.name} balance too low: ${amount.toFixed(2)} (expected >= ${token.minAmount})`
            );
          }
        } catch (error) {
          errors.push(`Failed to check ${token.name} balance: ${(error as Error).message}`);
        }
      }
    } else {
      // L2 tokens
      const chainId = getL2ChainId(network);
      if (chainId) {
        const l2TokenChecks = [
          {
            address: usdsL2Address[chainId as keyof typeof usdsL2Address],
            name: 'USDS',
            decimals: 18,
            minAmount: 1000
          },
          {
            address: usdcL2Address[chainId as keyof typeof usdcL2Address],
            name: 'USDC',
            decimals: 6,
            minAmount: 1000
          }
        ];

        for (const token of l2TokenChecks) {
          if (!token.address) continue;
          try {
            const balance = await getBalance(rpcUrl, testAddress, token.address);
            const amount = parseFloat(formatUnits(balance, token.decimals));

            if (amount < token.minAmount) {
              errors.push(
                `${token.name} balance too low: ${amount.toFixed(2)} (expected >= ${token.minAmount})`
              );
            }
          } catch (error) {
            errors.push(`Failed to check ${token.name} balance: ${(error as Error).message}`);
          }
        }
      }
    }
  } catch (error) {
    errors.push(`Failed to validate balances: ${(error as Error).message}`);
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Validate a single VNet
 */
async function validateVnet(network: NetworkName, snapshotId?: string): Promise<ValidationResult> {
  const errors: string[] = [];

  try {
    // 1. Check if VNet RPC is accessible
    const rpcUrl = await getRpcUrlFromFile(network);

    // Test RPC connectivity with a simple call
    try {
      const response = await fetch(rpcUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: 1,
          jsonrpc: '2.0',
          method: 'eth_blockNumber',
          params: []
        })
      });

      const result = await response.json();
      if (result.error) {
        errors.push(`RPC error: ${result.error.message}`);
        return { network, healthy: false, errors };
      }
    } catch (error) {
      errors.push(`RPC not accessible: ${(error as Error).message}`);
      return { network, healthy: false, errors };
    }

    // 2. If snapshot exists, test reverting to it
    if (snapshotId) {
      const revertResult = await testSnapshotRevert(rpcUrl, network, snapshotId);
      if (!revertResult.success) {
        errors.push(`Snapshot revert failed: ${revertResult.error}`);
        return { network, healthy: false, errors };
      }
    }

    // 3. Validate account balances (check first test account)
    const testAddresses = getTestAddresses(1);
    const balanceValidation = await validateAccountBalances(network, rpcUrl, testAddresses[0]);

    if (!balanceValidation.valid) {
      errors.push(...balanceValidation.errors);
      return { network, healthy: false, errors };
    }

    return { network, healthy: true, errors: [] };
  } catch (error) {
    errors.push(`Validation failed: ${(error as Error).message}`);
    return { network, healthy: false, errors };
  }
}

/**
 * Main validation function
 */
export async function validateVnets(): Promise<{
  healthy: boolean;
  results: ValidationResult[];
}> {
  console.log('🔍 Validating cached VNets and snapshots...\n');

  // Load snapshot IDs if they exist
  const snapshotFile = path.join(__dirname, 'persistent-vnet-snapshots.json');
  let snapshots: Record<string, string> = {};

  try {
    const snapshotData = await fs.readFile(snapshotFile, 'utf-8');
    snapshots = JSON.parse(snapshotData);
    console.log('Found snapshot file with snapshots for:', Object.keys(snapshots).join(', '));
  } catch {
    console.log('⚠️  No snapshot file found - validation will check VNets without snapshots');
  }

  // Determine which networks to validate
  const targetNetworks = process.env.FUND_NETWORKS || process.env.TEST_NETWORKS;
  let networks: NetworkName[];

  if (targetNetworks) {
    const requestedNetworks = targetNetworks.split(',').map(n => n.trim().toLowerCase());
    networks = requestedNetworks
      .map(n => {
        switch (n) {
          case 'mainnet':
            return NetworkName.mainnet;
          case 'base':
            return NetworkName.base;
          case 'arbitrum':
            return NetworkName.arbitrum;
          case 'optimism':
            return NetworkName.optimism;
          case 'unichain':
            return NetworkName.unichain;
          default:
            return null;
        }
      })
      .filter(n => n !== null) as NetworkName[];
  } else {
    networks = [
      NetworkName.mainnet,
      NetworkName.base,
      NetworkName.arbitrum,
      NetworkName.optimism,
      NetworkName.unichain
    ];
  }

  // Validate each network
  const results: ValidationResult[] = [];
  for (const network of networks) {
    console.log(`Validating ${network}...`);
    const result = await validateVnet(network, snapshots[network]);

    if (result.healthy) {
      console.log(`  ✅ ${network} is healthy`);
    } else {
      console.log(`  ❌ ${network} validation failed:`);
      result.errors.forEach(error => console.log(`     - ${error}`));
    }

    results.push(result);
  }

  const allHealthy = results.every(r => r.healthy);

  console.log('\n' + '='.repeat(60));
  if (allHealthy) {
    console.log('✅ All VNets are healthy - using cached VNets and snapshots');
  } else {
    console.log('❌ Some VNets are unhealthy - need to recreate VNets');
    console.log('\nUnhealthy networks:');
    results
      .filter(r => !r.healthy)
      .forEach(r => {
        console.log(`  - ${r.network}:`);
        r.errors.forEach(e => console.log(`    • ${e}`));
      });
  }
  console.log('='.repeat(60) + '\n');

  return { healthy: allHealthy, results };
}

// Run validation if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  validateVnets()
    .then(result => {
      process.exit(result.healthy ? 0 : 1);
    })
    .catch(error => {
      console.error('Validation error:', error);
      process.exit(1);
    });
}
