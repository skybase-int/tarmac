import { Intent } from '@/lib/enums';
import { ChatIntent } from '../types/Chat';
import { IntentMapping, mapQueryParamToIntent } from '@/lib/constants';

// TODO: The structure is yet tbd. Using this structure and values as a placeholder for now.
const disclaimer =
  "Please be aware that while we strive to provide accurate and helpful suggestions, you're solely responsible for reviewing and implementing any recommended actions. We do not guarantee the accuracy or completeness of the AI's suggestions and disclaim any liability for consequences arising from your use of this feature.";

export const CONFIRMATION_WARNING_METADATA: Record<string, { description: string; disclaimer: string }> = {
  [IntentMapping[Intent.TRADE_INTENT]]: {
    description: 'You are about to execute a trade suggested by our AI chatbot.',
    disclaimer
  },
  [IntentMapping[Intent.UPGRADE_INTENT]]: {
    description: "You are about to upgrade your tokens based on our AI chatbot's suggestion.",
    disclaimer
  },
  [IntentMapping[Intent.SAVINGS_INTENT]]: {
    description: "You are about to deposit into savings based on our AI chatbot's suggestion.",
    disclaimer
  },
  [IntentMapping[Intent.REWARDS_INTENT]]: {
    description: "You are about to access rewards based on our AI chatbot's suggestion.",
    disclaimer
  },
  [IntentMapping[Intent.STAKE_INTENT]]: {
    description: "You are about to stake tokens based on our AI chatbot's suggestion.",
    disclaimer
  },
  [IntentMapping[Intent.EXPERT_INTENT]]: {
    description: "You are about to use expert modules based on our AI chatbot's suggestion.",
    disclaimer
  }
};

export const getConfirmationWarningMetadata = (intent?: ChatIntent) => {
  const defaultMetadata = {
    description: 'You are about to execute a transaction suggested by our AI chatbot.',
    disclaimer:
      "Please be aware that while we strive to provide accurate and helpful suggestions, you're solely responsible for reviewing and implementing any recommended actions. We do not guarantee the accuracy or completeness of the AI's suggestions and disclaim any liability for consequences arising from your use of this feature."
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
