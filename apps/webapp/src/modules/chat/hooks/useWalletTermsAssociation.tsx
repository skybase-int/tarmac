import { useCallback, useRef, useEffect } from 'react';
import { useConnection } from 'wagmi';
import { checkChatbotTerms } from '../services/termsApi';
import { shouldSkipAssociation, triggerWalletAssociation } from '../services/walletTermsAssociation';
import { CHATBOT_ENABLED } from '@/lib/constants';

export const useWalletTermsAssociation = (): void => {
  const { address, isConnected } = useConnection();
  const isAssociatingRef = useRef(false);

  const associateWalletIfTermsAccepted = useCallback(async () => {
    console.log('[useWalletTermsAssociation] associateWalletIfTermsAccepted called', {
      address,
      isAssociating: isAssociatingRef.current
    });

    if (!address || isAssociatingRef.current) return;

    if (shouldSkipAssociation(address)) {
      return;
    }

    isAssociatingRef.current = true;

    try {
      console.log('[useWalletTermsAssociation] Checking terms status...');
      const termsStatus = await checkChatbotTerms();
      console.log('[useWalletTermsAssociation] Terms status:', termsStatus);

      if (termsStatus.accepted) {
        await triggerWalletAssociation(address);
      } else {
        console.log('[useWalletTermsAssociation] Terms not accepted, skipping association');
      }
    } catch (error) {
      console.error('[useWalletTermsAssociation] Failed:', error);
    } finally {
      isAssociatingRef.current = false;
    }
  }, [address]);

  useEffect(() => {
    console.log('[useWalletTermsAssociation] Effect triggered', {
      CHATBOT_ENABLED,
      isConnected,
      address
    });
    if (CHATBOT_ENABLED && isConnected && address) {
      associateWalletIfTermsAccepted();
    }
  }, [isConnected, address, associateWalletIfTermsAccepted]);
};
