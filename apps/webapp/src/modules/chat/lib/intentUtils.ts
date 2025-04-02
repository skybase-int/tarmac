import { Chain } from 'wagmi/chains';
import { QueryParams } from '@/lib/constants';
import { ChatIntent } from '../types/Chat';
import { Intent } from '@/lib/enums';
import { isIntentAllowed } from '@/lib/utils';

export const networkMapping = {
  mainnet: 1,
  ethereum: 1,
  base: 8453,
  arbitrum: 42161,
  arbitrumone: 42161
} as const;

export const chainIdNameMapping = {
  1: 'ethereum',
  314310: 'ethereum', // tenderly
  8453: 'base',
  8555: 'base', // base tenderly
  42161: 'arbitrumone',
  421611: 'arbitrumone' // arbitrum+one tenderly
} as const;

export const intents = {
  balances: Intent.BALANCES_INTENT,
  rewards: Intent.REWARDS_INTENT,
  savings: Intent.SAVINGS_INTENT,
  upgrade: Intent.UPGRADE_INTENT,
  trade: Intent.TRADE_INTENT,
  seal: Intent.SEAL_INTENT
} as const;

export type NetworkName = keyof typeof networkMapping;
export type ChainId = (typeof networkMapping)[NetworkName];

export type BaseIntentParams = {
  amount?: string | null;
  network?: Chain | null;
};

export const generateBaseUrl = (intentId: string, params: Record<string, string | undefined>): string => {
  const urlParams = new URLSearchParams();
  urlParams.append(QueryParams.Widget, encodeURIComponent(intentId));
  urlParams.append(QueryParams.Chat, 'true');

  Object.entries(params).forEach(([key, value]) => {
    if (value) urlParams.append(key, encodeURIComponent(value));
  });

  return `?${urlParams.toString()}`;
};

export const addNetworkToDescription = (description: string, network?: Chain): string => {
  return network ? `${description} on ${network.name}` : description;
};

export const sortIntentsByPriority = (intents: ChatIntent[]): ChatIntent[] => {
  return [...intents].sort((a, b) => {
    const aHasAmount = a.url.includes(QueryParams.InputAmount);
    const bHasAmount = b.url.includes(QueryParams.InputAmount);
    const aHasNetwork = a.url.includes('network=');
    const bHasNetwork = b.url.includes('network=');

    // Prioritize network-specific intents
    if (aHasNetwork !== bHasNetwork) return aHasNetwork ? -1 : 1;
    if (aHasAmount !== bHasAmount) return aHasAmount ? -1 : 1;
    return 0;
  });
};

export const getChainFromNetwork = (
  detectedNetwork: string | undefined,
  chains: Chain[]
): Chain | undefined => {
  if (!detectedNetwork) return undefined;

  return chains.find(c => c.id === networkMapping[detectedNetwork.toLowerCase() as NetworkName]);
};

export const generateFallbackIntent = (intentId: string, description: string): ChatIntent => ({
  intent_id: intentId,
  title: description,
  url: generateBaseUrl(intentId, {})
});

export const intentModifiesState = (intent?: ChatIntent): boolean => {
  if (!intent) return false;
  return (
    intent.intent_id !== 'balances' &&
    (intent.url.includes(QueryParams.InputAmount) ||
      intent.url.includes(QueryParams.SourceToken) ||
      intent.url.includes(QueryParams.TargetToken))
  );
};

export const isChatIntentAllowed = (intent: ChatIntent, currentChainId: number): boolean => {
  try {
    const urlObj = new URL(intent.url, window.location.origin);
    const intentWidget = urlObj.searchParams.get(QueryParams.Widget);
    const intentNetwork = urlObj.searchParams.get(QueryParams.Network);

    if (!intentWidget) {
      console.warn('Intent URL missing widget param:', intent.url);
      return false; // Cannot determine allowance without widget
    }

    // Look up the Intent enum based on the widget string
    const intentEnum = intents[intentWidget as keyof typeof intents];

    if (intentEnum === undefined) {
      console.warn('Could not map widget to known value:', { intentWidget });
      return false; // Widget name is not recognized
    }

    // If network parameter exists, validate and use it
    if (intentNetwork) {
      const mappedChainId = networkMapping[intentNetwork as keyof typeof networkMapping];
      if (mappedChainId === undefined) {
        // Invalid network param value, intent is not allowed
        return false;
      }
      // Network is valid, check allowance using the mapped chainId
      return isIntentAllowed(intentEnum, mappedChainId);
    }

    // Network parameter is missing, check allowance using the current chainId
    return isIntentAllowed(intentEnum, currentChainId);
  } catch (error) {
    console.error('Failed to parse intent URL or check allowance:', error);
    return false;
  }
};
