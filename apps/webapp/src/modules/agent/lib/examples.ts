export type SuggestedAction = {
  label: string;
  input: string;
  tokens: string[];
  /** Wallet token symbol used to personalize amount. Omit for actions that don't depend on wallet balance. */
  sourceToken?: string;
  /** Default amount shown when wallet has no balance or is disconnected. */
  defaultAmount?: number;
  /** If true, exclude from the combined "all" list on the balances page. */
  hideFromAll?: boolean;
  /** Optional badge text shown next to the action label (e.g. "New"). */
  badge?: string;
  /** Rate key for dynamic rate substitution. The label should contain {rate} placeholder. */
  rateKey?: 'vaults' | 'rewards' | 'savings' | 'stusds' | 'staking';
  /** Module key for displaying the module icon next to the action. */
  module?: string;
};

/**
 * Suggested actions keyed by widget name (matching IntentMapping values).
 * Each action has a display label, the natural language input to parse, and token symbols for icons.
 * Actions with sourceToken + defaultAmount will have their amounts personalized based on wallet balance.
 */
export const SUGGESTED_ACTIONS: Record<string, SuggestedAction[]> = {
  savings: [
    { label: 'Deposit {amount} USDS and start earning', input: 'Deposit {amount} USDS into savings', tokens: ['USDS'], sourceToken: 'USDS', defaultAmount: 250 },
    { label: 'Withdraw 200 USDS', input: 'Withdraw 200 USDS from savings', tokens: ['USDS'], hideFromAll: true }
  ],
  upgrade: [
    { label: 'Upgrade {amount} DAI to USDS', input: 'Upgrade {amount} DAI to USDS', tokens: ['DAI', 'USDS'], sourceToken: 'DAI', defaultAmount: 1000 },
    { label: 'Revert {amount} USDS to DAI', input: 'Revert {amount} USDS back to DAI', tokens: ['USDS', 'DAI'], sourceToken: 'USDS', defaultAmount: 500, hideFromAll: true },
    { label: 'Upgrade {amount} MKR to SKY', input: 'Upgrade {amount} MKR to SKY', tokens: ['MKR', 'SKY'], sourceToken: 'MKR', defaultAmount: 10 },
    { label: 'Revert {amount} SKY to MKR', input: 'Revert {amount} SKY to MKR', tokens: ['SKY', 'MKR'], sourceToken: 'SKY', defaultAmount: 24000, hideFromAll: true }
  ],
  rewards: [
    { label: 'Supply {amount} USDS and earn SKY rewards', input: 'Supply {amount} USDS to earn SKY rewards', tokens: ['USDS', 'SKY'], sourceToken: 'USDS', defaultAmount: 500 },
    { label: 'Supply {amount} USDS and earn SPK rewards', input: 'Supply {amount} USDS to earn SPK', tokens: ['USDS', 'SPK'], sourceToken: 'USDS', defaultAmount: 500 },
    { label: 'Supply {amount} USDS and earn CLE rewards', input: 'Supply {amount} USDS to earn CLE', tokens: ['USDS', 'CLE'], sourceToken: 'USDS', defaultAmount: 400 },
    { label: 'Claim all rewards', input: 'Claim all my rewards', tokens: ['SKY', 'SPK', 'CLE'] }
  ],
  stake: [
    { label: 'Open position with {amount} SKY', input: 'Open a staking position with {amount} SKY', tokens: ['SKY'], sourceToken: 'SKY', defaultAmount: 1000 },
    { label: 'Lock {amount} SKY into position', input: 'Lock {amount} more SKY into my position', tokens: ['SKY'], sourceToken: 'SKY', defaultAmount: 200 },
    { label: 'Free 100 SKY', input: 'Free 100 SKY from my staking position', tokens: ['SKY'], hideFromAll: true },
    { label: 'Borrow 100 USDS', input: 'Borrow 100 USDS against my stake', tokens: ['USDS'] }
  ],
  stusds: [
    { label: 'Deposit {amount} USDS', input: 'Deposit {amount} USDS into stUSDS', tokens: ['USDS'], sourceToken: 'USDS', defaultAmount: 500 },
    { label: 'Withdraw 200 USDS', input: 'Withdraw 200 USDS from stUSDS', tokens: ['USDS'], hideFromAll: true }
  ],
  morpho: [
    { label: 'Supply {amount} USDS to USDS Risk Capital', input: 'Deposit {amount} USDS into Morpho vault', tokens: ['USDS'], sourceToken: 'USDS', defaultAmount: 500, badge: 'New' },
    { label: 'Withdraw {amount} USDS from USDS Risk Capital', input: 'Withdraw {amount} USDS from Morpho vault', tokens: ['USDS'], sourceToken: 'USDS', defaultAmount: 200, hideFromAll: true }
  ],
  stables: [
    { label: 'Earn up to {rate} with Vaults', input: 'Deposit {amount} USDS into Morpho vault', tokens: ['USDS', 'USDC', 'USDT'], sourceToken: 'USDS', defaultAmount: 500, rateKey: 'vaults', badge: 'New', module: 'morpho' },
    { label: 'Earn up to {rate} in Rewards', input: 'Supply {amount} USDS to earn rewards', tokens: ['SKY', 'SPK', 'CLE'], sourceToken: 'USDS', defaultAmount: 500, rateKey: 'rewards', module: 'rewards' },
    { label: 'Earn {rate} with Sky Savings', input: 'Deposit {amount} USDS into savings', tokens: ['sUSDS'], sourceToken: 'USDS', defaultAmount: 250, rateKey: 'savings', module: 'savings' },
    { label: 'Earn {rate} with stUSDS', input: 'Deposit {amount} USDS into stUSDS', tokens: ['stUSDS'], sourceToken: 'USDS', defaultAmount: 500, rateKey: 'stusds', module: 'stusds' }
  ],
  sky: [
    { label: 'Stake SKY and earn up to {rate}', input: 'Open a staking position with {amount} SKY', tokens: ['SKY'], sourceToken: 'SKY', defaultAmount: 1000, rateKey: 'staking', module: 'stake' },
    { label: 'Borrow USDS', input: 'Borrow 100 USDS against my stake', tokens: ['USDS'], module: 'stake' }
  ]
};
