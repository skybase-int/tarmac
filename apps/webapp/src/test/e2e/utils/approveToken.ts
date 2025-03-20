import { readFile } from 'fs/promises';
import { encodeFunctionData, parseEther } from 'viem';

export const approveToken = async (
  tokenAddress: `0x${string}`,
  spenderAddress: `0x${string}`,
  amount: string,
  abi: any
) => {
  const file = await readFile('../../tenderlyTestnetData.json', 'utf-8');
  // RPC URL for the Mainnet fork
  const [{ TENDERLY_RPC_URL }] = JSON.parse(file);
  const TEST_WALLET_ADDRESS = '0xFebC63589D8a3bc5CD97E86C174A836c9caa6DEe';
  const amountToApprove = parseEther(amount);

  const calldata = encodeFunctionData({
    abi,
    functionName: 'approve',
    args: [spenderAddress, amountToApprove]
  });

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
          to: tokenAddress,
          gas: '0x7A1200',
          gasPrice: '0x0',
          value: '0x0',
          data: calldata
        }
      ]
    })
  });

  if (!response.ok) {
    throw new Error(`Error approving token: ${response.statusText}`);
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

  console.log('Successfully approved token');
};
