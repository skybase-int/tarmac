export const getExpertModulesFaqsFaqItems = () => {
  const items = [
    {
      question: 'What are Expert modules and how do they work?',
      answer:
        'Expert modules enable users to access a variable rate on USDS by participating in SKY-backed borrowing. Advanced strategies may carry increased risk. They are intended and designed for experienced users who understand the complexities of DeFi, including factors like market volatility and liquidity constraints.',
      index: 0
    },
    {
      question: 'Does it cost anything to access Expert modules?',
      answer:
        'Accessing Expert modules via the Sky.money web app is free and neither controlled, imposed nor received by Skybase International nor the Sky Protocol. However, any time you supply or withdraw assets to/from the stUSDS module of the Sky Protocol, you will incur a transaction fee, called a gas fee, for using the Ethereum blockchain network.',
      index: 1
    },
    {
      question: 'What is the stUSDS Rate, and how is it calculated?',
      answer: `The [stUSDS Rate](#tooltip-stusds-rate) is variable and calculated using the following formula:

stUSDS Rate = Utilization * (SKY Borrow Rate - stUSDS Accessibility Reward) + (1 - Utilization) * Sky Savings Rate

The rate is derived from the SKY Borrow Rate less the stUSDS Accessibility Reward on the utilized portion of your capital and the Sky Savings Rate on the unutilized portion. Utilization is the percent of funds in the stUSDS contract that are used to fund borrowing against staked SKY.

The SKY Borrow Rate is the current interest rate charged to SKY-backed borrowers and is dynamic and market-driven, based on the utilization of funds within the stUSDS contract.`,
      index: 2
    },
    {
      question: 'Does it cost anything to access Expert modules?',
      answer:
        'Accessing Expert modules via the Sky.money web app is free and neither controlled, imposed nor received by Skybase International nor the Sky Protocol. However, any time you supply or withdraw assets to/from the stUSDS module of the Sky Protocol, you will incur a transaction fee, called a gas fee, for using the Ethereum blockchain network.',
      index: 3
    }
  ];
  return items.sort((a, b) => a.index - b.index);
};
