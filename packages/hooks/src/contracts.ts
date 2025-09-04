import { mainnet, sepolia, base, arbitrum, optimism, unichain } from 'wagmi/chains';
import { TENDERLY_CHAIN_ID } from './constants';

type ChainId = typeof mainnet.id | typeof TENDERLY_CHAIN_ID;
type L2ChainId = typeof base.id | typeof arbitrum.id | typeof optimism.id | typeof unichain.id;

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
      [mainnet.id]: '0xba3cb449bd2b4adddbc894d8697f5170800eadec',
      [TENDERLY_CHAIN_ID]: '0xba3cb449bd2b4adddbc894d8697f5170800eadec'
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
      [mainnet.id]: '0xA1Ea1bA18E88C381C724a75F23a130420C403f9a',
      [TENDERLY_CHAIN_ID]: '0xA1Ea1bA18E88C381C724a75F23a130420C403f9a'
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
  // stUSDS module
  {
    name: 'stUsds',
    address: {
      [mainnet.id]: '0x6c7df3575f1d69eb3b245a082937794794c2b82e',
      [TENDERLY_CHAIN_ID]: '0x6c7df3575f1d69eb3b245a082937794794c2b82e'
    }
  },
  {
    name: 'stUsdsImplementation',
    address: {
      [mainnet.id]: '0x6c9a2f9a94770336403e69e9ea5d88c97ef3b78a',
      [TENDERLY_CHAIN_ID]: '0x6c9a2f9a94770336403e69e9ea5d88c97ef3b78a'
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
    name: 'usdsSpkReward',
    address: {
      [mainnet.id]: '0x173e314C7635B45322cd8Cb14f44b312e079F3af',
      [TENDERLY_CHAIN_ID]: '0x173e314C7635B45322cd8Cb14f44b312e079F3af'
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
  {
    name: 'spk',
    address: {
      [mainnet.id]: '0xc20059e0317DE91738d13af027DfC4a50781b066',
      [TENDERLY_CHAIN_ID]: '0xc20059e0317DE91738d13af027DfC4a50781b066'
    }
  },
  // SealModule
  {
    name: 'sealModule',
    address: {
      [mainnet.id]: '0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12',
      [TENDERLY_CHAIN_ID]: '0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12'
    }
  },
  // LockstakeMkr
  {
    name: 'lsMkr',
    address: {
      [mainnet.id]: '0xb4e0e45e142101dc3ed768bac219fc35edbed295',
      [TENDERLY_CHAIN_ID]: '0xb4e0e45e142101dc3ed768bac219fc35edbed295'
    }
  },
  // Rewards Lockstake MKR
  {
    name: 'lsMkrUsdsReward',
    address: {
      [mainnet.id]: '0x92282235a39be957ff1f37619fd22a9ae5507cb1',
      [TENDERLY_CHAIN_ID]: '0x92282235a39be957ff1f37619fd22a9ae5507cb1'
    }
  },
  // Merkle Distributor
  {
    name: 'merkleDistributor',
    address: {
      [mainnet.id]: '0xca9eF7F3404B23C77A2a0Dee8ab54B3338d35eAe',
      [TENDERLY_CHAIN_ID]: '0xca9eF7F3404B23C77A2a0Dee8ab54B3338d35eAe'
    }
  },
  // CoW Protocol
  {
    name: 'gPv2Settlement',
    address: {
      [mainnet.id]: '0x9008D19f58AAbD9eD0D60971565AA8510560ab41',
      [TENDERLY_CHAIN_ID]: '0x9008D19f58AAbD9eD0D60971565AA8510560ab41'
    }
  },
  // StakeModule
  {
    name: 'stakeModule',
    address: {
      [mainnet.id]: '0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3',
      [TENDERLY_CHAIN_ID]: '0xCe01C90dE7FD1bcFa39e237FE6D8D9F569e8A6a3'
    }
  },
  // LockstakeSky
  {
    name: 'lsSky',
    address: {
      [mainnet.id]: '0xf9A9cfD3229E985B91F99Bc866d42938044FFa1C',
      [TENDERLY_CHAIN_ID]: '0xf9A9cfD3229E985B91F99Bc866d42938044FFa1C'
    }
  },
  // Lockstake USDS Rewards
  {
    name: 'lsSkyUsdsReward',
    address: {
      [mainnet.id]: '0x38E4254bD82ED5Ee97CD1C4278FAae748d998865',
      [TENDERLY_CHAIN_ID]: '0x38E4254bD82ED5Ee97CD1C4278FAae748d998865'
    }
  },
  // Lockstake SPK Rewards
  {
    name: 'lsSkySpkReward',
    address: {
      [mainnet.id]: '0x99cBC0e4E6427F6939536eD24d1275B95ff77404',
      [TENDERLY_CHAIN_ID]: '0x99cBC0e4E6427F6939536eD24d1275B95ff77404'
    }
  }
];

export const tenderlyContracts: { name: string; address: Record<typeof TENDERLY_CHAIN_ID, `0x${string}`> }[] =
  [
    // {
    //   name: 'cle',
    //   address: {
    //     // same token as USDS for now
    //     [TENDERLY_CHAIN_ID]: '0xdC035D45d973E3EC169d2276DDab16f1e407384F'
    //   }
    // }
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

export const l2Contracts: { name: string; address: Record<L2ChainId, `0x${string}`> }[] = [
  {
    name: 'usdcL2',
    address: {
      [base.id]: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
      [arbitrum.id]: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
      [optimism.id]: '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85',
      [unichain.id]: '0x078D782b760474a361dDA0AF3839290b0EF57AD6'
    }
  },
  {
    name: 'usdsL2',
    address: {
      [base.id]: '0x820C137fa70C8691f0e44Dc420a5e53c168921Dc',
      [arbitrum.id]: '0x6491c05A82219b8D1479057361ff1654749b876b',
      [optimism.id]: '0x4F13a96EC5C4Cf34e442b46Bbd98a0791F20edC3',
      [unichain.id]: '0x7E10036Acc4B56d4dFCa3b77810356CE52313F9C'
    }
  },
  {
    name: 'sUsdsL2',
    address: {
      [base.id]: '0x5875eEE11Cf8398102FdAd704C9E96607675467a',
      [arbitrum.id]: '0xdDb46999F8891663a8F2828d25298f70416d7610',
      [optimism.id]: '0xb5B2dc7fd34C249F4be7fB1fCea07950784229e0',
      [unichain.id]: '0xA06b10Db9F390990364A3984C04FaDf1c13691b5'
    }
  },
  {
    name: 'psm3L2',
    address: {
      [base.id]: '0x1601843c5E9bC251A3272907010AFa41Fa18347E',
      [arbitrum.id]: '0x2B05F8e1cACC6974fD79A673a341Fe1f58d27266',
      [optimism.id]: '0xe0F9978b907853F354d79188A3dEfbD41978af62',
      [unichain.id]: '0x7b42Ed932f26509465F7cE3FAF76FfCe1275312f'
    }
  },
  {
    name: 'ssrAuthOracle',
    address: {
      [base.id]: '0x65d946e533748A998B1f0E430803e39A6388f7a1',
      [arbitrum.id]: '0xEE2816c1E1eed14d444552654Ed3027abC033A36',
      [optimism.id]: '0x6E53585449142A5E6D5fC918AE6BEa341dC81C68',
      [unichain.id]: '0x1566BFA55D95686a823751298533D42651183988'
    }
  }
];
