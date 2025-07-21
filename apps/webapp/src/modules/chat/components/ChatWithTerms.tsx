import React, { useState, useEffect } from 'react';
import { ChatPane } from '@/modules/app/components/ChatPane';
import { ChatbotTermsModal } from './ChatbotTermsModal';
import { useTermsAcceptance } from '../hooks/useTermsAcceptance';
import { useChatContext } from '../context/ChatContext';
import { t } from '@lingui/core/macro';

interface ChatWithTermsProps {
  sendMessage: (message: string) => void;
}

export const ChatWithTerms: React.FC<ChatWithTermsProps> = ({ sendMessage }) => {
  // TODO: This may come from a url
  const TERMS_VERSION = '2025-07-15';
  const baseTerms = t`By using this chatbot, you agree to our terms of service. You must be 18 years or older to use this service. The chatbot provides information and assistance but should not be considered financial advice. Your interactions may be logged for quality and improvement purposes.`;
  // TODO: Remove the Array.fill repetition once we have real terms from URL
  const TERMS_CONTENT = baseTerms ? Array(20).fill(baseTerms).join('\n\n') : undefined;

  const { termsAccepted, showTermsDialog, acceptTerms, setShowTermsDialog, error, checkTermsStatus } =
    useTermsAcceptance();

  const { setTermsAccepted } = useChatContext();

  const [isAccepting, setIsAccepting] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [pendingMessage, setPendingMessage] = useState<string | null>(null);

  // Update context when terms acceptance state changes
  useEffect(() => {
    setTermsAccepted(termsAccepted);
  }, [termsAccepted, setTermsAccepted]);

  // Send pending message after terms are accepted
  useEffect(() => {
    if (termsAccepted && pendingMessage) {
      sendMessage(pendingMessage);
      setPendingMessage(null);
    }
  }, [termsAccepted, pendingMessage, sendMessage]);

  // Intercept sendMessage to check terms on first interaction
  const wrappedSendMessage = async (message: string) => {
    if (!hasInteracted) {
      setHasInteracted(true);

      // Check terms status on first message
      if (!termsAccepted) {
        // Save the message to send after acceptance
        setPendingMessage(message);
        await checkTermsStatus();
        return;
      }
    }

    // If terms are accepted, send the message
    if (termsAccepted) {
      sendMessage(message);
    } else {
      // Save message and show dialog if terms not accepted
      setPendingMessage(message);
      setShowTermsDialog(true);
    }
  };

  const handleAcceptTerms = async () => {
    setIsAccepting(true);
    try {
      await acceptTerms(TERMS_VERSION);
    } catch {
      // Error is handled by the hook
    } finally {
      setIsAccepting(false);
    }
  };

  const handleDeclineTerms = () => {
    setShowTermsDialog(false);
  };

  return (
    <>
      <ChatPane sendMessage={wrappedSendMessage} />
      <ChatbotTermsModal
        isOpen={showTermsDialog}
        onAccept={handleAcceptTerms}
        onDecline={handleDeclineTerms}
        termsVersion={TERMS_VERSION}
        termsContent={TERMS_CONTENT}
        isLoading={isAccepting}
        error={error}
      />
    </>
  );
};
