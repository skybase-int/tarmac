import { useEffect } from 'react';
import { UserType, MessageType } from '@/modules/chat/constants';
import type { ChatHistory } from '@/modules/chat/types/Chat';

interface UseConversationFeedbackParams {
  chatHistory: ChatHistory[];
  setShowConversationFeedback: (show: boolean) => void;
}

/**
 * Custom hook to manage conversation feedback prompt visibility based on chat history.
 *
 * Shows feedback prompt when:
 * - Conversation has at least 7 messages
 * - Last message is from the bot (not loading)
 * - Total bot message content exceeds 1000 characters
 *
 * Note: Feedback is now submitted via the /feedback API endpoint with toast notifications,
 * not as chat messages, so we don't check for feedback message prefixes anymore.
 */
export const useConversationFeedback = ({
  chatHistory,
  setShowConversationFeedback
}: UseConversationFeedbackParams): void => {
  useEffect(() => {
    const lastMessage = chatHistory[chatHistory.length - 1];
    const isLastMessageBot = lastMessage?.user === UserType.bot;
    const isLoadingMessage = lastMessage?.type === MessageType.loading;
    const isNotInitialMessage = chatHistory.length > 1;
    const isLongEnoughConversation = chatHistory.length >= 7;

    // Check if total bot message content exceeds 1000 characters
    const totalBotMessageLength = chatHistory
      .filter(msg => msg.user === UserType.bot)
      .reduce((total, msg) => total + msg.message.length, 0);
    const hasSufficientBotContent = totalBotMessageLength > 1000;

    const shouldShowFeedback =
      isNotInitialMessage &&
      isLastMessageBot &&
      !isLoadingMessage &&
      isLongEnoughConversation &&
      hasSufficientBotContent;

    // Show feedback when conditions are met
    if (shouldShowFeedback) {
      setShowConversationFeedback(true);
    }
  }, [chatHistory, setShowConversationFeedback]);
};
