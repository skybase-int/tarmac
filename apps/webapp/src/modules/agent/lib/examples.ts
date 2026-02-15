export type SuggestedAction = {
  label: string;
  input: string;
};

/**
 * Suggested actions keyed by widget name (matching IntentMapping values).
 * Each action has a display label and the natural language input to parse.
 */
export const SUGGESTED_ACTIONS: Record<string, SuggestedAction[]> = {
  savings: [
    { label: 'Deposit 250 USDS', input: 'Deposit 250 USDS into savings' },
    { label: 'Withdraw 200 USDS', input: 'Withdraw 200 USDS from savings' },
    { label: 'Redeem 50 sUSDS', input: 'Redeem 50 sUSDS' },
    { label: 'Mint 100 sUSDS', input: 'Mint 100 sUSDS' }
  ],
  upgrade: [
    { label: 'Upgrade 1000 DAI to USDS', input: 'Upgrade 1000 DAI to USDS' },
    { label: 'Revert 500 USDS to DAI', input: 'Revert 500 USDS back to DAI' },
    { label: 'Upgrade 10 MKR to SKY', input: 'Upgrade 10 MKR to SKY' },
    { label: 'Revert 24000 SKY to MKR', input: 'Revert 24000 SKY to MKR' }
  ],
  rewards: [
    { label: 'Supply 500 USDS for SKY', input: 'Supply 500 USDS to earn SKY rewards' },
    { label: 'Supply 500 USDS for SPK', input: 'Supply 500 USDS to earn SPK' },
    { label: 'Supply 400 USDS for CLE', input: 'Supply 400 USDS to earn CLE' },
    { label: 'Claim all rewards', input: 'Claim all my rewards' }
  ],
  stake: [
    { label: 'Open position with 1000 SKY', input: 'Open a staking position with 1000 SKY' },
    { label: 'Lock 200 SKY into position', input: 'Lock 200 more SKY into my position' },
    { label: 'Free 100 SKY', input: 'Free 100 SKY from my staking position' },
    { label: 'Borrow 100 USDS', input: 'Borrow 100 USDS against my stake' }
  ],
  stusds: [
    { label: 'Deposit 500 USDS', input: 'Deposit 500 USDS into stUSDS' },
    { label: 'Withdraw 200 USDS', input: 'Withdraw 200 USDS from stUSDS' }
  ]
};
