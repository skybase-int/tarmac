// Default configuration used site-wide

import { base, mainnet, sepolia } from 'wagmi/chains';
import { WidgetsConfig } from './types/widgets-config';
import {
  usdsAddress,
  mcdDaiAddress,
  wethAddress,
  usdcAddress,
  usdtAddress,
  wethSepoliaAddress,
  usdcSepoliaAddress,
  usdtSepoliaAddress,
  mcdDaiSepoliaAddress,
  mkrAddress,
  skyAddress,
  TOKENS,
  sUsdsAddress,
  ETH_ADDRESS,
  usdcBaseAddress,
  usdsBaseAddress,
  // skyBaseAddress,
  sUsdsBaseAddress
} from '@jetstreamgg/hooks';
import { TENDERLY_BASE_CHAIN_ID, TENDERLY_CHAIN_ID } from '@/shared/constants';
import { SUPPORTED_TOKEN_SYMBOLS } from '..';

const { usds, mkr, sky, susds, eth, weth, usdc, usdt, dai } = TOKENS;

// It stores all the RPCs the application will use, and also the user configured-ones
export const defaultConfig: WidgetsConfig = {
  balancesTokenList: {
    [mainnet.id]: [
      eth,
      { ...weth, address: wethAddress[mainnet.id] },
      { ...usdc, address: usdcAddress[mainnet.id] },
      { ...usdt, address: usdtAddress[mainnet.id] },
      { ...dai, address: mcdDaiAddress[mainnet.id] },
      { ...usds, address: usdsAddress[mainnet.id] },
      { ...mkr, address: mkrAddress[mainnet.id] },
      { ...sky, address: skyAddress[mainnet.id] }
    ],
    [TENDERLY_CHAIN_ID]: [
      eth,
      { ...weth, address: wethAddress[TENDERLY_CHAIN_ID] },
      { ...usdc, address: usdcAddress[TENDERLY_CHAIN_ID] },
      { ...usdt, address: usdtAddress[TENDERLY_CHAIN_ID] },
      { ...dai, address: mcdDaiAddress[TENDERLY_CHAIN_ID] },
      { ...usds, address: usdsAddress[TENDERLY_CHAIN_ID] },
      { ...mkr, address: mkrAddress[TENDERLY_CHAIN_ID] },
      { ...sky, address: skyAddress[TENDERLY_CHAIN_ID] }
    ],
    [base.id]: [
      eth,
      { ...usdc, address: usdcBaseAddress[base.id] },
      { ...usds, address: usdsBaseAddress[base.id] },
      { ...susds, address: sUsdsBaseAddress[base.id] }
    ],
    [TENDERLY_BASE_CHAIN_ID]: [
      eth,
      { ...usdc, address: usdcBaseAddress[base.id] },
      { ...usds, address: usdsBaseAddress[base.id] },
      { ...susds, address: sUsdsBaseAddress[base.id] }
    ]
  },
  tradeTokenList: {
    [mainnet.id]: [
      { ...usdc, address: usdcAddress[mainnet.id] },
      { ...usdt, address: usdtAddress[mainnet.id] },
      { ...eth, address: eth.address[mainnet.id] },
      { ...weth, address: wethAddress[mainnet.id] },
      { ...dai, address: mcdDaiAddress[mainnet.id] },
      { ...mkr, address: mkrAddress[mainnet.id] },
      { ...usds, address: usdsAddress[mainnet.id] },
      { ...susds, address: sUsdsAddress[mainnet.id] },
      { ...sky, address: skyAddress[mainnet.id] }
    ],
    [TENDERLY_CHAIN_ID]: [
      { ...usdc, address: usdcAddress[TENDERLY_CHAIN_ID] },
      { ...usdt, address: usdtAddress[TENDERLY_CHAIN_ID] },
      { ...eth, address: eth.address[TENDERLY_CHAIN_ID] },
      { ...weth, address: wethAddress[TENDERLY_CHAIN_ID] },
      { ...dai, address: mcdDaiAddress[TENDERLY_CHAIN_ID] },
      { ...mkr, address: mkrAddress[TENDERLY_CHAIN_ID] },
      { ...usds, address: usdsAddress[TENDERLY_CHAIN_ID] },
      { ...susds, address: sUsdsAddress[TENDERLY_CHAIN_ID] },
      { ...sky, address: usdsAddress[TENDERLY_CHAIN_ID] }
    ],
    [base.id]: [
      { ...usdc, address: usdcBaseAddress[base.id] },
      { ...usds, address: usdsBaseAddress[base.id] },
      { ...susds, address: sUsdsBaseAddress[base.id] }
    ],
    [TENDERLY_BASE_CHAIN_ID]: [
      { ...usdc, address: usdcBaseAddress[base.id] },
      { ...usds, address: usdsBaseAddress[base.id] },
      { ...susds, address: sUsdsBaseAddress[base.id] }
    ],
    [sepolia.id]: [
      // The USDC token that COW uses has 18 decimals, instead of 6
      { ...usdc, address: usdcSepoliaAddress[sepolia.id], decimals: 18 },
      { ...usdt, address: usdtSepoliaAddress[sepolia.id] },
      { ...eth, address: ETH_ADDRESS },
      { ...weth, address: wethSepoliaAddress[sepolia.id] },
      { ...dai, address: mcdDaiSepoliaAddress[sepolia.id] }
    ]
  },
  tradeDisallowedPairs: {
    ETH: [weth.symbol as SUPPORTED_TOKEN_SYMBOLS]
  }
};
