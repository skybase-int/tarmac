export const getUpgradeFaqItems = () => [
  {
    question: 'What is USDS?',
    answer: `USDS is a stablecoin of the decentralized Sky Protocol and the upgrade of DAI. It is backed by a surplus of collateral and soft-pegged to the value of the U.S. dollar, meaning it is designed to maintain a value equal to or close to a dollar. I

USDS is freely transferable and can be used in connection with any software protocol or platform that supports it. For example, you can use USDS to participate in the Sky Savings Rate to accumulate additional USDS, and to access Sky Token Rewards in the form of SKY tokens via the Sky.money web app.  

The Sky Protocol is governed by a community of broad and diversified individuals and entities from around the world, who hold Sky governance tokens and support the Sky Ecosystem by participating in a system of decentralized onchain voting. USDS powers the open Sky Ecosystem.

USDS is also currently available on networks other than Ethereum Mainnet, including Solana, Base and Arbitrum. You can follow the growth of USDS and all Sky Protocol tokens using the [Sky Ecosystem Dashboard](https://info.sky.money/).`
  },
  {
    question: 'How does USDS maintain stability and benefit the ecosystem?',
    answer: `Overcollateralization and other mechanisms helps USDS maintain stability while also helping to manage risk. 

Overcollateralization means that the total value of the collateral that backs a specific stablecoin must always be higher than the aggregate value of all of those stablecoins in circulation. For example, if a governance community decides that its stablecoin must be overcollateralized by 20%, and the value of all its stablecoins in circulation is $1M, the collateral held in reserve must be worth at least $1.2M.

Other mechanisms of the decentralized Sky Protocol that are used to keep USDS stable are Peg Stability Modules (PSMs) and the Smart Burn Engine (SBE):

• Peg Stability Modules (PSMs). Peg Stability Modules (PSMs) are smart contracts that allow users to convert certain stablecoins directly with the Sky Protocol for USDS or DAI at a fixed rate and with relatively low fees. They are designed to maintain the stability of USDS and DAI. Unlike decentralized exchange (DEX) transactions, PSM operations do not involve trading between users. Instead, they are direct, non-custodial conversions (generate and burn) executed with the decentralized smart contracts of the Sky Protocol. 
Through PSMs, USDS or DAI is obtained via predictable-rate conversion (typically a 1:1 ratio with certain stablecoins, or, in the case of sUSDS, for an amount reflecting its current price) rather than through borrowing. For example, given the existence of a USDC-backed PSM, a user could supply 100 USDC stablecoins to generate100 USDS or 100 DAI (minus fees), without taking on any debt. Given that PSM operations are facilitated on the Sky Protocol directly and not on a DEX, price slippage (i.e., the difference between the expected price of a token and the actual price when traded) is not a concern. Zero) Sky Protocol fees and no slippage are some of the benefits of using PSM, which adds liquidity to the assets backing the PSM. That liquidity helps to keep the value of USDS and DAI stable. 

• The Smart Burn Engine (SBE). The Smart Burn Engine is a smart contract that programmatically acquires SKY on the DeFi markets and deposits it into Sky Protocol-owned USDS/SKY liquidity pools using Sky Protocol surplus once the Surplus Buffer has hit a certain threshold set by Sky Ecosystem governance. Depositing SKY into these pools improves token liquidity and also increases the capital buffers of the Sky Protocol. Note that the SBE no longer holds DAI and MKR. and it no longer buys MKR.
The Surplus Buffer is where all the USDS revenue earned by the Sky Protocol from fees collected by users are accrued. Using the excess USDS in this way balances its supply with its demand, which stabilizes its price.

Importantly, the [Sky Ecosystem Dashboard](https://info.sky.money/), designed by [Block Analitica](https://blockanalitica.com/), allows anyone to examine the health of the decentralized Sky Protocol in real time. Users can view the total value locked (TVL) in the Protocol, TVL in the Sky Savings Rate module, TVL in the Sky Token Rewards module, the total collateral backing the system, an estimation of annual profits, and much more. For more on the Dashboard, see this [Substack post](https://blockanalitica.substack.com/p/the-sky-risk-and-analytics-dashboard) by Block Analitica. 

For details on the risks associated with soft-pegged stablecoins, review the [User Risk Documentation](https://docs.sky.money/user-risks).`
  },
  {
    question: 'Can I trade USDS on the open market?',
    answer:
      'Yes, eligible sUSDS holders can access the Sky.money web app to trade the tokens via an API integration with the third-party decentralized exchange [CoW Swap](https://swap.cow.fi/#/1/swap/WETH). sUSDS holders are also free to access any other protocol or exchange that supports sUSDS trading; however, users do so at their own risk. Sky.money is not responsible for any loss or damages incurred while using such third-party platforms.'
  },
  {
    question: 'Do I have to upgrade my DAI to USDS?',
    answer: 'No, upgrading your DAI is optional. You can continue to hold DAI tokens as you have in the past.'
  },
  {
    question: 'How much does it cost to upgrade DAI to USDS?',
    answer:
      'Upgrading DAI to USDS is free and instant using the Sky.money web app; however, you will likely pay a transaction—or gas—fee for using the Ethereum blockchain network. That fee is neither controlled, imposed nor received by Sky.money or the Sky Protocol. It is calculated based on current Ethereum network demand and the amount of gas required to process the upgrade transaction. Be sure to have ETH in your wallet anytime you transact using the Sky Protocol.'
  },
  {
    question: 'What happens to the DAI I’ve supplied to the DAI Savings Rate contract?',
    answer: `The DAI Savings Rate (DSR) contract remains unchanged, so you don’t need to immediately do anything to your DAI in the DSR module. You can, however, withdraw your DSR position, and, if you’re an eligible user of the Sky.money web app, upgrade your DAI to USDS, and then use the USDS to access the Sky Savings Rate.  

    When you supply USDS to the Sky Savings Rate module of the decentralized, non-custodial Sky Protocol, you receive sUSDS savings tokens in return. When you choose to redeem your sUSDS for USDS—which you can do at any time—the total USDS you will receive will equal the amount you originally supplied, plus any rewards accumulated. No minimum supply amount is required to access the Sky Savings Rate, and you always maintain full control of your supplied assets.
`
  }
];
