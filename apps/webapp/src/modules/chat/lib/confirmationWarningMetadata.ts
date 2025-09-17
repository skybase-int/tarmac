import { Intent } from '@/lib/enums';
import { ChatIntent } from '../types/Chat';
import { IntentMapping, mapQueryParamToIntent } from '@/lib/constants';
import {
  skySavingsRateSpeedBump,
  skyTokenRewardsSpeedBump,
  tradeSpeedBump,
  upgradeSpeedBump
} from '@/data/chat/speed-bumps';
import { SpeedBumpContent } from '@/data/chat/speed-bumps/types';

// TEMPORARY: This is a temp data structure for testing purposes. Real data will be included later.

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
    disclaimer: skySavingsRateSpeedBump.howItWorks,
    associatedRisks: skySavingsRateSpeedBump.associatedRisks
  },
  [IntentMapping[Intent.REWARDS_INTENT]]: {
    description: 'Navigate to Rewards as suggested by our AI chatbot.',
    disclaimer: skyTokenRewardsSpeedBump.howItWorks,
    associatedRisks: skyTokenRewardsSpeedBump.associatedRisks
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
