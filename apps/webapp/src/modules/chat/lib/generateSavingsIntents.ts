import { Chain } from 'viem';
import { ChatIntent, Slot, SlotType } from '../types/Chat';
import { IntentMapping, QueryParams } from '@/lib/constants';

const networkMapping = {
  mainnet: 1,
  ethereum: 1,
  base: 8453,
  arbitrum: 42161
};

const chainIdNameMapping = {
  1: 'ethereum',
  8453: 'base',
  42161: 'arbitrum'
};

// TODO: This should come from a config or API
const supportedTokensByNetwork: Record<number, string[]> = {
  1: ['USDS'],
  8453: ['USDS', 'USDC'],
  42161: ['USDS', 'USDC']
};

const isTokenSupportedOnNetwork = (token: string, chainId: number): boolean => {
  const networkTokens = supportedTokensByNetwork[chainId];
  if (!networkTokens) return false;
  return networkTokens.some(t => t.toLowerCase() === token.toLowerCase());
};

const generateIntentDescription = (
  amount: string | undefined,
  token: string | undefined,
  network?: Chain,
  tab?: 'left' | 'right'
): string => {
  const networkSuffix = network ? ` on ${network.name}` : '';
  const action = tab === 'right' ? 'Withdraw' : 'Supply';

  // Case 1: Complete info (amount + token + tab)
  if (amount && token && tab) {
    return `${action} ${amount} ${token} ${tab === 'right' ? 'from' : 'to'} Savings${networkSuffix}`;
  }

  // Case 2: Amount + token (no tab)
  if (amount && token) {
    return `Supply or withdraw ${amount} ${token} ${networkSuffix}`;
  }

  // Case 3: Amount + tab (no token)
  if (amount && tab) {
    return `${action} ${amount} ${tab === 'right' ? 'from' : 'to'} Savings${networkSuffix}`;
  }

  // Case 4: Token + tab (no amount)
  if (token && tab) {
    return `${action} ${token} ${tab === 'right' ? 'from' : 'to'} Savings${networkSuffix}`;
  }

  // Case 5: Only token
  if (token) {
    return `Supply or withdraw ${token}${networkSuffix}`;
  }

  // Case 6: Only tab
  if (tab) {
    return `${action} ${tab === 'right' ? 'from' : 'to'} Savings${networkSuffix}`;
  }

  // Case 7: No slots (generic)
  return `Go to Savings${networkSuffix}`;
};

const generateIntentUrl = (
  amount: string | undefined,
  token: string | undefined,
  network?: Chain,
  tab?: 'left' | 'right'
): string => {
  const { Widget, InputAmount, SourceToken, Chat } = QueryParams;
  const urlParams = new URLSearchParams();

  urlParams.append(Widget, IntentMapping.SAVINGS_INTENT);
  urlParams.append(Chat, 'true');

  // Only add parameters if they are defined
  if (amount) urlParams.append(InputAmount, amount);
  if (token) urlParams.append(SourceToken, token);
  if (network) urlParams.append('network', chainIdNameMapping[network.id as keyof typeof chainIdNameMapping]);
  if (tab) urlParams.append('tab', tab);

  return `?${urlParams.toString()}`;
};

export const generateSavingsIntents = (
  slots: Slot[],
  chains: Chain[],
  tab?: 'left' | 'right',
  detectedNetwork?: string
): ChatIntent[] => {
  if (import.meta.env.VITE_RESTRICTED_BUILD === 'true') {
    return [];
  }

  const { Amount, SourceToken } = SlotType;

  const amountSlot = slots.find(slot => slot.field === Amount);
  const tokenSlot = slots.find(slot => slot.field === SourceToken);

  const amount = amountSlot?.parsed_value || undefined;
  const token = tokenSlot?.parsed_value || 'USDS'; // Default to USDS if not specified

  const allIntents: ChatIntent[] = [];

  // If we have a detected network, prioritize that network's intents
  if (detectedNetwork) {
    const targetChain = chains.find(
      c => c.id === networkMapping[detectedNetwork.toLowerCase() as keyof typeof networkMapping]
    );

    if (targetChain && isTokenSupportedOnNetwork(token, targetChain.id)) {
      allIntents.push({
        intent_id: IntentMapping.SAVINGS_INTENT,
        intent_description: generateIntentDescription(amount, token, targetChain, tab),
        url: generateIntentUrl(amount, token, targetChain, tab)
      });
    }
  }

  // If no network was detected, generate intents for all supported networks
  if (!detectedNetwork) {
    chains.forEach(chain => {
      if (isTokenSupportedOnNetwork(token, chain.id)) {
        allIntents.push({
          intent_id: IntentMapping.SAVINGS_INTENT,
          intent_description: generateIntentDescription(amount, token, chain, tab),
          url: generateIntentUrl(amount, token, chain, tab)
        });
      }
    });
  }

  // Always add a fallback intent if no valid intents were generated
  if (allIntents.length === 0) {
    allIntents.push({
      intent_id: IntentMapping.SAVINGS_INTENT,
      intent_description: generateIntentDescription(undefined, undefined, undefined, tab),
      url: generateIntentUrl(undefined, undefined, undefined, tab)
    });
  }

  // Sort intents - prioritize those with amounts
  return allIntents.sort((a, b) => {
    const aHasAmount = a.url.includes(QueryParams.InputAmount);
    const bHasAmount = b.url.includes(QueryParams.InputAmount);
    return aHasAmount === bHasAmount ? 0 : aHasAmount ? -1 : 1;
  });
};
