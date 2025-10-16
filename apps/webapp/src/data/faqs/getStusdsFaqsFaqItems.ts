export const getStusdsFaqsFaqItems = () => {
  const items = [
    {
      question: 'What is stUSDS?',
      answer: `stUSDS is a risk token designed for more expert users who wish to engage with higher-risk modules of the Sky Protocol. It is backed by staked SKY collateral and is structured to absorb a greater share of system risk in exchange for the potential to capture a larger portion of protocol rewards.
stUSDS funds and supports liquidity for SKY stakers, encouraging more participation in SKY governance by active token holders, delegators, and voters, leading to a more secure Sky Ecosystem.

Prospective users of stUSDS are encouraged to understand that it represents a risk-bearing position in the system, and to review all associated parameters carefully before participating.

Key characteristics and current conditions:

• **Backed by staked SKY:** stUSDS derives its value from positions collateralized by staked SKY within the Staking Engine.

• **Haircut risk:** If liquidation of a borrower’s staked SKY collateral does not fully cover outstanding debt, stUSDS balances may incur a proportional haircut.

• **Temporary deposit illiquidity:** During the initial launch of stUSDS, deposits may be temporarily illiquid when utilization exceeds 100 percent. This condition is expected to continue until total deposits in the stUSDS module surpass 55 million USDS.

• **Bootstrapping phase rate:** To compensate participants for the added illiquidity risk during the early phase, Sky Ecosystem Governance has set the stUSDS reward rate at a 40% APY as a short-term bootstrapping incentive.

• **Once total deposits reach 55 million USDS:** Utilization is expected to fall below 100 percent, allowing withdrawals of available liquidity. The temporary elevated APY will be reduced from 40% to 20%. Following the reduction, rates will dynamically adjust based on market conditions as the module transitions to normal operation.

• **Manual liquidations:** Automatic liquidations of staked SKY are temporarily disabled; any undercollateralized positions will be liquidated manually by Sky Ecosystem Governance to minimize market risk and liquidation malfunctions.

• **[Capped OSM SKY price](#tooltip-capped-OSM-SKY-price):** During the bootstrapping phase, the amount of leverage available to SKY stakers borrowing is significantly limited. The SKY price reported by the Oracle Security Module (OSM) is capped at a governance-defined limit to prevent overvaluation during debt generation. This reduces the risk to the system while SKY liquidity is still low, and liquidations would have to be handled manually.

As liquidity deepens and the system matures, stUSDS is expected to operate as a standard lending-market module, with dynamic rate adjustments and automated risk controls re-enabled by governance.`,
      index: 0
    },
    {
      question: 'What are some additional risks that stUSDS holders face?',
      answer: `stUSDS is a risk token that derives its value from positions collateralized by staked SKY within the Staking Engine. During the initial launch of stUSDS, deposits may be temporarily illiquid when utilization exceeds 100 percent. This condition is expected to continue until total deposits in the stUSDS module surpass 55 million USDS.

If liquidation of a borrower’s staked SKY collateral does not fully cover outstanding debt, stUSDS balances may incur a proportional haircut.

Prospective users should understand that stUSDS is a risk-bearing position designed for expert participants who are comfortable with potential loss scenarios tied to system performance.`,
      index: 1
    },
    {
      question: 'Why might stUSDS deposits become temporarily illiquid?',
      answer: `During the initial launch of stUSDS, deposits may be temporarily illiquid when utilization exceeds 100 percent. This condition is expected to continue until total deposits in the stUSDS module surpass 55 million USDS.

To compensate participants for the added illiquidity risk during the early phase, the stUSDS reward rate is temporarily set at a 40% APY as a short-term bootstrapping incentive. Once deposits exceed 55 million USDS, utilization should fall below 100 percent, withdrawals will resume normally, and rates will adjust dynamically based on market conditions.`,
      index: 2
    },
    {
      question: 'What is the stUSDS Rate, and how is it calculated?',
      answer: `The [stUSDS Rate](#tooltip-stusds-rate) is variable and calculated using the following formula:

stUSDS Rate = Utilization * (SKY Borrow Rate - stUSDS Accessibility Reward) + (1 - Utilization) * Sky Savings Rate

The rate is derived from the SKY Borrow Rate less the stUSDS Accessibility Reward on the utilized portion of your capital and the Sky Savings Rate on the unutilized portion. Utilization is the percent of funds in the stUSDS contract that are used to fund borrowing against staked SKY.

The SKY Borrow Rate is the current interest rate charged to SKY-backed borrowers and is dynamic and market-driven, based on the utilization of funds within the stUSDS contract.`,
      index: 3
    },
    {
      question: 'How are stUSDS rewards funded?',
      answer:
        'The rewards distributed to stUSDS holders come from the interest paid by SKY borrowers (the SKY Borrow Rate) and protocol revenues. The capital for SKY-backed borrowing is provided by Expert Module users who deposit USDS to access the stUSDS Rate and receive stUSDS in return. The stUSDS tokens serve as a digital record of their USDS interaction with the stUSDS module and any change to the value of their position.',
      index: 4
    },
    {
      question: 'What is the SKY Borrow Rate?',
      answer:
        'The SKY Borrow Rate is the current interest rate charged to SKY-backed borrowers and is dynamic and market-driven, based on the utilization of funds within the stUSDS contract.',
      index: 5
    },
    {
      question: 'Does it cost anything to access the stUSDS Rate?',
      answer:
        'Accessing the [stUSDS Rate](#tooltip-stusds-rate) via the Sky.money web app is free and neither controlled, imposed nor received by Skybase International nor the Sky Protocol. However, any time you supply or withdraw assets to/from the stUSDS module of the Sky Protocol, you will incur a transaction fee, called a gas fee, for using the Ethereum blockchain network.',
      index: 6
    },
    {
      question: 'Is there a minimum amount of USDS I must supply to access stUSDS rewards?',
      answer:
        'No minimum supply amount is required to access the [stUSDS Rate](#tooltip-stusds-rate); however, there is a cap, set by Sky Ecosystem Governance, on how much USDS the stUSDS vault can accept. Withdrawals are available as long as the stUSDS pool has sufficient idle USDS. Since deposits fund SKY‑backed loans, withdrawal capacity depends on current [utilization](#tooltip-utilization): when most liquidity is lent out, withdrawals may be limited until repayments occur or liquidity returns.',
      index: 7
    },
    {
      question: 'What is the conversion rate for stUSDS?',
      answer:
        'The stUSDS conversion rate floats and generally increases over time as yield accrues. At launch it is typically 1.0 and rises as earnings accumulate. Loss events (e.g., liquidation shortfalls) reduce the exchange rate via a proportional haircut.',
      index: 8
    },
    {
      question: 'Can I supply/withdraw USDS to/from the stUSDS module anytime?',
      answer: `Generally, yes—deposits and withdrawals are designed to be available at any time, but there are a couple of caveats:

Liquidity availability: Withdrawals depend on the module having enough liquid USDS. If [utilization](#tooltip-utilization) is very high, you may need to wait for borrowers to repay or for liquidity to return, or withdraw partially.
Rate/fee changes: Sky Ecosystem Governance can update parameters (rates, caps) and may impose temporary safeguards during stress.`,
      index: 9
    },
    {
      question: 'Why are the risks and the rewards associated with stUSDS different to that of sUSDS?',
      answer:
        'stUSDS holders earn yield but also take on the risk of funding SKY‑backed borrowing. If a borrower’s staked SKY collateral is liquidated and the proceeds don’t fully cover the debt, the stUSDS vault absorbs the shortfall via a proportional haircut to the vault’s exchange rate (i.e., each stUSDS redeems for fewer USDS). This design ring‑fences losses to the stUSDS module, so the broader Sky Protocol is insulated from deficits arising in the SKY‑backed borrowing facility. So, sUSDS carries protocol-level risk but not borrower-shortfall risk, whereas stUSDS does bear that shortfall risk.',
      index: 10
    },
    {
      question: 'Can I trade stUSDS on the open market?',
      answer:
        'Yes, eligible users of the Sky.money web app can access the Trade feature to trade stUSDS via an API integration with the third-party decentralized exchange CoW Swap. stUSDS holders are also free to access any other protocol or exchange that supports stUSDS trading; however, users do so at their own risk. Sky.money is not responsible for any loss or damages incurred while using such third-party platforms. Please see the [User Risk Documentation](https://docs.sky.money/user-risks) for more information on third-party services.',
      index: 11
    }
  ];
  return items.sort((a, b) => a.index - b.index);
};
