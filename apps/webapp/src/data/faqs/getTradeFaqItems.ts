import {
  isArbitrumChainId,
  isBaseChainId,
  isOptimismChainId,
  isUnichainChainId
} from '@jetstreamgg/sky-utils';

import {
  L2GeneralFaqItems,
  arbitrumFaqItems,
  baseFaqItems,
  optimismFaqItems,
  unichainFaqItems
} from './sharedFaqItems';

export const getTradeFaqItems = (chainId: number) => {
  const items = [
    ...generalFaqItems,
    ...L2GeneralFaqItems,
    ...(isBaseChainId(chainId) ? baseFaqItems : []),
    ...(isArbitrumChainId(chainId) ? arbitrumFaqItems : []),
    ...(isOptimismChainId(chainId) ? optimismFaqItems : []),
    ...(isUnichainChainId(chainId) ? unichainFaqItems : [])
  ];
  return items.sort((a, b) => a.index - b.index);
};

const generalFaqItems = [
  {
    question: 'What is a trade?',
    answer: `A trade is the direct exchange of one cryptocurrency token for another. Trading can occur on decentralized exchanges (DEXs) and centralized exchanges (CEXs).

Eligible Sky.money web app users can trade tokens via an API integration with the third-party decentralized exchange [CoW Swap](https://swap.cow.fi/#/1/swap/WETH). The exact trade route is determined by CoW Swap and is not influenced by Sky.money or the Sky Protocol. Please see the [Terms of Use](https://docs.sky.money/legal-terms) for more information on third-party services.

Note that price slippage—a change in price between the time of the trade order and its execution on the blockchain—can occur due to market volatility. When you trade via the Sky.money web app, you can set your slippage tolerance level.`,
    index: 0
  },
  {
    question: 'Why would I trade tokens?',
    answer: `The following statements are provided for informational purposes only and are not intended to be construed as financial advice or recommendations on trading strategies. Your use of the Sky Protocol is at your own risk. Please see our [User Risk Documentation](https://docs.sky.money/user-risks). and [Terms of Use](https://docs.sky.money/legal-terms) for further information.

Market participants trade crypto for a variety of reasons. For example, users may trade crypto for portfolio diversification and to participate in DeFi. Regardless of the motivation, crypto trading can provide a diverse range of opportunities to market participants depending on their goals and risk appetite

When you trade USDC, USDT, ETH or SKY for USDS via the Sky Protocol, you can use your USDS to access the Sky Savings Rate to access additional USDS over time, and to access Sky Token Rewards in the form of SKY governance tokens.

When you trade USDC, USDT, ETH and USDS for SKY, you can supply your SKY tokens to the Staking Engine of the Sky Protocol to access Staking Rewards. The Staking Engine enables you to create one or more positions, including positions that enable you to generate and borrow USDS against your supplied SKY and to delegate the voting power the SKY token provides.`,
    index: 1
  },
  {
    question: 'Is trading using Sky.money free?',
    answer: `Accessing the Sky.money web app is free. Trading, however, may involve a fee imposed by the third-party decentralized exchange (i.e., [CoW Swap](https://swap.cow.fi/#/1/swap/WETH)) integrated with the non-custodial Sky Protocol that is used to make the trade. In addition, you will likely pay a blockchain network transaction fee called a gas fee, which is neither controlled, imposed nor received by Sky.money or the Sky Protocol. This fee is calculated based on current Ethereum network demand and the amount of gas required to process your transaction.

If you have shied away from the Ethereum blockchain due to the high price of gas, the Sky Protocol's SkyLink system enables users to move their Ethereum Mainnet-based Sky assets between supported L2 networks, including Base and Arbitrum, with reduced fees and faster transaction speeds.

Please see the [Terms of Use](https://docs.sky.money/legal-terms) for more information on third-party services.`,
    index: 2
  },
  {
    question: 'What are Sky Token Rewards?',
    answer:
      'When you supply USDS to the Sky Token Rewards module of the Sky Protocol, you receive Sky Token Rewards over time in the form of SKY governance tokens. The USDS, as well as the rewards received, are supplied to a non-custodial smart contract that represents the USDS pool of assets. That means no intermediary has custody of your supplied assets.',
    index: 3
  }
];
