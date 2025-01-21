import {
  REWARDS_ACTION,
  SAVINGS_ACTION,
  TRADE_ACTION,
  UPGRADE_ACTION
} from '../../lib/intentClassificationOptions';

export const generateRandomResponse = () => {
  const responses = [
    'I can help you with that! What would you like to know?',
    "Here's what I found about your request.",
    'Let me assist you with that.',
    'I understand you want to know more about this topic.'
  ];
  return responses[Math.floor(Math.random() * responses.length)];
};

export const generateRandomIntent = () => {
  const intents = [TRADE_ACTION, UPGRADE_ACTION, SAVINGS_ACTION, REWARDS_ACTION, 'NONE'];
  return intents[Math.floor(Math.random() * intents.length)];
};

export const generateRandomRecommendations = () => {
  const questions = [
    { metadata: { content: 'What is Sky Protocol?' } },
    { metadata: { content: 'How do I trade tokens?' } },
    { metadata: { content: 'What are the benefits of upgrading?' } },
    { metadata: { content: 'How do rewards work?' } },
    { metadata: { content: 'Can you explain the savings rate?' } },
    { metadata: { content: 'What tokens are supported?' } }
  ];

  const count = Math.floor(Math.random() * 4) + 1; // 1-4 recommendations
  const shuffled = [...questions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const generateRandomSlots = () => {
  const tokens = ['DAI', 'USDC', 'USDT', 'ETH', 'USDS'];
  return [
    {
      token: tokens[Math.floor(Math.random() * tokens.length)],
      amount: Math.floor(Math.random() * 1000).toString()
    }
  ];
};
