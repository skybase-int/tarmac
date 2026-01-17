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
    // Read VNet IDs from tenderlyTestnetData-stusds.json
    const data = await readFile('./tenderlyTestnetData-stusds.json', 'utf-8');
    const vnets = JSON.parse(data);

    if (!vnets || vnets.length === 0) {
      console.log('ℹ️  No VNets found in tenderlyTestnetData-stusds.json');
      return;
    }

    console.log(`🧹 Deleting ${vnets.length} VNets...`);

    // Delete all VNets
    for (const vnet of vnets) {
      const vnetId = vnet.TENDERLY_TESTNET_ID;
      const network = vnet.NETWORK;

      console.log(`   Deleting ${network} VNet: ${vnetId}...`);

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
        const errorText = await response.text();
        console.warn(`⚠️  Failed to delete ${network}: ${response.status} - ${errorText}`);
      } else {
        console.log(`   ✅ ${network} deleted`);
      }
    }

    console.log('');
    console.log('✅ All stUSDS VNets deleted successfully!');
    console.log('');
    console.log('💡 Note: This only deleted stUSDS VNets (tenderlyTestnetData-stusds.json)');
    console.log('💡 Standard VNets (tenderlyTestnetData.json) are still intact');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

cleanupVNet();
