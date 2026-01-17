#!/usr/bin/env node

/**
 * Creates VNets with the NEW mainnet fork (cec455a4...) for testing stUSDS provider tests.
 * This mainnet fork has the Curve pool properly configured with liquidity.
 * Output: tenderlyTestnetData-stusds.json
 */

require('dotenv').config();
const { writeFile } = require('fs/promises');

const NEW_MAINNET_FORK_CONTAINER_ID = 'cec455a4-3a8a-4a93-ac66-fc98fa1a8103';

const NETWORK_CONFIGS = {
  base: { chainId: 8453, forkBlock: '31758878' },
  arbitrum: { chainId: 42161, forkBlock: '343221023' },
  optimism: { chainId: 10, forkBlock: '136644925' },
  unichain: { chainId: 130, forkBlock: '18140271' }
};

async function createStUsdsVNet() {
  const apiKey = process.env.TENDERLY_API_KEY;

  if (!apiKey) {
    console.error('❌ TENDERLY_API_KEY not found in environment');
    console.error('Make sure .env file exists with TENDERLY_API_KEY');
    process.exit(1);
  }

  console.log('🔧 Creating VNets for all networks...');
  console.log('   - Mainnet: NEW fork (has Curve pool)');
  console.log('   - Base, Arbitrum, Optimism, Unichain: Standard forks');
  console.log('');

  try {
    const currentTime = Date.now();
    const vnetData = [];

    // Create mainnet with NEW fork (has Curve pool)
    console.log('Creating mainnet VNet...');
    const mainnetResponse = await fetch(
      'https://api.tenderly.co/api/v1/account/jetstreamgg/project/jetstream/vnets/fork',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Key': apiKey
        },
        body: JSON.stringify({
          vnet_id: NEW_MAINNET_FORK_CONTAINER_ID,
          display_name: 'stusds-local-test-mainnet'
        })
      }
    );

    if (!mainnetResponse.ok) {
      const error = await mainnetResponse.text();
      throw new Error(`Failed to create mainnet VNet: ${mainnetResponse.status}\n${error}`);
    }

    const mainnetData = await mainnetResponse.json();
    const mainnetRpc = mainnetData.rpcs.find(r => r.name === 'Admin RPC');

    vnetData.push({
      NETWORK: 'mainnet',
      TENDERLY_TESTNET_ID: mainnetData.id,
      TENDERLY_RPC_URL: mainnetRpc.url
    });
    console.log(`✅ Mainnet: ${mainnetData.id}`);

    // Create other networks
    for (const [network, config] of Object.entries(NETWORK_CONFIGS)) {
      console.log(`Creating ${network} VNet...`);

      const response = await fetch(
        'https://api.tenderly.co/api/v1/account/jetstreamgg/project/jetstream/vnets',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Access-Key': apiKey
          },
          body: JSON.stringify({
            slug: `stusds-test-${config.chainId}-${currentTime}`,
            display_name: `stusds-local-test-${network}`,
            fork_config: {
              network_id: config.chainId,
              block_number: config.forkBlock
            },
            virtual_network_config: {
              chain_config: {
                chain_id: config.chainId
              }
            }
          })
        }
      );

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Failed to create ${network} VNet: ${response.status}\n${error}`);
      }

      const data = await response.json();
      const rpc = data.rpcs.find(r => r.name === 'Admin RPC');

      vnetData.push({
        NETWORK: network,
        TENDERLY_TESTNET_ID: data.id,
        TENDERLY_RPC_URL: rpc.url
      });
      console.log(`✅ ${network}: ${data.id}`);
    }

    await writeFile('./tenderlyTestnetData-stusds.json', JSON.stringify(vnetData, null, 2));

    console.log('');
    console.log('✅ All VNets created successfully!');
    console.log('   Saved to: tenderlyTestnetData-stusds.json');
    console.log('');
    console.log('💰 Now fund the VNets and create snapshots:');
    console.log('   pnpm vnet:stusds:fund');
    console.log('');
    console.log('🧪 Then run the stUSDS tests:');
    console.log('   pnpm e2e:parallel:stusds');
    console.log('');
    console.log('🧹 When done, cleanup with:');
    console.log('   pnpm vnet:stusds:delete');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

createStUsdsVNet();
