# Sky Protocol Developer Guide

A comprehensive guide to understanding the Sky (formerly Maker) protocol concepts for developers working on Tarmac.

## Table of Contents

- [Protocol Overview](#protocol-overview)
- [Core Tokens](#core-tokens)
- [Key Concepts](#key-concepts)
  - [Supply Cap](#supply-cap)
  - [Liquidity](#liquidity)
  - [Collateralization](#collateralization)
  - [Liquidation](#liquidation)
  - [Oracle Security Module (OSM)](#oracle-security-module-osm)
  - [Capped OSM Price](#capped-osm-price)
- [Product Features](#product-features)
  - [Savings (sUSDS)](#savings-susds)
  - [Expert Savings (stUSDS)](#expert-savings-stusds)
  - [Staking](#staking)
  - [Rewards (Farming)](#rewards-farming)
  - [Sealing](#sealing)
- [stUSDS Curve Integration](#stusds-curve-integration)
- [Common Issues & Edge Cases](#common-issues--edge-cases)
- [Glossary](#glossary)

---

## Protocol Overview

**Sky** (formerly Maker) is a decentralized lending protocol on Ethereum. It's one of the oldest and most battle-tested DeFi protocols, allowing users to:

1. **Earn yield** on stablecoins (Savings)
2. **Borrow** stablecoins against collateral (Vaults)
3. **Participate in governance** (Staking/Sealing)
4. **Earn rewards** through liquidity incentives (Farming)

```
┌─────────────────────────────────────────────────────────────────┐
│                      SKY PROTOCOL ECOSYSTEM                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   GOVERNANCE LAYER                                               │
│   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐        │
│   │   STAKING   │    │   SEALING   │    │   REWARDS   │        │
│   │  (SKY token)│    │ (MKR locked)│    │  (Farming)  │        │
│   └─────────────┘    └─────────────┘    └─────────────┘        │
│                                                                  │
│   STABLECOIN LAYER                                               │
│   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐        │
│   │   SAVINGS   │    │   EXPERT    │    │    TRADE    │        │
│   │   (sUSDS)   │    │  (stUSDS)   │    │   (Swaps)   │        │
│   └─────────────┘    └─────────────┘    └─────────────┘        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Core Tokens

| Token | Description | Use Case |
|-------|-------------|----------|
| **USDS** | Stablecoin pegged to $1 USD | Primary medium of exchange |
| **sUSDS** | Savings USDS (normal savings) | Earn Sky Savings Rate yield |
| **stUSDS** | Staked USDS (expert savings) | Earn yield from SKY-backed borrowers |
| **SKY** | Governance token | Voting, staking, rewards |
| **MKR** | Legacy governance token | Can be sealed or upgraded to SKY |
| **DAI** | Legacy stablecoin | Can be upgraded to USDS |

---

## Key Concepts

### Supply Cap

A **supply cap** is a governance-set limit on how much of a token can be deposited into a protocol module.

**Why caps exist:**
- **Risk management** - Limits protocol exposure if something goes wrong
- **Liquidity control** - Ensures sufficient backing assets
- **Gradual rollout** - New features start with low caps, increase over time

**Example:**
```
┌─────────────────────────────────────────┐
│           stUSDS MODULE                 │
├─────────────────────────────────────────┤
│  Supply Cap:        1,000,000,000 USDS  │
│  Current Supply:      950,000,000 USDS  │
│  Remaining Capacity:   50,000,000 USDS  │ ← Only this much more can be deposited
└─────────────────────────────────────────┘
```

**In code:** See `useStUsdsCapacityData` hook in `/packages/hooks/src/stusds/`

---

### Liquidity

**Liquidity** refers to how easily an asset can be traded without significantly impacting its price.

**High liquidity:**
- Lots of tokens available in pools/reserves
- Easy to trade large amounts
- Minimal price impact (slippage)

**Low liquidity:**
- Few tokens available
- Large trades move the price significantly
- May not be able to withdraw full balance

**Example - stUSDS liquidity:**
```
┌─────────────────────────────────────────┐
│        stUSDS MODULE LIQUIDITY          │
├─────────────────────────────────────────┤
│  Total Deposits:    100,000,000 USDS    │
│  Lent to Borrowers:  95,000,000 USDS    │
│  Available (Idle):    5,000,000 USDS    │ ← Only this can be withdrawn immediately
└─────────────────────────────────────────┘
```

**In code:** See `availableLiquidity` in stUSDS hooks

---

### Collateralization

In DeFi lending, you **borrow against collateral** - assets you lock up as security for a loan.

**Overcollateralization** means your collateral must be worth MORE than your loan:

```
┌─────────────────────────────────────────┐
│           BORROWING EXAMPLE             │
├─────────────────────────────────────────┤
│  Collateral Deposited: $1,500 of SKY    │
│  Amount Borrowed:      $1,000 USDS      │
│  Collateralization:    150%             │
│                                         │
│  Why 150%? Safety buffer for price      │
│  fluctuations. Protocol stays solvent.  │
└─────────────────────────────────────────┘
```

**Collateralization Ratio Formula:**
```
Collateralization Ratio = (Collateral Value / Debt) × 100%
```

---

### Liquidation

**Liquidation** occurs when a borrower's collateral value drops below the required threshold.

```
┌─────────────────────────────────────────────────────────────────┐
│                    LIQUIDATION TIMELINE                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Day 1: User deposits $1,500 ETH, borrows $1,000 USDS           │
│         Collateralization: 150% ✓                                │
│                                                                  │
│  Day 2: ETH price drops 30%                                      │
│         Collateral now worth: $1,050                             │
│         Collateralization: 105% ⚠️ (below 150% threshold)        │
│                                                                  │
│  Day 3: Liquidation triggered                                    │
│         • Liquidator repays user's $1,000 debt                   │
│         • Liquidator receives collateral at discount             │
│         • User loses collateral + penalty (~10-15%)              │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

**Liquidation Price:** The collateral price at which liquidation becomes possible.

```
Liquidation Price = (Debt × Liquidation Ratio) / Collateral Amount
```

**In code:** See `liquidation-price-staking` tooltip in `/packages/widgets/src/data/tooltips/`

---

### Oracle Security Module (OSM)

The **OSM** is a security mechanism that provides **delayed price feeds** for collateral assets.

```
┌─────────────────────────────────────────────────────────────────┐
│                 ORACLE SECURITY MODULE                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   Real-time Price ──► OSM ──► 1 Hour Delay ──► Protocol Uses    │
│                              │                                   │
│                              └─► Security buffer allows:         │
│                                  • Detection of manipulation     │
│                                  • Emergency shutdown if needed  │
│                                  • Protection from flash loans   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

**Why the delay matters for users:**

```
Time 0:00  │  SKY market price drops below your liquidation price
           │  (You're technically underwater but NOT liquidated yet)
           │
Time 0:30  │  You have 30 minutes to add collateral or repay debt!
           │
Time 1:00  │  OSM updates with new price
           │  NOW liquidation can occur
```

**In code:** See `useLsMkrPrice` hook in `/packages/hooks/src/prices/`

---

### Capped OSM Price

The **capped OSM price** is an additional safety mechanism that limits the maximum price the protocol will recognize for collateral.

**Definition (from tooltips):**
> "The SKY price reported by the Oracle Security Module (OSM), capped at a governance-defined limit to prevent overvaluation during debt generation."

**Why capping exists:**

```
┌─────────────────────────────────────────────────────────────────┐
│              WITHOUT CAP (DANGEROUS)                             │
├─────────────────────────────────────────────────────────────────┤
│  1. SKY price spikes to $1.00 (manipulation or bubble)          │
│  2. User stakes 10,000 SKY → valued at $10,000                  │
│  3. User borrows $6,666 USDS (at 150% collateralization)        │
│  4. SKY price crashes to $0.10                                  │
│  5. Collateral now worth $1,000                                 │
│  6. Protocol has $5,666 bad debt! ❌                            │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│              WITH CAP AT $0.10 (SAFE)                            │
├─────────────────────────────────────────────────────────────────┤
│  1. SKY price spikes to $1.00                                   │
│  2. Protocol uses capped price: $0.10                           │
│  3. User stakes 10,000 SKY → valued at $1,000 (capped)          │
│  4. User can only borrow $666 USDS                              │
│  5. SKY price crashes to $0.10                                  │
│  6. Collateral still worth $1,000 - no bad debt! ✓              │
└─────────────────────────────────────────────────────────────────┘
```

**Important edge case - Position blocked by capped price:**

When a user's liquidation price is ABOVE the capped OSM price, the protocol blocks all position modifications (even unstaking):

```
┌─────────────────────────────────────────────────────────────────┐
│           BLOCKED POSITION SCENARIO                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  User's Position:                                                │
│  ├── Staked: 10,000 SKY                                         │
│  ├── Borrowed: 1,000 USDS                                       │
│  └── Liquidation Price: $0.08                                   │
│                                                                  │
│  Protocol Check:                                                 │
│  ├── Capped OSM Price: $0.05                                    │
│  └── Is $0.08 < $0.05? NO!                                      │
│                                                                  │
│  Result: Position is "underwater" at capped price               │
│  Action: ALL modifications blocked (stake, unstake, borrow)     │
│                                                                  │
│  UI Issue: Button shows infinite loading instead of error msg   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

**In code:** See `capped-osm-sky-price` and `max-permitted-risk` tooltips

---

## Product Features

### Savings (sUSDS)

**Simple, low-risk savings product available to all users.**

| Attribute | Value |
|-----------|-------|
| Token received | sUSDS |
| Yield source | Sky Savings Rate (governance-set) |
| Risk level | Very low |
| Networks | Mainnet, Base, Arbitrum, Optimism, Unichain |
| Withdrawal | Always available, 1:1 rate |
| Disclaimer required | No |

**How it works:**
```
Deposit 1,000 USDS → Receive ~1,000 sUSDS
                           │
                           ▼
              sUSDS appreciates over time
                           │
                           ▼
After 1 year (6% APY) → sUSDS worth ~1,060 USDS
```

**In code:** See `/packages/widgets/src/widgets/SavingsWidget/`

---

### Expert Savings (stUSDS)

**Higher-yield but higher-risk product for experienced users.**

| Attribute | Value |
|-----------|-------|
| Token received | stUSDS |
| Yield source | Interest from SKY-backed borrowers |
| Risk level | Medium |
| Networks | **Mainnet only** |
| Withdrawal | Depends on available liquidity |
| Disclaimer required | **Yes** |

**Key differences from normal savings:**

1. **Liquidity risk:** Your USDS is lent to borrowers. If all liquidity is utilized, you cannot withdraw until borrowers repay.

2. **Required disclaimers:**
   - Risk disclaimer before accessing the module
   - Checkbox when depositing: "I understand that USDS deposited into the stUSDS module is used to fund borrowing against SKY..."

3. **Dual provider routing:** Automatic switching between native stUSDS and Curve pool (see next section)

**Yield calculation:**
```
stUSDS Rate = Utilization × (SKY Borrow Rate - Accessibility Reward)
            + (1 - Utilization) × Sky Savings Rate
```

**In code:** See `/packages/widgets/src/widgets/StUSDSWidget/`

---

### Staking

**Lock SKY tokens to earn rewards and participate in governance.**

| Attribute | Value |
|-----------|-------|
| Token staked | SKY |
| Rewards | SKY tokens + voting power |
| Risk level | Medium (SKY price volatility) |
| Lock period | None (can unstake anytime) |

**Features:**
- Delegate voting power to governance representatives
- Earn staking rewards (variable APY)
- Can borrow USDS against staked SKY

**In code:** See `/packages/widgets/src/widgets/StakeModuleWidget/`

---

### Rewards (Farming)

**Deposit tokens to earn bonus reward emissions.**

| Attribute | Value |
|-----------|-------|
| Tokens accepted | USDS, LP tokens, etc. |
| Rewards | SKY tokens |
| Risk level | Low to Medium |
| Purpose | Incentivize liquidity in specific pools |

**How farming works:**
```
Protocol allocates: 10,000 SKY/month to USDS farm
You deposit: 1,000 USDS (1% of pool)
You earn: ~100 SKY/month (1% of emissions)
```

**In code:** See `/packages/widgets/src/widgets/RewardsWidget/`

---

### Sealing

**Long-term MKR lockup for boosted rewards.**

| Attribute | Value |
|-----------|-------|
| Token sealed | MKR |
| Rewards | Boosted SKY rewards |
| Risk level | Medium |
| Lock period | **Fixed duration** (cannot withdraw early) |

**Trade-off:** Higher rewards for longer commitment.

**Note:** Seal Engine is deprecated. New positions cannot be created.

**In code:** See `/packages/widgets/src/widgets/SealModuleWidget/`

---

## stUSDS Curve Integration

### Overview

The stUSDS module now supports **dual-provider routing** - automatically choosing between:

1. **Native stUSDS contract** - Direct deposit/withdraw
2. **Curve USDS/stUSDS pool** - Swap-based alternative

```
┌─────────────────────────────────────────────────────────────────┐
│               PROVIDER SELECTION FLOW                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   User wants to deposit USDS → get stUSDS                       │
│                     │                                            │
│                     ▼                                            │
│   ┌─────────────────────────────────────┐                       │
│   │     Provider Selection Logic        │                       │
│   │  (useStUsdsProviderSelection.ts)    │                       │
│   └──────────────┬──────────────────────┘                       │
│                  │                                               │
│         ┌───────┴───────┐                                       │
│         ▼               ▼                                        │
│   ┌──────────┐    ┌──────────┐                                  │
│   │  Native  │    │  Curve   │                                  │
│   │  stUSDS  │    │  Pool    │                                  │
│   └──────────┘    └──────────┘                                  │
│   • Direct deposit   • Swap USDS→stUSDS                         │
│   • No fees          • ~0.04% fee                               │
│   • Subject to cap   • No cap (liquidity only)                  │
│   • Always 1:1 rate  • Rate varies slightly                     │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Provider Selection Logic

| Scenario | Provider Used |
|----------|---------------|
| Both available, similar rates (<0.1% diff) | Native (default) |
| Both available, Curve ≥0.1% better | Curve |
| Native blocked (cap reached) | Curve |
| Curve blocked (low liquidity) | Native |
| Both blocked | Error state |

### Blocking Reasons

**Native provider blocked:**
- `SUPPLY_CAPACITY_REACHED` - Supply cap hit
- `LIQUIDITY_EXHAUSTED` - No USDS available for withdrawals

**Curve provider blocked:**
- `CURVE_INSUFFICIENT_STUSDS_LIQUIDITY` - Pool stUSDS reserve < 0.01
- `CURVE_INSUFFICIENT_USDS_LIQUIDITY` - Pool USDS reserve < 0.01

### Configuration Constants

From `/packages/hooks/src/stusds/providers/constants.ts`:

| Constant | Value | Purpose |
|----------|-------|---------|
| `rateSwitchThresholdBps` | 10 (0.1%) | Minimum rate difference to switch providers |
| `maxSlippageBps` | 50 (0.5%) | Maximum acceptable slippage |
| `maxPriceImpactBps` | 200 (2%) | Maximum acceptable price impact |

### Key Files

```
packages/hooks/src/stusds/providers/
├── useStUsdsProviderSelection.ts  # Main orchestration hook
├── useNativeStUsdsProvider.ts     # Native contract wrapper
├── useCurveStUsdsProvider.ts      # Curve pool wrapper
├── useCurveQuote.ts               # Get quotes from Curve
├── useCurvePoolData.ts            # Read pool state
├── useCurveSwap.ts                # Execute single swap
├── useBatchCurveSwap.ts           # Batched approve + swap
├── rateComparison.ts              # Rate comparison logic
├── types.ts                       # TypeScript types/enums
└── constants.ts                   # Configuration constants

packages/widgets/src/widgets/StUSDSWidget/components/
├── ProviderIndicator.tsx          # Shows which provider is selected
└── StUSDSSupplyWithdraw.tsx       # Main supply/withdraw UI
```

### UI Indicators

The `ProviderIndicator` component shows users which provider is being used and why:

| Reason | Display |
|--------|---------|
| Supply cap reached | Blue info badge |
| Better rate (>0.1%) | Blue info badge |
| Premium 2-10% | Amber warning badge |
| All providers blocked | Red error badge |

---

## Common Issues & Edge Cases

### 1. Infinite Loading on Unstake

**Symptom:** User clicks unstake, button spins forever.

**Cause:** Position's liquidation price is above capped OSM price.

**Technical explanation:**
```
User's liquidation price: $0.08
Capped OSM price: $0.05

Protocol view: "At $0.05, this position is already past
liquidation ($0.08). Cannot allow any collateral removal."

Result: Contract reverts, UI shows loading instead of error.
```

**Solution:** Improve error handling to show clear message.

### 2. Cannot Deposit Despite Having USDS

**Symptom:** User has USDS but deposit fails.

**Possible causes:**
1. Supply cap reached (native provider)
2. Insufficient liquidity in Curve pool
3. Price impact too high

**Solution:** Provider selection should automatically route to available provider or show clear error.

### 3. Withdrawal Amount Exceeds Available

**Symptom:** User tries to withdraw more than available liquidity.

**Cause:** stUSDS utilization is high - most USDS is lent to borrowers.

**Solution:**
- UI shows available liquidity
- Curve fallback provides additional exit liquidity
- User can withdraw up to combined native + Curve liquidity

---

## Glossary

| Term | Definition |
|------|------------|
| **APY** | Annual Percentage Yield - yearly return including compounding |
| **Cap** | Maximum amount that can be deposited into a module |
| **Collateral** | Asset locked up to secure a loan |
| **Collateralization Ratio** | Collateral value divided by debt value |
| **DEX** | Decentralized Exchange (e.g., Curve, Uniswap) |
| **Liquidation** | Forced sale of collateral when position becomes unsafe |
| **Liquidation Price** | Collateral price at which liquidation triggers |
| **Liquidity** | Available tokens for trading or withdrawal |
| **Oracle** | Price feed provider for smart contracts |
| **OSM** | Oracle Security Module - delayed price feed |
| **Capped OSM Price** | Maximum price protocol will recognize for collateral |
| **Price Impact** | How much a trade moves the market price |
| **Slippage** | Difference between expected and actual execution price |
| **TVL** | Total Value Locked - total assets in a protocol |
| **Utilization** | Percentage of deposits currently lent out |

---

## E2E Test Scenarios: User Lifecycle Stories

This section documents realistic user journey stories that demonstrate how different types of users interact with the Sky protocol. These scenarios represent real business use cases and user behaviors.

---

### Story 1: The Conservative Saver (Alice)

**Persona:** Alice is a risk-averse user who wants stable yield on her stablecoins. She doesn't want exposure to volatile assets or complex DeFi mechanics.

```
CHAPTER 1: First-Time Onboarding
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Alice has 10,000 USDC sitting in her wallet earning nothing.

Day 1 - Discovery:
├── Alice connects her wallet to Sky.money
├── She accepts the Terms of Service
├── She sees the Savings tab showing 6% APY
└── She thinks: "That's better than my bank's 0.5%"

Day 1 - First Deposit:
├── Alice navigates to Trade tab
├── She swaps 10,000 USDC → 10,000 USDS (1:1 via PSM)
├── She navigates to Savings tab
├── She clicks "100%" to deposit all her USDS
├── She confirms the transaction
└── Result: Alice now has ~10,000 sUSDS earning 6% APY

Day 30 - Checking Progress:
├── Alice returns to check her balance
├── Her sUSDS is now worth ~10,049 USDS
├── She's earned ~$49 in passive income
└── She decides to keep it deposited

Day 90 - Partial Withdrawal:
├── Alice needs $2,000 for an emergency
├── She goes to Savings → Withdraw tab
├── She enters 2,000 USDS to withdraw
├── Transaction succeeds immediately (high liquidity)
├── She swaps 2,000 USDS → USDC
└── Result: Still has ~8,150 sUSDS earning yield

VERIFICATION POINTS:
□ Savings supply flow works end-to-end
□ sUSDS appreciates over time (mine blocks to simulate)
□ Partial withdrawal succeeds
□ Balance updates correctly after each action
□ User can swap USDS ↔ USDC freely
```

---

### Story 2: The Yield Optimizer (Bob)

**Persona:** Bob is an experienced DeFi user who wants maximum yield. He understands the risks of Expert modules and is comfortable with liquidity constraints.

```
CHAPTER 1: Migrating from Legacy Maker
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Bob has 50,000 DAI in his wallet from the old Maker days.

Day 1 - Upgrade Legacy Tokens:
├── Bob goes to Upgrade tab
├── He enters 50,000 DAI to upgrade
├── He confirms the upgrade transaction
├── DAI converts to USDS 1:1
└── Result: Bob now has 50,000 USDS

Day 1 - Discover Expert Module:
├── Bob notices "Expert" tab with higher APY (8-12%)
├── He clicks Expert → sees risk disclaimer
├── He reads about liquidity risks carefully
├── He dismisses the disclaimer (persists across sessions)
└── He sees stUSDS stats: Rate, Utilization, TVL

CHAPTER 2: Strategic Allocation
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Day 1 - Split Strategy:
├── Bob decides: 70% Expert (higher yield), 30% Regular (safe)
│
├── EXPERT DEPOSIT (35,000 USDS):
│   ├── Goes to Expert → stUSDS
│   ├── Enters 35,000 USDS
│   ├── Sees "You will supply 35,000 USDS"
│   ├── MUST check disclaimer: "I understand USDS is used to fund borrowing..."
│   ├── Confirms transaction
│   └── Receives stUSDS tokens
│
└── REGULAR SAVINGS (15,000 USDS):
    ├── Goes to Savings tab
    ├── Deposits remaining 15,000 USDS
    └── Receives sUSDS tokens

CHAPTER 3: Supply Cap Scenario
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Day 30 - Bob wants to deposit more, but cap is reached:
├── Bob acquires another 20,000 USDS
├── He goes to Expert → stUSDS
├── He enters 20,000 USDS
├── UI shows: "Routing through Curve pool" indicator
├── Reason shown: "supply capacity is reached"
├── Bob proceeds anyway (understands Curve fee ~0.04%)
├── Transaction routes through Curve pool
└── Success message: "You've swapped 20,000 USDS for stUSDS via Curve pool"

CHAPTER 4: Liquidity Crunch Withdrawal
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Day 60 - Bob needs to exit, but utilization is 95%:
├── Bob wants to withdraw 30,000 USDS from stUSDS
├── Available native liquidity: only 10,000 USDS
├── Curve pool liquidity: 25,000 USDS available
│
├── ATTEMPT 1 - Native only would fail:
│   └── "Insufficient liquidity in module" error
│
├── ACTUAL FLOW - System routes optimally:
│   ├── UI shows withdrawal will use Curve
│   ├── Bob confirms withdrawal
│   ├── 30,000 stUSDS swapped via Curve for ~29,988 USDS
│   └── Small slippage but exit successful
│
└── Bob's takeaway: "Curve fallback saved me from being stuck"

VERIFICATION POINTS:
□ DAI → USDS upgrade works
□ Expert disclaimer flow (show, dismiss, persist)
□ stUSDS supply with disclaimer checkbox
□ Provider switching when cap reached
□ Curve fallback for withdrawals during low liquidity
□ Different success messages for native vs Curve
```

---

### Story 3: The Governance-Active Staker (Carol)

**Persona:** Carol is a SKY token holder who wants to participate in governance while earning yield. She's also willing to borrow against her position for capital efficiency.

```
CHAPTER 1: Opening a Staking Position
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Carol has 5,000,000 SKY tokens and wants to put them to work.

Day 1 - Create Position with Borrowing + Delegation:
├── Carol goes to "Stake & Borrow" tab
├── She enters 5,000,000 SKY to stake
├── She checks current SKY price and calculates safe borrow amount
├── She enters 50,000 USDS to borrow (conservative, ~3% of collateral value)
├── She checks "Do you want to delegate voting power?" ✓
├── She clicks Review
│
├── STEP 2 - Choose Reward Token:
│   ├── Screen shows available reward options
│   ├── Carol selects "SKY" as reward token
│   └── Clicks Next
│
├── STEP 3 - Choose Delegate:
│   ├── Screen shows list of delegates with their platforms
│   ├── Carol researches delegate voting history
│   ├── She selects a delegate aligned with her values
│   └── Clicks Next
│
├── STEP 4 - Confirm Position:
│   ├── Summary shows:
│   │   • Staking: 5M SKY
│   │   • Borrowing: 50K USDS
│   │   • Reward: SKY
│   │   • Delegate: [Selected Name]
│   │   • Collateralization ratio: ~3000%
│   │   • Liquidation price: $0.003 (very safe)
│   ├── Carol confirms the transaction
│   └── Success: "You've borrowed 50,000 USDS by staking 5,000,000 SKY"
│
└── Result: Carol has USDS to use while her SKY earns rewards

CHAPTER 2: Using Borrowed USDS Productively
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Day 1 - Compound Strategy:
├── Carol takes her 50,000 borrowed USDS
├── She deposits it into Rewards farm (USDS → SKY)
├── Now she's earning:
│   • Staking rewards on her 5M SKY
│   • Farming rewards on her 50K USDS
│   • Her delegate votes on her behalf
└── Capital efficiency maximized!

CHAPTER 3: Managing Position Over Time
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Day 30 - SKY price increased, Carol wants to borrow more:
├── Carol goes to "Manage Position"
├── Current position shows:
│   • Staked: 5M SKY
│   • Borrowed: 50K USDS
│   • Collat. ratio: 4500% (SKY appreciated!)
│   • Risk level: Very Low
│
├── She uses the RISK SLIDER:
│   ├── Drags slider from "Very Low" toward "Medium"
│   ├── Borrow input automatically updates to ~150K USDS
│   ├── Liquidation price updates in real-time
│   ├── She fine-tunes by typing 120K in borrow input
│   └── Slider position adjusts to match
│
├── She clicks Review → Skip reward change → Skip delegate change
├── Confirms position change
└── Success: "You've borrowed 70,000 USDS. Your position is updated."
    (Additional 70K on top of existing 50K)

Day 60 - Market downturn, Carol de-risks:
├── SKY price dropped 40%, her liquidation price is getting closer
├── She goes to "Unstake and pay back" tab
├── She sees her position risk level is now "Medium-High"
│
├── OPTION A - Repay debt:
│   ├── She has USDS from farming rewards
│   ├── She clicks "100%" on repay input
│   ├── Confirms repayment
│   └── Debt cleared, collateralization ratio improves
│
├── OPTION B - Add more collateral:
│   ├── She buys more SKY
│   ├── Stakes additional SKY to position
│   └── Liquidation price moves lower (safer)
│
└── Carol chooses Option A, repays all debt, position now safe

CHAPTER 4: Changing Delegate
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Day 90 - Carol's delegate voted against her interests:
├── Carol goes to Manage Position
├── She makes a small position change (borrow 1 USDS)
├── She skips reward selection
├── On delegate screen, she selects a NEW delegate
├── Confirms the change
└── Her voting power now goes to new delegate

VERIFICATION POINTS:
□ Full staking position creation flow (stake → rewards → delegate → confirm)
□ Position without delegation skips delegate screen
□ Risk slider ↔ borrow input two-way sync
□ Position overview updates (collat ratio, liquidation price, risk level)
□ Borrow more against existing position
□ Repay debt flow
□ Change delegate on existing position
□ Delegation checkbox toggle clears previous selection
```

---

### Story 4: The Arbitrageur (Dave)

**Persona:** Dave is a sophisticated trader who looks for rate differences between protocols. He uses the stUSDS Curve integration strategically.

```
CHAPTER 1: Rate Arbitrage Opportunity
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Day 1 - Dave notices Curve pool is mispriced:
├── Native stUSDS rate: 1 USDS = 0.98 stUSDS
├── Curve pool rate: 1 USDS = 0.985 stUSDS (0.5% better)
├── System shows: "Using Curve pool" with "better rate" indicator
│
├── Dave deposits 100,000 USDS:
│   ├── UI shows Curve will be used (better rate)
│   ├── Expected output: ~98,500 stUSDS
│   ├── Native would have given: ~98,000 stUSDS
│   ├── Arbitrage gain: ~500 stUSDS (~$500)
│   └── Dave confirms transaction
│
└── Result: Dave got better rate automatically

CHAPTER 2: Exit During Liquidity Event
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Day 30 - Market panic, everyone withdrawing from stUSDS:
├── Native module: 99% utilization, only 100K USDS available
├── Curve pool: 2M USDS available
│
├── Dave wants to withdraw 500K stUSDS:
│   ├── Native alone cannot service this
│   ├── System routes through Curve
│   ├── Price impact: 0.8% (acceptable)
│   ├── Dave receives: ~495,000 USDS
│   └── Still better than being stuck!
│
└── Dave's insight: "Curve is my escape hatch"

CHAPTER 3: Both Providers Blocked (Edge Case)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Extreme scenario - Total liquidity crisis:
├── Native: Supply cap reached + 100% utilization
├── Curve: Pool drained by arbitrageurs
│
├── Dave tries to deposit:
│   ├── UI shows: "Both native and Curve routes are temporarily unavailable"
│   ├── Red error indicator displayed
│   ├── Review button is disabled
│   └── Dave must wait for liquidity to return
│
├── Dave tries to withdraw:
│   ├── Same error state
│   └── Cannot exit until borrowers repay or Curve rebalances
│
└── This is the risk disclosed in Expert disclaimer!

VERIFICATION POINTS:
□ Provider indicator shows "better rate" when Curve selected
□ Rate comparison threshold (0.1%) triggers switching
□ Curve handles large withdrawals during low native liquidity
□ Both-providers-blocked error state
□ Price impact shown for large Curve transactions
```

---

### Story 5: The Legacy Maker User (Eve)

**Persona:** Eve has been using Maker since 2020. She has DAI and MKR tokens and wants to migrate to the new Sky ecosystem.

```
CHAPTER 1: Full Migration Journey
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Eve's starting position:
├── 100,000 DAI (legacy stablecoin)
├── 1,000 MKR (legacy governance token)
└── Goal: Migrate everything to Sky ecosystem

Day 1 - Upgrade DAI to USDS:
├── Eve goes to Upgrade tab
├── She selects DAI → USDS
├── She enters 100,000 DAI
├── She sees: "You will receive 100,000 USDS"
├── She confirms (1:1 conversion, no fees)
└── Result: 100,000 USDS in wallet

Day 1 - Upgrade MKR to SKY:
├── Eve selects MKR → SKY upgrade
├── She enters 1,000 MKR
├── She sees exchange rate: 1 MKR = 24,000 SKY
├── WARNING: "Delayed Upgrade Penalty" notice
│   └── Current penalty: X% (increases quarterly)
├── She sees: "You will receive ~24,000,000 SKY minus penalty"
├── She confirms upgrade
└── Result: ~23,760,000 SKY (after 1% penalty)

Day 1 - Put Everything to Work:
├── USDS → Expert Savings (stUSDS):
│   ├── 70,000 USDS to stUSDS for high yield
│   └── Accepts liquidity risk disclaimer
│
├── USDS → Rewards Farm:
│   ├── 30,000 USDS to USDS→SKY farm
│   └── Will earn more SKY tokens
│
└── SKY → Staking with Borrowing:
    ├── Stakes 20,000,000 SKY
    ├── Borrows 100,000 USDS against it
    ├── Delegates to preferred governance delegate
    └── Uses borrowed USDS for more farming

CHAPTER 2: The Virtuous Cycle
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Monthly routine for Eve:

Week 1: Claim & Compound
├── Go to Rewards → Claim SKY rewards
├── Go to Staking → Claim staking rewards
├── Compound: Stake new SKY into existing position
└── Result: Position grows organically

Week 2: Monitor Risk
├── Check staking position health
├── If SKY price dropped: Consider repaying some debt
├── If SKY price increased: Maybe borrow more
└── Adjust risk slider as needed

Week 4: Rebalance
├── Check Expert vs Regular savings rates
├── Move funds if rate differential > 2%
├── Harvest USDS yield, re-deploy
└── Tax note: Track all transactions!

VERIFICATION POINTS:
□ DAI → USDS upgrade (1:1)
□ MKR → SKY upgrade (with penalty display)
□ Multi-product allocation in single session
□ Reward claiming flows
□ Position compounding (stake more into existing)
□ Cross-product fund movement
```

---

### Story 6: The Position-in-Trouble User (Frank)

**Persona:** Frank opened a high-risk staking position. Market moved against him and he needs to manage a near-liquidation scenario.

```
CHAPTER 1: Aggressive Position Goes Wrong
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Frank's original position:
├── Staked: 10,000,000 SKY
├── Borrowed: 300,000 USDS (aggressive, near max)
├── Initial SKY price: $0.05
├── Initial collat. ratio: 166%
├── Initial liquidation price: $0.045
└── Risk level: High

Day 30 - SKY drops 25%:
├── New SKY price: $0.0375
├── Position status:
│   • Collateral value: $375,000
│   • Debt: $300,000 + interest = $302,000
│   • Collat. ratio: 124% (DANGER!)
│   • Liquidation price: $0.045 (current price approaching!)
│   • Risk level: CRITICAL
│
└── Frank receives no notification (DeFi - monitor yourself!)

CHAPTER 2: Emergency Response Options
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Frank discovers his position and panics:

OPTION A - Repay Debt (Best if he has USDS):
├── Frank goes to "Unstake and pay back"
├── He needs to repay quickly
├── He has 100,000 USDS in savings
├── He withdraws from sUSDS
├── He repays 100,000 USDS to position
├── New collat. ratio: 186% (safer)
└── Crisis averted, but cost him his savings

OPTION B - Add Collateral (Best if he has more SKY):
├── Frank buys 5,000,000 more SKY
├── Goes to Stake & Borrow → his position
├── Stakes additional 5,000,000 SKY
├── New collateral: 15,000,000 SKY = $562,500
├── New collat. ratio: 186%
└── Position saved, but needed more capital

OPTION C - Partial Close (Balanced approach):
├── Frank unstakes 25% of SKY (receives 2,500,000 SKY)
├── Sells SKY for USDS
├── Repays debt with proceeds
├── Reduced position, reduced risk
└── Lives to trade another day

CHAPTER 3: The Capped OSM Edge Case
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Extreme scenario - Frank's liquidation price > Capped OSM price:

Setup:
├── Frank's liquidation price: $0.08
├── Capped OSM price: $0.05
├── Protocol's view: "At $0.05, this position is underwater"
│
├── Frank tries to unstake even 1 SKY:
│   ├── Clicks unstake
│   ├── Button shows loading...
│   ├── Loading continues indefinitely...
│   ├── (Contract reverts, UI doesn't handle gracefully)
│   └── Frank is confused and frustrated
│
├── What SHOULD happen (UI improvement needed):
│   ├── Error message: "Position cannot be modified"
│   ├── Explanation: "Liquidation price above capped OSM price"
│   ├── Suggested action: "Repay debt or wait for price recovery"
│   └── Link to documentation
│
└── Current workaround: Frank must repay debt first, then unstake

VERIFICATION POINTS:
□ High-risk position creation
□ Position health indicators update with price changes
□ Repay debt flow under pressure
□ Add collateral to existing position
□ Partial position close (unstake + sell + repay)
□ Capped OSM blocking scenario (UI should show error, not infinite load)
□ OSM 1-hour delay behavior (price takes 1 hour to update)
```

---

### Story 7: The Multi-Chain User (Grace)

**Persona:** Grace uses Sky protocol across multiple chains. She understands that different features are available on different networks.

```
CHAPTER 1: Cross-Chain Strategy
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Grace's understanding of chain availability:

MAINNET (Full Features):
├── ✅ Savings (sUSDS)
├── ✅ Expert Savings (stUSDS) ← MAINNET ONLY!
├── ✅ Staking & Borrowing
├── ✅ Rewards Farming
├── ✅ Upgrade (DAI→USDS, MKR→SKY)
├── ✅ Trade
└── ✅ Seal Engine (deprecated)

L2 CHAINS (Base, Arbitrum, Optimism, Unichain):
├── ✅ Savings (sUSDS)
├── ❌ Expert Savings - NOT AVAILABLE
├── ❌ Staking - NOT AVAILABLE
├── ✅ Trade
└── Lower gas fees!

Grace's Strategy:
├── Mainnet: Complex operations (Staking, Expert)
├── L2s: Simple savings with lower gas
└── Bridge USDS between chains as needed

CHAPTER 2: L2 Savings for Gas Efficiency
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Grace deposits on Base for lower fees:

Day 1:
├── Grace switches network to Base
├── She has USDS on Base (bridged earlier)
├── She goes to Savings tab
├── She deposits 5,000 USDS
├── Gas cost: ~$0.01 (vs ~$5 on mainnet)
└── Same APY as mainnet!

Day 30:
├── Grace wants Expert savings (higher yield)
├── She switches to Mainnet
├── Expert tab is now visible
├── She bridges USDS from Base → Mainnet
├── She deposits into stUSDS
└── Accepts the mainnet gas cost for higher yield

VERIFICATION POINTS:
□ Savings works on all supported L2s
□ Expert module only visible on Mainnet
□ Network switching updates available features
□ Same core flows work across chains
```

---

### Test Implementation Notes

When implementing these stories as E2E tests:

**State Management:**
```typescript
// Set up initial balances for each persona
await setErc20Balance(usdsAddress, '100000', 18, network, aliceAddress);
await setErc20Balance(skyAddress, '5000000', 18, network, carolAddress);
await setErc20Balance(daiAddress, '100000', 18, network, eveAddress);
```

**Time Simulation:**
```typescript
// Simulate time passing for yield accrual
await mineBlock(); // Advance blockchain state
await page.reload(); // Refresh to see updated balances
```

**Provider State Manipulation:**
```typescript
// For Story 4 (Arbitrageur) - force different provider states
await enableNativeProvider();  // High cap, native available
await forceCurveProvider();    // Cap reached, forces Curve
```

**Risk Scenarios:**
```typescript
// For Story 6 (Position in Trouble)
// Manipulate oracle price to simulate market crash
// This requires Tenderly state override for OSM contract
```

---

### Running Story-Based Tests

```bash
# Run all user journey tests
pnpm playwright test --grep "Story"

# Run specific persona
pnpm playwright test --grep "Conservative Saver"
pnpm playwright test --grep "Yield Optimizer"
pnpm playwright test --grep "Governance-Active Staker"

# Run with visual debugging
pnpm e2e:ui
```

---

## Related Documentation

- [Tooltips Reference](/packages/widgets/src/data/tooltips/index.ts) - UI tooltip definitions
- [stUSDS Provider Types](/packages/hooks/src/stusds/providers/types.ts) - TypeScript type definitions
- [E2E Tests](/apps/webapp/src/test/e2e/tests/) - Test scenarios for various edge cases
- [Test Utilities](/apps/webapp/src/test/e2e/utils/) - Helper functions for E2E tests

---

*Last updated: January 2025*
