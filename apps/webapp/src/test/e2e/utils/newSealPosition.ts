import {
  getSaDrawCalldata,
  getSaLockMkrCalldata,
  getSaMulticallCalldata,
  getSaOpenCalldata,
  getSaSelectDelegateCalldata,
  getSaSelectRewardContractCalldata
} from '@jetstreamgg/hooks';
import { readFile } from 'fs/promises';
import { parseEther } from 'viem';

export const newSealPosition = async (
  mkrAmount: string,
  usdsAmount: string,
  delegateAddress: `0x${string}`,
  rewardContractAddress: `0x${string}`
) => {
  const file = await readFile('../../tenderlyTestnetData.json', 'utf-8');
  // RPC URL for the Mainnet fork
  const [{ TENDERLY_RPC_URL }] = JSON.parse(file);

  const TEST_WALLET_ADDRESS = '0xFebC63589D8a3bc5CD97E86C174A836c9caa6DEe';
  // Address of the LockStakeEngine (Seal Module) contract in Tenderly
  const SEAL_MODULE_ADDRESS = '0x9581c795dbcaf408e477f6f1908a41be43093122';
  const URN_INDEX = 1n; // Test account already has a URN open
  const MKR_TO_LOCK = parseEther(mkrAmount);
  const USDS_TO_DRAW = parseEther(usdsAmount);

  // Generate calldata for each operation
  const calldataOpen = getSaOpenCalldata({ urnIndex: URN_INDEX });

  const calldataLockMkr = getSaLockMkrCalldata({
    ownerAddress: TEST_WALLET_ADDRESS,
    urnIndex: URN_INDEX,
    amount: MKR_TO_LOCK
  });

  const calldataDrawNst = getSaDrawCalldata({
    ownerAddress: TEST_WALLET_ADDRESS,
    urnIndex: URN_INDEX,
    toAddress: TEST_WALLET_ADDRESS,
    amount: USDS_TO_DRAW
  });

  const calldataSelectRewardContract = getSaSelectRewardContractCalldata({
    ownerAddress: TEST_WALLET_ADDRESS,
    urnIndex: URN_INDEX,
    rewardContractAddress
  });

  const calldataSelectDelegate = getSaSelectDelegateCalldata({
    ownerAddress: TEST_WALLET_ADDRESS,
    urnIndex: URN_INDEX,
    delegateAddress
  });

  // Encode function calls as bytes arrays
  const calldata = [
    calldataOpen,
    calldataLockMkr,
    calldataDrawNst,
    calldataSelectRewardContract,
    calldataSelectDelegate
  ];

  const response = await fetch(TENDERLY_RPC_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 0,
      method: 'eth_sendTransaction',
      params: [
        {
          from: TEST_WALLET_ADDRESS,
          to: SEAL_MODULE_ADDRESS,
          gas: '0x7A1200',
          gasPrice: '0x0',
          value: '0x0',
          data: getSaMulticallCalldata({ calldata })
        }
      ]
    })
  });

  if (!response.ok) {
    throw new Error(`Error creating Seal position: ${response.statusText}`);
  }

  // Mine a block to confirm the transaction
  const blockMineResponse = await fetch(TENDERLY_RPC_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'evm_mine',
      params: []
    })
  });

  if (!blockMineResponse.ok) {
    throw new Error(`Error mining block: ${blockMineResponse.statusText}`);
  }

  console.log('Successfully created new Seal position');
};
