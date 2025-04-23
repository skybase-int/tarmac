// Test wallet addresses for parallel workers
// derived from eth_accounts response from tenderly
export const TEST_WALLET_ADDRESSES: `0x${string}`[] = [
  '0xfebc63589d8a3bc5cd97e86c174a836c9caa6dee',
  '0xb02af5a8ea5edaf6587089553d1a31b996c17cab',
  '0xa3003742596353f3750ff36d5035204462cec237',
  '0xa9a23ef3ef9c478fc84dc0f800674cc3f0a39c16',
  '0x39baa1037a468ec2a8755f61025bffd3facbfb39',
  '0x669ec0b937ec1fc991bc36f5feb64417bfdd330f',
  '0x4bba174200152acfcd1d0b22a077c6f48d3a84cd',
  '0xed3d28a40830d66fbbbd63869d732a9c7a1a55c3',
  '0xcaf0e9c5259d665f903965e495466926f090676b',
  '0xcb4630402c44303612780ffadf7108d8abb6b0d2'
] as const;

export const getTestWalletAddress = (workerIndex: number): `0x${string}` => {
  return TEST_WALLET_ADDRESSES[workerIndex];
};
