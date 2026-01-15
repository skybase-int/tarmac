#!/usr/bin/env node

/**
 * Creates a VNet with the NEW fork (cec455a4...) for testing stUSDS provider tests.
 * This fork has the Curve pool properly configured with liquidity.
 */

require('dotenv').config();
const { writeFile } = require('fs/promises');

const NEW_FORK_CONTAINER_ID = 'cec455a4-3a8a-4a93-ac66-fc98fa1a8103';

async function createStUsdsVNet() {
  const apiKey = process.env.TENDERLY_API_KEY;

  if (!apiKey) {
    console.error('❌ TENDERLY_API_KEY not found in environment');
    console.error('Make sure .env file exists with TENDERLY_API_KEY');
    process.exit(1);
  }

  console.log('🔧 Creating VNet with NEW fork (has Curve pool)...');
  console.log(`Fork container: ${NEW_FORK_CONTAINER_ID}`);

  try {
    const response = await fetch(
      'https://api.tenderly.co/api/v1/account/jetstreamgg/project/jetstream/vnets/fork',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Key': apiKey
        },
        body: JSON.stringify({
          vnet_id: NEW_FORK_CONTAINER_ID,
          display_name: 'stusds-local-test'
        })
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to create VNet: ${response.status} ${response.statusText}\n${error}`);
    }

    const data = await response.json();
    const adminRpc = data.rpcs.find(r => r.name === 'Admin RPC');

    if (!adminRpc) {
      throw new Error('Admin RPC not found in response');
    }

    // Save VNet data to tenderlyTestnetData.json
    const vnetData = [
      {
        NETWORK: 'mainnet',
        TENDERLY_TESTNET_ID: data.id,
        TENDERLY_RPC_URL: adminRpc.url
      }
    ];

    await writeFile('./tenderlyTestnetData.json', JSON.stringify(vnetData, null, 2));

    console.log('✅ VNet created successfully!');
    console.log(`   ID: ${data.id}`);
    console.log(`   RPC: ${adminRpc.url}`);
    console.log('   Saved to: tenderlyTestnetData.json');
    console.log('');
    console.log('📝 SAVE THIS FOR CLEANUP:');
    console.log(`   VNet ID: ${data.id}`);
    console.log('');
    console.log('⏳ Wait ~30 seconds for VNet to be ready, then run:');
    console.log('   cd apps/webapp');
    console.log('   pnpm e2e tests/stusds-provider-switching.spec.ts');
    console.log('   pnpm e2e tests/expert-stusds.spec.ts');
    console.log('');
    console.log('🧹 When done, cleanup with:');
    console.log('   curl -X DELETE -H "X-Access-Key: $TENDERLY_API_KEY" \\');
    console.log(`     https://api.tenderly.co/api/v1/account/jetstreamgg/project/jetstream/vnets/${data.id}`);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

createStUsdsVNet();
