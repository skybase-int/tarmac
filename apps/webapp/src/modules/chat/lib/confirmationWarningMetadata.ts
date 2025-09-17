import { Intent } from '@/lib/enums';
import { ChatIntent } from '../types/Chat';
import { IntentMapping, mapQueryParamToIntent } from '@/lib/constants';

// TEMPORARY: This is a temp data structure for testing purposes. Real data will be included later.

interface SpeedBumpContent {
  title: string;
  functionality: string;
  slug: string;
  restrictions: string[];
  howItWorks: string;
  associatedRisks: string[];
}

const upgradeSpeedBump: SpeedBumpContent = {
  title: 'Upgrade',
  functionality: 'upgrade',
  slug: 'upgrade',
  restrictions: ['- None.'],
  howItWorks: `#### MKR ↔ SKY
- A user can upgrade their MKR to SKY at a rate of 1:24,000
- This will not always be bi-directional

#### DAI ↔ USDS
- A user can upgrade their DAI to USDS at a rate of 1:1
- This will always be bi-directional

#### sUSDS ↔ USDS
- A user can upgrade their savings USDS to USDS
- This will always be bi-directional`,
  associatedRisks: [
    `#### MKR ↔ SKY
- **Directionality**: This will not always be bi-directional. From March '25, it is anticipated that one-directionality may be implemented (it will be completed by June at the latest).
- **Token Conversion**: Once one-directionality has been implemented, a user can convert their MKR to SKY and then Seal the SKY. When the user unseals their SKY, they will receive a new token – 24KSKY – in return (not MKR, unlike when the upgrade contract was bi-directional).
- **Peg Risk**: The peg between MKR and SKY (i.e., 1:24,000) is a soft peg; the value of MKR to SKY can vary based on the market, and although unlikely, there is a risk that the dollar value of the tokens could unpeg. That being said, due to the PSM, 1 MKR must always be worth 24,000 SKY. Sky Ecosystem governance can enforce this.`,
    `#### DAI ↔ USDS
- Although unlikely, there is a risk that either asset could de-peg from the U.S. dollar.`,
    `#### sUSDS ↔ USDS
- Given that the yield of the SSR is paid in USDS, if USDS were to de-peg from the U.S. dollar, this will affect the amount of yield that the user would receive (e.g., if the user supplies USDS at an APY of 10%, but then USDS de-pegs by 10%, the user will not earn any yield on their supplied USDS; note that in this example, the user's supplied principal will not be affected by the de-pegging, only the interest that they would have received).`
  ]
};

const tradeSpeedBump: SpeedBumpContent = {
  title: 'Trade',
  functionality: 'trade',
  slug: 'trade',
  restrictions: ['[Placeholder: Trade restriction 1]', '[Placeholder: Trade restriction 2]'],
  howItWorks: '[Placeholder: How trade works]',
  associatedRisks: [
    '[Placeholder: Trade risk 1]',
    '[Placeholder: Trade risk 2]',
    '[Placeholder: Trade risk 3]'
  ]
};

const savingsSpeedBump: SpeedBumpContent = {
  title: 'Savings',
  functionality: 'savings',
  slug: 'savings',
  restrictions: ['[Placeholder: Savings restriction 1]', '[Placeholder: Savings restriction 2]'],
  howItWorks: '[Placeholder: How savings works]',
  associatedRisks: [
    '[Placeholder: Savings risk 1]',
    '[Placeholder: Savings risk 2]',
    '[Placeholder: Savings risk 3]'
  ]
};

const rewardsSpeedBump: SpeedBumpContent = {
  title: 'Rewards',
  functionality: 'rewards',
  slug: 'rewards',
  restrictions: ['[Placeholder: Rewards restriction 1]', '[Placeholder: Rewards restriction 2]'],
  howItWorks: '[Placeholder: How rewards works]',
  associatedRisks: [
    '[Placeholder: Rewards risk 1]',
    '[Placeholder: Rewards risk 2]',
    '[Placeholder: Rewards risk 3]'
  ]
};

const stakeSpeedBump: SpeedBumpContent = {
  title: 'Stake',
  functionality: 'stake',
  slug: 'stake',
  restrictions: ['[Placeholder: Stake restriction 1]', '[Placeholder: Stake restriction 2]'],
  howItWorks: '[Placeholder: How stake works]',
  associatedRisks: [
    '[Placeholder: Stake risk 1]',
    '[Placeholder: Stake risk 2]',
    '[Placeholder: Stake risk 3]'
  ]
};

const expertSpeedBump: SpeedBumpContent = {
  title: 'Expert',
  functionality: 'expert',
  slug: 'expert',
  restrictions: ['[Placeholder: Expert restriction 1]', '[Placeholder: Expert restriction 2]'],
  howItWorks: '[Placeholder: How expert works]',
  associatedRisks: [
    '[Placeholder: Expert risk 1]',
    '[Placeholder: Expert risk 2]',
    '[Placeholder: Expert risk 3]'
  ]
};

// TEMPORARY ^^^^

export const CONFIRMATION_WARNING_METADATA: Record<
  string,
  { description: string; disclaimer: string; associatedRisks: string[] }
> = {
  [IntentMapping[Intent.TRADE_INTENT]]: {
    description: 'Navigate to Trade with transaction details prefilled by our AI chatbot.',
    disclaimer: tradeSpeedBump.howItWorks,
    associatedRisks: tradeSpeedBump.associatedRisks
  },
  [IntentMapping[Intent.UPGRADE_INTENT]]: {
    description: 'Navigate to Upgrade with token amounts prefilled by our AI chatbot.',
    disclaimer: upgradeSpeedBump.howItWorks,
    associatedRisks: upgradeSpeedBump.associatedRisks
  },
  [IntentMapping[Intent.SAVINGS_INTENT]]: {
    description: 'Navigate to Savings with deposit amount prefilled by our AI chatbot.',
    disclaimer: savingsSpeedBump.howItWorks,
    associatedRisks: savingsSpeedBump.associatedRisks
  },
  [IntentMapping[Intent.REWARDS_INTENT]]: {
    description: 'Navigate to Rewards as suggested by our AI chatbot.',
    disclaimer: rewardsSpeedBump.howItWorks,
    associatedRisks: rewardsSpeedBump.associatedRisks
  },
  [IntentMapping[Intent.STAKE_INTENT]]: {
    description: 'Navigate to Stake with staking details prefilled by our AI chatbot.',
    disclaimer: stakeSpeedBump.howItWorks,
    associatedRisks: stakeSpeedBump.associatedRisks
  },
  [IntentMapping[Intent.EXPERT_INTENT]]: {
    description: 'Navigate to Expert modules with settings prefilled by our AI chatbot.',
    disclaimer: expertSpeedBump.howItWorks,
    associatedRisks: expertSpeedBump.associatedRisks
  }
};

export const getConfirmationWarningMetadata = (intent?: ChatIntent) => {
  const defaultMetadata = {
    description: 'Navigate to the suggested action with details prefilled by our AI chatbot.',
    disclaimer:
      "Please be aware that while we strive to provide accurate and helpful suggestions, you're solely responsible for reviewing and implementing any recommended actions. We do not guarantee the accuracy or completeness of the AI's suggestions and disclaim any liability for consequences arising from your use of this feature.",
    associatedRisks: []
  };

  if (!intent?.url) return defaultMetadata;

  // Extract widget parameter from URL
  const urlParts = intent.url.split('?');
  if (urlParts.length < 2) return defaultMetadata;

  const params = new URLSearchParams(urlParts[1]);
  const widgetParam = params.get('widget');

  if (!widgetParam) return defaultMetadata;

  // Convert widget param to Intent enum and then to string key
  const intentEnum = mapQueryParamToIntent(widgetParam);
  const intentKey = IntentMapping[intentEnum];

  return CONFIRMATION_WARNING_METADATA[intentKey] || defaultMetadata;
};
