import { associateWalletWithTerms } from './termsApi';
import { CHAT_WALLET_ASSOCIATION_KEY } from '@/lib/constants';

type WalletAssociationCache = Record<string, { timestamp: number }>;

const CACHE_EXPIRY_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

const getCache = (): WalletAssociationCache => {
  try {
    const cached = localStorage.getItem(CHAT_WALLET_ASSOCIATION_KEY);
    return cached ? JSON.parse(cached) : {};
  } catch {
    return {};
  }
};

const updateCache = (walletAddress: string): void => {
  try {
    const cache = getCache();
    cache[walletAddress] = { timestamp: Date.now() };
    localStorage.setItem(CHAT_WALLET_ASSOCIATION_KEY, JSON.stringify(cache));
  } catch (e) {
    console.error('Failed to update wallet association cache:', e);
  }
};

export const shouldSkipAssociation = (walletAddress: string): boolean => {
  const cache = getCache();
  const entry = cache[walletAddress];

  if (!entry) {
    console.log('[WalletTermsAssociation] No cache entry for wallet:', walletAddress);
    return false;
  }

  const age = Date.now() - entry.timestamp;
  const shouldSkip = age < CACHE_EXPIRY_MS;
  console.log('[WalletTermsAssociation] Cache check:', {
    walletAddress,
    ageInDays: (age / (24 * 60 * 60 * 1000)).toFixed(2),
    shouldSkip
  });
  return shouldSkip;
};

export const triggerWalletAssociation = async (walletAddress: string): Promise<void> => {
  console.log('[WalletTermsAssociation] Triggering association for wallet:', walletAddress);
  try {
    await associateWalletWithTerms(walletAddress);
    console.log('[WalletTermsAssociation] Association successful, updating cache');
    updateCache(walletAddress);
  } catch (error) {
    console.error('[WalletTermsAssociation] Failed to associate wallet:', error);
  }
};
