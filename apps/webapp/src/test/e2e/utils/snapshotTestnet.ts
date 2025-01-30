import { readFile } from 'fs/promises';

type TenderlyTestnetDataFile = {
  TENDERLY_TESTNET_ID: string;
  TENDERLY_RPC_URL: string;
}[];

type EvmSnapshotResponse = {
  id: number;
  jsonrpc: string;
  result: string;
};

type EvmRevertResponse = {
  id: number;
  jsonrpc: string;
  result: boolean;
};

export const evmSnapshot = async (): Promise<string[]> => {
  const file = await readFile('../../tenderlyTestnetData.json', 'utf-8');
  const testnetsData: TenderlyTestnetDataFile = JSON.parse(file);

  const responses = await Promise.all(
    testnetsData.map(async ({ TENDERLY_RPC_URL }: { TENDERLY_RPC_URL: string }) => {
      const res = await fetch(TENDERLY_RPC_URL, {
        method: 'POST',
        headers: {
          accept: '*/*',
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          method: 'evm_snapshot',
          params: [],
          id: 42,
          jsonrpc: '2.0'
        })
      });

      const data: EvmSnapshotResponse = await res.json();
      return data.result;
    })
  );

  return responses;
};

export const evmRevert = async (snapshotIds: string[]): Promise<boolean> => {
  const file = await readFile('../../tenderlyTestnetData.json', 'utf-8');
  const testnetsData: TenderlyTestnetDataFile = JSON.parse(file);

  const responses = await Promise.all(
    testnetsData.map(async ({ TENDERLY_RPC_URL }: { TENDERLY_RPC_URL: string }, index: number) => {
      const res = await fetch(TENDERLY_RPC_URL, {
        method: 'POST',
        headers: {
          accept: '*/*',
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          method: 'evm_revert',
          params: [snapshotIds[index]],
          id: 42,
          jsonrpc: '2.0'
        })
      });

      const data: EvmRevertResponse = await res.json();
      return data.result;
    })
  );

  return responses.every(Boolean);
};
