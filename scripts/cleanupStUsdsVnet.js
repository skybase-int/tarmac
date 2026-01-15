#!/usr/bin/env node

/**
 * Cleans up the VNet created for stUSDS testing.
 * Reads the VNet ID from tenderlyTestnetData.json and deletes it.
 */

require('dotenv').config();
const { readFile } = require('fs/promises');

async function cleanupVNet() {
  const apiKey = process.env.TENDERLY_API_KEY;

  if (!apiKey) {
    console.error('❌ TENDERLY_API_KEY not found in environment');
    process.exit(1);
  }

  try {
    // Read VNet ID from tenderlyTestnetData.json
    const data = await readFile('./tenderlyTestnetData.json', 'utf-8');
    const vnets = JSON.parse(data);

    if (!vnets || vnets.length === 0) {
      console.log('ℹ️  No VNets found in tenderlyTestnetData.json');
      return;
    }

    const vnetId = vnets[0].TENDERLY_TESTNET_ID;

    console.log(`🧹 Deleting VNet: ${vnetId}...`);

    const response = await fetch(
      `https://api.tenderly.co/api/v1/account/jetstreamgg/project/jetstream/vnets/${vnetId}`,
      {
        method: 'DELETE',
        headers: {
          'X-Access-Key': apiKey
        }
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to delete VNet: ${response.status} ${response.statusText}\n${error}`);
    }

    console.log('✅ VNet deleted successfully!');
    console.log('');
    console.log('💡 Run vnet:fork:ci to recreate the default VNet for other tests');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

cleanupVNet();
