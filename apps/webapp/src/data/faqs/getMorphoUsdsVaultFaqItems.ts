// TODO: add faqs in corpus, these are hardcoded for now
export const getMorphoUsdsVaultFaqItems = () => {
  const items = [
    {
      question: 'What is the USDS Risk Capital Vault?',
      answer: `The USDS Risk Capital Vault is a Morpho V2 yield-bearing vault that allows users to deposit USDS and earn yield through automated capital allocation across multiple lending markets. Built on the ERC-4626 tokenized vault standard, it enables passive yield generation with professional risk curation.

When you deposit USDS, you receive vault shares representing your proportional ownership of the vault's assets. As yield accrues from lending activities, your shares appreciate in value, allowing you to withdraw more USDS than you initially deposited.

The vault is designed for users seeking exposure to higher-yield DeFi lending opportunities while benefiting from professional risk management and diversified market allocation.`,
      index: 0
    },
    {
      question: 'How does the USDS Risk Capital Vault generate yield?',
      answer: `The vault generates yield through over-collateralized lending. Capital deposited into the vault is allocated across multiple Morpho lending markets, where borrowers pay interest to access liquidity.

The vault's Allocator strategically distributes funds across enabled markets to optimize returns while managing risk. Interest paid by borrowers flows back to the vault, increasing the total assets and causing share prices to appreciate over time.

Yield is automatically compounded—you don't need to manually claim or reinvest earnings. Your vault shares simply become redeemable for more USDS as the vault accumulates interest.`,
      index: 1
    },
    {
      question: 'What are the key roles that manage the vault?',
      answer: `The vault employs a role-based governance structure with four specialized roles to ensure no single entity controls funds unilaterally:

**Owner**: Appoints Curators and Allocators, sets vault-level parameters including fees, and manages overall governance.

**Curator**: Selects eligible lending markets, establishes supply caps per market, and manages risk parameters. All risk-affecting changes are subject to timelock protection.

**Allocator**: Controls capital deployment by managing supply and withdraw queues, and reallocates funds between markets to optimize yields.

**Sentinel (Guardian)**: Acts as a safety mechanism that can revoke pending timelocked actions to prevent potentially malicious changes from taking effect.`,
      index: 2
    },
    {
      question: 'How do deposits and withdrawals work?',
      answer: `**Deposits**: When you deposit USDS, you receive vault shares representing your proportional ownership. Your deposit initially sits as idle liquidity, then the Allocator deploys it across enabled markets through the supply queue to generate yield.

**Withdrawals**: When you withdraw, the vault pulls liquidity from markets in the withdraw queue to fulfill your request. You burn your vault shares and receive the corresponding USDS based on the current share price.

There are no lock-up periods—you can deposit and withdraw at any time, subject to available liquidity in the underlying markets. If liquidity is temporarily constrained, you may need to wait for borrowers to repay or for liquidity to return.`,
      index: 3
    },
    {
      question: 'What is the conversion rate for vault shares?',
      answer: `The vault share conversion rate represents how much USDS each share is worth. This rate typically starts at 1.0 and increases over time as yield accrues to the vault.

For example, if the vault accumulates 10% yield, the share price would increase from $1.00 to approximately $1.10 per share. This means if you deposited 1,000 USDS and received 1,000 shares, those shares would later be redeemable for approximately 1,100 USDS.

The conversion rate can decrease if the vault experiences losses from borrower defaults or liquidation shortfalls, though risk management mechanisms are in place to minimize such events.`,
      index: 4
    },
    {
      question: 'What risks should I be aware of?',
      answer: `**Liquidity Risk**: Withdrawals depend on available liquidity in underlying markets. During high utilization periods, immediate withdrawals may be limited.

**Smart Contract Risk**: Multiple interconnected smart contracts manage the vault system. While audited, all smart contracts carry inherent technical risk.

**Market Risk**: The vault's capital is deployed to lending markets with various collateral types. Poor performance of underlying markets or borrower defaults could impact returns.

**Collateral Exposure**: Loans are backed by different types of collateral. If collateral values decline significantly and liquidations don't fully cover debts, the vault may absorb losses.

**Curator Risk**: The vault's risk profile depends on the Curator's market selection and cap management decisions.

Higher yields compensate for these elevated risks compared to lower-risk alternatives.`,
      index: 5
    },
    {
      question: 'How is the vault different from stUSDS?',
      answer: `While both are designed for users seeking higher yields, they have different structures and risk profiles:

**stUSDS** is native to the Sky Protocol and specifically funds borrowing against staked SKY tokens. Its yield comes from SKY borrowers' interest payments, and risks are concentrated in SKY-backed lending.

**The USDS Risk Capital Vault** is built on Morpho's infrastructure and allocates capital across multiple diversified lending markets with various collateral types. This provides exposure to a broader range of yield sources but with different risk characteristics.

Both are considered expert-level products suitable for sophisticated users who understand DeFi lending mechanics and are comfortable with potential loss scenarios.`,
      index: 6
    },
    {
      question: 'What is the ERC-4626 standard?',
      answer: `ERC-4626 is the "Tokenized Vault" standard that provides a consistent interface for yield-bearing vaults across DeFi. It defines standard functions for deposits, withdrawals, and share accounting.

Benefits of ERC-4626 compliance include:

**Interoperability**: Vault shares can be easily integrated with other DeFi protocols.

**Consistency**: Standard functions like deposit(), withdraw(), mint(), and redeem() work predictably across all compliant vaults.

**Transparency**: Users can always query their position value, total assets, and conversion rates through standardized methods.

This standard ensures the USDS Risk Capital Vault integrates seamlessly with the broader DeFi ecosystem.`,
      index: 7
    },
    {
      question: 'Are there any fees?',
      answer: `The vault may charge two types of fees, configured by governance:

**Performance Fee**: A percentage (up to 50%) of the yield generated by the vault. This fee is only taken from profits, not from your principal.

**Management Fee**: A percentage (up to 5%) of total assets under management, charged annually.

Fees are deducted automatically and reflected in the share price. There are no additional fees for depositing or withdrawing beyond standard Ethereum gas fees for blockchain transactions.

Check the vault's current configuration for specific fee rates, as these may be adjusted by governance over time.`,
      index: 8
    },
    {
      question: 'What happens if a lending market becomes illiquid?',
      answer: `Morpho V2 vaults include a mechanism called "forceDeallocate" that provides guaranteed exit access even during illiquidity events.

If the vault cannot provide enough liquid USDS for your withdrawal, you can invoke forceDeallocate to redeem your vault shares directly for underlying positions in the protocols where your capital is deployed. This ensures you're never permanently locked in the vault.

This mechanism includes a small penalty (up to 2%) to discourage misuse during normal conditions, but it provides an important safety valve during extreme market stress.

Additionally, the Allocator continuously manages liquidity to ensure sufficient liquid assets are available for normal withdrawal requests.`,
      index: 9
    },
    {
      question: 'How does the timelock protection work?',
      answer: `Timelock protection is a security mechanism that delays potentially risky administrative changes, giving users time to react and Sentinels opportunity to intervene.

When the Curator proposes changes that could affect risk parameters—such as adding new markets, modifying supply caps, or changing fee structures—these changes enter a timelock period (configurable from 0 to 3 weeks).

During this period:
- Users can see pending changes on-chain
- Users can withdraw their funds if they disagree with proposed changes
- Sentinels can veto malicious proposals before they take effect

This mechanism prevents surprise changes and ensures users maintain control over their risk exposure.`,
      index: 10
    },
    {
      question: 'Can I supply/withdraw USDS to/from the vault anytime?',
      answer: `Generally, yes—deposits and withdrawals are designed to be available at any time without lock-up periods. However, there are some caveats:

**Liquidity availability**: Withdrawals depend on the vault having sufficient liquid USDS. If most capital is deployed to markets, you may need to wait for borrowers to repay, for the Allocator to reallocate funds, or withdraw in smaller amounts.

**Parameter changes**: Governance can update parameters (fees, caps, enabled markets) subject to timelock periods. These changes don't prevent withdrawals but may affect future yields.

**Emergency conditions**: In extreme circumstances, the forceDeallocate mechanism ensures you can always exit, even if it means receiving underlying positions rather than USDS.`,
      index: 11
    },
    {
      question: 'Is the vault audited?',
      answer: `Morpho's vault contracts undergo rigorous security audits before deployment. The protocol has been audited by multiple reputable security firms.

However, audits do not guarantee the absence of vulnerabilities. Users should:
- Understand that all smart contracts carry inherent risk
- Only deposit amounts they can afford to lose
- Stay informed about any security disclosures or updates

The vault's immutable contract design means core safeguards cannot be modified after deployment, providing additional security guarantees.`,
      index: 12
    },
    {
      question: 'Who is this vault designed for?',
      answer: `The USDS Risk Capital Vault is designed for sophisticated DeFi users who:

- Understand lending mechanics, collateralization, and liquidation risks
- Are comfortable with variable yields and potential loss scenarios
- Want exposure to diversified lending markets through professional curation
- Have the technical knowledge to evaluate vault parameters and underlying markets
- Accept higher risk in exchange for potentially higher yields

If you're new to DeFi or prefer lower-risk options, consider alternatives like sUSDS (Sky Savings) which offers a more straightforward yield mechanism with different risk characteristics.`,
      index: 13
    }
  ];
  return items.sort((a, b) => a.index - b.index);
};
