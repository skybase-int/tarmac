import { RewardsModule, Savings, Trade, Upgrade, Seal, Expert } from '@/modules/icons';
import { ExpertIntent, Intent } from './enums';
import { msg } from '@lingui/core/macro';
import { MessageDescriptor } from '@lingui/core';
import { base, mainnet, sepolia, arbitrum, unichain, optimism } from 'viem/chains';
import { tenderly, tenderlyBase, tenderlyArbitrum } from '@/data/wagmi/config/config.default';

export enum QueryParams {
  Locale = 'lang',
  Widget = 'widget',
  Details = 'details',
  Reward = 'reward',
  UrnIndex = 'urn_index',
  SourceToken = 'source_token',
  TargetToken = 'target_token',
  LinkedAction = 'linked_action',
  InputAmount = 'input_amount',
  Timestamp = 'timestamp',
  Network = 'network',
  Chat = 'chat',
  Reset = 'reset',
  Flow = 'flow',
  StakeTab = 'stake_tab',
  SealTab = 'seal_tab',
  ExpertModule = 'expert_module'
}

const isRestrictedBuild = import.meta.env.VITE_RESTRICTED_BUILD === 'true';
const isRestrictedMiCa = import.meta.env.VITE_RESTRICTED_BUILD_MICA === 'true';

export const restrictedIntents = isRestrictedMiCa
  ? [Intent.TRADE_INTENT]
  : [Intent.SAVINGS_INTENT, Intent.REWARDS_INTENT];

export const IntentMapping = {
  [Intent.BALANCES_INTENT]: 'balances',
  [Intent.UPGRADE_INTENT]: 'upgrade',
  [Intent.TRADE_INTENT]: 'trade',
  [Intent.SAVINGS_INTENT]: 'savings',
  [Intent.REWARDS_INTENT]: 'rewards',
  [Intent.SEAL_INTENT]: 'seal',
  [Intent.STAKE_INTENT]: 'stake',
  [Intent.EXPERT_INTENT]: 'expert'
};

export const ExpertIntentMapping: Record<ExpertIntent, string> = {
  [ExpertIntent.STUSDS_INTENT]: 'stusds'
};

export const CHAIN_WIDGET_MAP: Record<number, Intent[]> = {
  [mainnet.id]: [
    Intent.BALANCES_INTENT,
    Intent.REWARDS_INTENT,
    Intent.SAVINGS_INTENT,
    Intent.UPGRADE_INTENT,
    Intent.TRADE_INTENT,
    Intent.SEAL_INTENT,
    Intent.STAKE_INTENT,
    Intent.EXPERT_INTENT
  ],
  [tenderly.id]: [
    Intent.BALANCES_INTENT,
    Intent.REWARDS_INTENT,
    Intent.SAVINGS_INTENT,
    Intent.UPGRADE_INTENT,
    Intent.SEAL_INTENT,
    Intent.STAKE_INTENT,
    Intent.EXPERT_INTENT
  ],
  [base.id]: [Intent.BALANCES_INTENT, Intent.REWARDS_INTENT, Intent.SAVINGS_INTENT, Intent.TRADE_INTENT],
  [arbitrum.id]: [Intent.BALANCES_INTENT, Intent.REWARDS_INTENT, Intent.SAVINGS_INTENT, Intent.TRADE_INTENT],
  [tenderlyBase.id]: [
    Intent.BALANCES_INTENT,
    Intent.REWARDS_INTENT,
    Intent.SAVINGS_INTENT,
    Intent.TRADE_INTENT
  ],
  [tenderlyArbitrum.id]: [
    Intent.BALANCES_INTENT,
    Intent.REWARDS_INTENT,
    Intent.SAVINGS_INTENT,
    Intent.TRADE_INTENT
  ],
  [sepolia.id]: [Intent.BALANCES_INTENT, Intent.TRADE_INTENT],
  [unichain.id]: [Intent.BALANCES_INTENT, Intent.REWARDS_INTENT, Intent.SAVINGS_INTENT, Intent.TRADE_INTENT],
  [optimism.id]: [Intent.BALANCES_INTENT, Intent.REWARDS_INTENT, Intent.SAVINGS_INTENT, Intent.TRADE_INTENT]
};

export const COMING_SOON_MAP: Record<number, Intent[]> = {
  [base.id]: [Intent.REWARDS_INTENT],
  [arbitrum.id]: [Intent.REWARDS_INTENT],
  [optimism.id]: [Intent.REWARDS_INTENT],
  [unichain.id]: [Intent.REWARDS_INTENT],
  [tenderlyBase.id]: [Intent.REWARDS_INTENT],
  [tenderlyArbitrum.id]: [Intent.REWARDS_INTENT]
  // [base.id]: [Intent.YOUR_INTENT] // Example of how to add a coming soon intent
};

export const intentTxt: Record<string, MessageDescriptor> = {
  trade: msg`trade`,
  upgrade: msg`upgrade`,
  savings: msg`savings`,
  stusds: msg`stusds`,
  rewards: msg`rewards`,
  balances: msg`balances`,
  seal: msg`seal`,
  stake: msg`stake`
};

export const EXPERT_WIDGET_OPTIONS: {
  id: ExpertIntent;
  name: string;
}[] = [
  {
    id: ExpertIntent.STUSDS_INTENT,
    name: 'stUSDS'
  }
];

export const VALID_LINKED_ACTIONS = [
  IntentMapping[Intent.REWARDS_INTENT],
  IntentMapping[Intent.SAVINGS_INTENT],
  IntentMapping[Intent.EXPERT_INTENT]
];

const AvailableIntentMapping = Object.entries(IntentMapping).reduce(
  (acc, [key, value]) => {
    const isRestricted = isRestrictedBuild || isRestrictedMiCa;
    if (!isRestricted || !restrictedIntents.includes(key as Intent)) {
      acc[key as Intent] = value;
    }
    return acc;
  },
  {} as typeof IntentMapping
);

export function mapIntentToQueryParam(intent: Intent): string {
  return AvailableIntentMapping[intent] || '';
}

export function mapQueryParamToIntent(queryParam: string): Intent {
  const intent = Object.keys(AvailableIntentMapping).find(
    key => AvailableIntentMapping[key as keyof typeof AvailableIntentMapping] === queryParam
  );
  return (intent as Intent) || Intent.BALANCES_INTENT;
}

export const REFRESH_DELAY = 1000;

export const linkedActionMetadata = {
  [IntentMapping[Intent.UPGRADE_INTENT]]: { text: 'Upgrade DAI', icon: Upgrade },
  [IntentMapping[Intent.TRADE_INTENT]]: { text: 'Trade Tokens', icon: Trade },
  [IntentMapping[Intent.SAVINGS_INTENT]]: { text: 'Access Savings', icon: Savings },
  [IntentMapping[Intent.REWARDS_INTENT]]: { text: 'Get Rewards', icon: RewardsModule },
  [IntentMapping[Intent.SEAL_INTENT]]: { text: 'Seal', icon: Seal },
  [IntentMapping[Intent.STAKE_INTENT]]: { text: 'Activate', icon: Seal },
  [IntentMapping[Intent.EXPERT_INTENT]]: { text: 'Expert Modules', icon: Expert }
};

export const ALLOWED_EXTERNAL_DOMAINS = [
  'sky.money',
  'app.sky.money',
  'docs.sky.money',
  'upgrademkrtosky.sky.money'
];

export const PROD_URL_SKY_SUBGRAPH_MAINNET =
  'https://query-subgraph.sky.money/subgraphs/name/jetstreamgg/sky-subgraph-mainnet';
export const STAGING_URL_SKY_SUBGRAPH_MAINNET =
  'https://query-subgraph-staging.sky.money/subgraphs/name/jetstreamgg/sky-subgraph-mainnet';
export const STAGING_URL_SKY_SUBGRAPH_TESTNET =
  'https://query-subgraph-staging.sky.money/subgraphs/name/jetstreamgg/sky-subgraph-testnet';
export const PROD_URL_SKY_SUBGRAPH_BASE =
  'https://query-subgraph.sky.money/subgraphs/name/jetstreamgg/sky-subgraph-base';
export const STAGING_URL_SKY_SUBGRAPH_BASE =
  'https://query-subgraph-staging.sky.money/subgraphs/name/jetstreamgg/sky-subgraph-base';
export const STAGING_URL_SKY_SUBGRAPH_BASE_TENDERLY =
  'https://query-subgraph-staging.sky.money/subgraphs/name/jetstreamgg/sky-subgraph-baseTenderly';
export const PROD_URL_SKY_SUBGRAPH_ARBITRUM =
  'https://query-subgraph.sky.money/subgraphs/name/jetstreamgg/sky-subgraph-arbitrum';
export const STAGING_URL_SKY_SUBGRAPH_ARBITRUM =
  'https://query-subgraph-staging.sky.money/subgraphs/name/jetstreamgg/sky-subgraph-arbitrum';
export const STAGING_URL_SKY_SUBGRAPH_ARBITRUM_TENDERLY =
  'https://query-subgraph-staging.sky.money/subgraphs/name/jetstreamgg/sky-subgraph-arbitrumTenderly';
export const PROD_URL_SKY_SUBGRAPH_OPTIMISM =
  'https://query-subgraph.sky.money/subgraphs/name/jetstreamgg/sky-subgraph-optimism';
export const PROD_URL_SKY_SUBGRAPH_UNICHAIN =
  'https://query-subgraph.sky.money/subgraphs/name/jetstreamgg/sky-subgraph-unichain';
export const STAGING_URL_SKY_SUBGRAPH_OPTIMISM =
  'https://query-subgraph-staging.sky.money/subgraphs/name/jetstreamgg/sky-subgraph-optimism';
export const STAGING_URL_SKY_SUBGRAPH_UNICHAIN =
  'https://query-subgraph-staging.sky.money/subgraphs/name/jetstreamgg/sky-subgraph-unichain';

export const MAX_HISTORY_LENGTH = parseInt(import.meta.env.VITE_CHATBOT_MAX_HISTORY || 8) - 1;
export const MAX_MESSAGE_LENGTH = parseInt(import.meta.env.VITE_CHATBOT_MAX_MESSAGE_LENGTH || '500');
export const CHAT_SUGGESTIONS_ENABLED = import.meta.env.VITE_CHAT_SUGGESTIONS_ENABLED === 'true';
export const EXPERT_CHAT_ENABLED = import.meta.env.VITE_EXPERT_CHAT_ENABLED === 'true';
export const CHATBOT_ENABLED = import.meta.env.VITE_CHATBOT_ENABLED === 'true';
export const CHATBOT_DOMAIN = import.meta.env.VITE_CHATBOT_DOMAIN || 'https://staging-api.sky.money';
export const CHATBOT_USE_TESTNET_NETWORK_NAME =
  import.meta.env.VITE_CHATBOT_USE_TESTNET_NETWORK_NAME === 'true' &&
  (import.meta.env.VITE_ENV_NAME === 'staging' || import.meta.env.VITE_ENV_NAME === 'development');

// Feature flag for batch transactions
export const BATCH_TX_ENABLED = import.meta.env.VITE_BATCH_TX_ENABLED === 'true';
export const BATCH_TX_LEGAL_NOTICE_URL = '/batch-transactions-legal-notice';
export const BATCH_TX_SUPPORTED_WALLETS_URL = 'https://swiss-knife.xyz/7702beat';

// LocalStorage keys
export const USER_SETTINGS_KEY = 'user-settings';
export const BATCH_TX_NOTIFICATION_KEY = 'batch-tx-notification-shown';
export const CHAT_NOTIFICATION_KEY = 'chat-notification-suggested';
export const GOVERNANCE_MIGRATION_NOTIFICATION_KEY = 'governance-migration-notice-shown';
