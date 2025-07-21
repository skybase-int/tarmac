import React, { useState, useEffect } from 'react';
import { t } from '@lingui/core/macro';
import { Trans } from '@lingui/react/macro';
import { Text } from '@/modules/layout/components/Typography';
import { TermsDialog } from '@/modules/ui/components/TermsDialog';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckedState } from '@radix-ui/react-checkbox';

interface ChatbotTermsModalProps {
  isOpen: boolean;
  onAccept: () => void;
  onDecline: () => void;
  termsVersion: string;
  termsContent?: string;
  isLoading?: boolean;
  error?: string | null;
}

export const ChatbotTermsModal: React.FC<ChatbotTermsModalProps> = ({
  isOpen,
  onAccept,
  onDecline,
  termsVersion,
  termsContent,
  isLoading = false,
  error = null
}) => {
  const [isChecked, setIsChecked] = useState(false);

  // Reset checkbox when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsChecked(false);
    }
  }, [isOpen]);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onDecline();
    }
  };

  const handleCheckboxChange = (checkedState: CheckedState) => {
    setIsChecked(checkedState === true);
  };

  // TODO: Tbd if we need this checkbox and what the label should be
  const checkboxContent = (hasScrolledToEnd: boolean) => (
    <div className="flex items-center sm:my-4">
      <Checkbox
        id="chatbotTermsCheckbox"
        disabled={!hasScrolledToEnd}
        checked={isChecked}
        onCheckedChange={handleCheckboxChange}
        className="mr-2"
      />
      <label htmlFor="chatbotTermsCheckbox" className="text-text ml-2 text-sm leading-none md:leading-tight">
        <Trans>By clicking accept, you confirm agreement to the Chatbot Terms of Use.</Trans>
      </label>
    </div>
  );

  return (
    <TermsDialog
      isOpen={isOpen}
      onOpenChange={handleOpenChange}
      title={t`Chatbot Terms of Service`}
      content={<Text className="whitespace-pre-wrap text-sm text-violet-100/90">{termsContent}</Text>}
      termsVersion={termsVersion}
      error={error}
      isLoading={isLoading}
      onAccept={onAccept}
      onDecline={onDecline}
      acceptButtonText={isLoading ? t`Accepting...` : t`Accept`}
      acceptButtonDisabled={!isChecked}
      additionalContent={checkboxContent}
      showScrollInstruction={true}
      scrollInstructionText={t`Please scroll to the bottom and read the entire terms; the checkbox will become enabled afterward.`}
    />
  );
};
