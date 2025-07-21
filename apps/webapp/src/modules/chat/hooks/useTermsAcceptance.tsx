import { useState, useEffect, useCallback } from 'react';
import { checkChatbotTerms, signChatbotTerms } from '../services/termsApi';

interface UseTermsAcceptanceReturn {
  termsAccepted: boolean;
  isCheckingTerms: boolean;
  showTermsDialog: boolean;
  acceptTerms: (termsVersion: string) => Promise<void>;
  checkTermsStatus: () => Promise<void>;
  setShowTermsDialog: (show: boolean) => void;
  error: string | null;
}

export const useTermsAcceptance = (): UseTermsAcceptanceReturn => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isCheckingTerms, setIsCheckingTerms] = useState(false);
  const [showTermsDialog, setShowTermsDialog] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasCheckedOnce, setHasCheckedOnce] = useState(false);

  // Clear error when dialog visibility changes
  useEffect(() => {
    if (showTermsDialog) {
      setError(null);
    }
  }, [showTermsDialog]);

  const checkTermsStatus = useCallback(async () => {
    // Only check if we haven't checked yet
    if (hasCheckedOnce && termsAccepted) {
      return;
    }

    setIsCheckingTerms(true);
    setError(null);

    try {
      const response = await checkChatbotTerms();
      setTermsAccepted(response.accepted);
      setHasCheckedOnce(true);

      if (!response.accepted) {
        setShowTermsDialog(true);
      }
    } catch (err) {
      console.error('Failed to check terms status:', err);
      setTermsAccepted(false);
      setShowTermsDialog(true);
      setHasCheckedOnce(true);
    } finally {
      setIsCheckingTerms(false);
    }
  }, [hasCheckedOnce, termsAccepted]);

  const acceptTerms = useCallback(async (termsVersion: string) => {
    setError(null);

    try {
      await signChatbotTerms(termsVersion);
      setTermsAccepted(true);
      setShowTermsDialog(false);
    } catch (err) {
      console.error('Failed to accept terms:', err);
      setError('Failed to accept terms. Please try again.');
      throw err;
    }
  }, []);

  return {
    termsAccepted,
    isCheckingTerms,
    showTermsDialog,
    acceptTerms,
    checkTermsStatus,
    setShowTermsDialog,
    error
  };
};
