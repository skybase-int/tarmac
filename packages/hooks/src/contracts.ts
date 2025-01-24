import { mainnet, sepolia, base } from 'wagmi/chains';
import { TENDERLY_BASE_CHAIN_ID, TENDERLY_CHAIN_ID } from './constants';

type ChainId = typeof mainnet.id | typeof TENDERLY_CHAIN_ID;
type BaseChainId = typeof base.id | typeof TENDERLY_BASE_CHAIN_ID;

export const contracts: { name: string; address: Record<ChainId, `0x${string}`> }[] = [
  // Savings module
  {
    name: 'mcdPot',
    address: {
      [mainnet.id]: '0x197E90f9FAD81970bA7976f33CbD77088E5D7cf7',
      [TENDERLY_CHAIN_ID]: '0x197E90f9FAD81970bA7976f33CbD77088E5D7cf7'
    }
  },

  // Maker protocol tokens
  {
    name: 'mcdDai',
    address: {
      [mainnet.id]: '0x6b175474e89094c44da98b954eedeac495271d0f',
      [TENDERLY_CHAIN_ID]: '0x6b175474e89094c44da98b954eedeac495271d0f'
    }
  },
  {
    name: 'mkr',
    address: {
      [mainnet.id]: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
      [TENDERLY_CHAIN_ID]: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2'
    }
  },

  // Other tokens
  {
    name: 'weth',
    address: {
      [mainnet.id]: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      [TENDERLY_CHAIN_ID]: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
    }
  },
  {
    name: 'usdc',
    address: {
      [mainnet.id]: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      [TENDERLY_CHAIN_ID]: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
    }
  },
  {
    name: 'usdt',
    address: {
      [mainnet.id]: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      [TENDERLY_CHAIN_ID]: '0xdAC17F958D2ee523a2206206994597C13D831ec7'
    }
  },

  // Proxy
  {
    name: 'dsProxy',
    address: {
      // Just an example address used to pull the proxy ABI, not to be used for anything else.
      [mainnet.id]: '0x7Ac6E2b9ea61e2E587A06e083E4373918071dCfc',
      [TENDERLY_CHAIN_ID]: '0x7Ac6E2b9ea61e2E587A06e083E4373918071dCfc'
    }
  },
  {
    name: 'proxyActions',
    address: {
      [mainnet.id]: '0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038',
      [TENDERLY_CHAIN_ID]: '0x82ecd135dce65fbc6dbdd0e4237e0af93ffd5038'
    }
  },
  {
    name: 'proxyRegistry',
    address: {
      [mainnet.id]: '0x4678f0a6958e4D2Bc4F1BAF7Bc52E8F3564f3fE4',
      [TENDERLY_CHAIN_ID]: '0x4678f0a6958e4D2Bc4F1BAF7Bc52E8F3564f3fE4'
    }
  },

  //Maker protocol
  {
    name: 'mcdVat',
    address: {
      [mainnet.id]: '0x35d1b3f3d7966a1dfe207aa4514c12a259a0492b',
      [TENDERLY_CHAIN_ID]: '0x35d1b3f3d7966a1dfe207aa4514c12a259a0492b'
    }
  },
  {
    name: 'mcdSpot',
    address: {
      [mainnet.id]: '0x65c79fcb50ca1594b025960e539ed7a9a6d434a3',
      [TENDERLY_CHAIN_ID]: '0x65c79fcb50ca1594b025960e539ed7a9a6d434a3'
    }
  },
  {
    name: 'mcdJug',
    address: {
      [mainnet.id]: '0x19c0976f590d67707e62397c87829d896dc0f1f1',
      [TENDERLY_CHAIN_ID]: '0x19c0976f590d67707e62397c87829d896dc0f1f1'
    }
  },
  {
    name: 'ethFlow',
    address: {
      [mainnet.id]: '0x40A50cf069e992AA4536211B23F286eF88752187',
      [TENDERLY_CHAIN_ID]: '0x40A50cf069e992AA4536211B23F286eF88752187'
    }
  },
  // new Sky contracts
  // Upgrade module
  {
    name: 'daiUsds',
    address: {
      [mainnet.id]: '0x3225737a9Bbb6473CB4a45b7244ACa2BeFdB276A',
      [TENDERLY_CHAIN_ID]: '0x3225737a9Bbb6473CB4a45b7244ACa2BeFdB276A'
    }
  },
  {
    name: 'mkrSky',
    address: {
      [mainnet.id]: '0xBDcFCA946b6CDd965f99a839e4435Bcdc1bc470B',
      [TENDERLY_CHAIN_ID]: '0xBDcFCA946b6CDd965f99a839e4435Bcdc1bc470B'
    }
  },
  // Savings module
  {
    name: 'sUsds',
    address: {
      [mainnet.id]: '0xa3931d71877C0E7a3148CB7Eb4463524FEc27fbD',
      [TENDERLY_CHAIN_ID]: '0xa3931d71877C0E7a3148CB7Eb4463524FEc27fbD'
    }
  },
  {
    name: 'sUsdsImplementation',
    address: {
      [mainnet.id]: '0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0',
      [TENDERLY_CHAIN_ID]: '0x4e7991e5C547ce825BdEb665EE14a3274f9F61e0'
    }
  },
  // Rewards module
  {
    name: 'usdsSkyReward',
    address: {
      [mainnet.id]: '0x0650CAF159C5A49f711e8169D4336ECB9b950275',
      [TENDERLY_CHAIN_ID]: '0x0650CAF159C5A49f711e8169D4336ECB9b950275'
    }
  },
  {
    name: 'cleReward',
    address: {
      [mainnet.id]: '0x10ab606B067C9C461d8893c47C7512472E19e2Ce',
      [TENDERLY_CHAIN_ID]: '0x10ab606B067C9C461d8893c47C7512472E19e2Ce'
    }
  },
  // Maker protocol tokens
  {
    name: 'usds',
    address: {
      [mainnet.id]: '0xdC035D45d973E3EC169d2276DDab16f1e407384F',
      [TENDERLY_CHAIN_ID]: '0xdC035D45d973E3EC169d2276DDab16f1e407384F'
    }
  },
  {
    name: 'sky',
    address: {
      [mainnet.id]: '0x56072C95FAA701256059aa122697B133aDEd9279',
      [TENDERLY_CHAIN_ID]: '0x56072C95FAA701256059aa122697B133aDEd9279'
    }
  },
  // SealModule
  {
    name: 'sealModule',
    address: {
      [mainnet.id]: '0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12',
      [TENDERLY_CHAIN_ID]: '0x9581c795dbcaf408e477f6f1908a41be43093122'
    }
  },
  // LockstakeMkr
  {
    name: 'lsMkr',
    address: {
      [mainnet.id]: '0xb4e0e45e142101dc3ed768bac219fc35edbed295',
      [TENDERLY_CHAIN_ID]: '0x061fb3749c4ed5e3c2d28a284940093cfdfcba20'
    }
  },
  // Rewards Lockstake MKR
  {
    name: 'lsMkrUsdsReward',
    address: {
      [mainnet.id]: '0x92282235a39be957ff1f37619fd22a9ae5507cb1',
      [TENDERLY_CHAIN_ID]: '0xe58cbe144dd5556c84874dec1b3f2d0d6ac45f1b'
    }
  },
  // Merkle Distributor
  {
    name: 'merkleDistributor',
    address: {
      [mainnet.id]: '0xca9eF7F3404B23C77A2a0Dee8ab54B3338d35eAe',
      [TENDERLY_CHAIN_ID]: '0x50eCf62440E15289867D777208C105f7Fd431Ff7'
    }
  },
  // CoW Protocol
  {
    name: 'gPv2Settlement',
    address: {
      [mainnet.id]: '0x9008D19f58AAbD9eD0D60971565AA8510560ab41',
      [TENDERLY_CHAIN_ID]: '0x9008D19f58AAbD9eD0D60971565AA8510560ab41'
    }
  }
];

export const tenderlyContracts: { name: string; address: Record<typeof TENDERLY_CHAIN_ID, `0x${string}`> }[] =
  [
    {
      name: 'cle',
      address: {
        // same token as USDS for now
        [TENDERLY_CHAIN_ID]: '0xdC035D45d973E3EC169d2276DDab16f1e407384F'
      }
    }
  ];

export const sepoliaContracts: { name: string; address: Record<typeof sepolia.id, `0x${string}`> }[] = [
  {
    name: 'wethSepolia',
    address: {
      [sepolia.id]: '0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14'
    }
  },
  {
    name: 'mcdDaiSepolia',
    address: {
      [sepolia.id]: '0xB4F1737Af37711e9A5890D9510c9bB60e170CB0D'
    }
  },
  {
    name: 'usdcSepolia',
    address: {
      [sepolia.id]: '0xbe72E441BF55620febc26715db68d3494213D8Cb'
    }
  },
  {
    name: 'usdtSepolia',
    address: {
      [sepolia.id]: '0x58Eb19eF91e8A6327FEd391b51aE1887b833cc91'
    }
  },
  {
    name: 'ethFlowSepolia',
    address: {
      [sepolia.id]: '0x0b7795E18767259CC253a2dF471db34c72B49516'
    }
  },
  // CoW Protocol
  {
    name: 'gPv2SettlementSepolia',
    address: {
      [sepolia.id]: '0x9008D19f58AAbD9eD0D60971565AA8510560ab41'
    }
  }
];

export const baseContracts: { name: string; address: Record<BaseChainId, `0x${string}`> }[] = [
  {
    name: 'usdcBase',
    address: {
      [base.id]: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
      [TENDERLY_BASE_CHAIN_ID]: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913'
    }
  },
  {
    name: 'usdsBase',
    address: {
      [base.id]: '0x820C137fa70C8691f0e44Dc420a5e53c168921Dc',
      [TENDERLY_BASE_CHAIN_ID]: '0x820C137fa70C8691f0e44Dc420a5e53c168921Dc'
    }
  },
  {
    name: 'sUsdsBase',
    address: {
      [base.id]: '0x5875eEE11Cf8398102FdAd704C9E96607675467a',
      [TENDERLY_BASE_CHAIN_ID]: '0x5875eEE11Cf8398102FdAd704C9E96607675467a'
    }
  },
  {
    name: 'skyBase',
    address: {
      [base.id]: '0x60e3c701e65DEE30c23c9Fb78c3866479cc0944a',
      [TENDERLY_BASE_CHAIN_ID]: '0x60e3c701e65DEE30c23c9Fb78c3866479cc0944a'
    }
  },
  {
    name: 'psm3Base',
    address: {
      [base.id]: '0x1601843c5E9bC251A3272907010AFa41Fa18347E',
      [TENDERLY_BASE_CHAIN_ID]: '0x1601843c5E9bC251A3272907010AFa41Fa18347E'
    }
  },
  {
    name: 'ssrAuthOracle',
    address: {
      [base.id]: '0x65d946e533748A998B1f0E430803e39A6388f7a1',
      [TENDERLY_BASE_CHAIN_ID]: '0x65d946e533748A998B1f0E430803e39A6388f7a1'
    }
  }
];
