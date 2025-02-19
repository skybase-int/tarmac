require('dotenv').config();

const { readFile } = require('fs/promises');

const deleteVnets = async () => {
  const file = await readFile('./tenderlyTestnetData.json', 'utf-8');
  const testnetsData = JSON.parse(file);

  const responses = await Promise.all(
    testnetsData.map(({ TENDERLY_TESTNET_ID }: { TENDERLY_TESTNET_ID: string }) =>
      fetch(
        `https://api.tenderly.co/api/v1/account/jetstreamgg/project/jetstream/testnet/container/${TENDERLY_TESTNET_ID}`,
        {
          headers: [['X-Access-Key', `${process.env.TENDERLY_API_KEY}`]],
          method: 'DELETE'
        }
      )
    )
  );

  if (responses.every(res => res.status === 204)) {
    console.log('Virtual Testnet successfully deleted');
  } else {
    console.log('There was an error while deleting the virtual testnet');
  }
};

deleteVnets();
