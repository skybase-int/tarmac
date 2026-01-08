import { useCallback, useRef, useEffect } from 'react';
import { useConnection } from 'wagmi';
import { checkChatbotTerms } from '../services/termsApi';
import { shouldSkipAssociation, triggerWalletAssociation } from '../services/walletTermsAssociation';
import { CHATBOT_ENABLED } from '@/lib/constants';

export const useWalletTermsAssociation = (): void => {
  const { address, isConnected } = useConnection();
  const isAssociatingRef = useRef(false);

  const associateWalletIfTermsAccepted = useCallback(async () => {
    if (!address || isAssociatingRef.current) return;

    if (shouldSkipAssociation(address)) {
      return;
    }

    isAssociatingRef.current = true;

    try {
      const termsStatus = await checkChatbotTerms();

      if (termsStatus.accepted) {
        await triggerWalletAssociation(address);
      }
    } catch (error) {
      console.error('[useWalletTermsAssociation] Failed:', error);
    } finally {
      isAssociatingRef.current = false;
    }
  }, [address]);

  useEffect(() => {
    if (CHATBOT_ENABLED && isConnected && address) {
      associateWalletIfTermsAccepted();
    }
  }, [isConnected, address, associateWalletIfTermsAccepted]);
};
