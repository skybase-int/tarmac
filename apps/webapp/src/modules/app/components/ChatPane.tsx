import { motion } from 'framer-motion';
import { easeOutExpo } from '@/modules/ui/animation/timingFunctions';
import { ChatInput } from '@/modules/chat/components/ChatInput';
import { ChatHeader } from '@/modules/chat/components/ChatHeader';
import { ChatBubble } from '@/modules/chat/components/ChatBubble';
import { useEffect, useRef, useState } from 'react';
import { formatMessage } from '@/modules/chat/lib/formatMessage';
import { useChatContext } from '@/modules/chat/context/ChatContext';
import { useDismissChatSuggestion } from '../hooks/useDismissChatSuggestion';
import { ConversationFeedbackPrompt } from '@/modules/chat/components/ConversationFeedbackPrompt';
import { ConversationFeedbackModal } from '@/modules/chat/components/ConversationFeedbackModal';
import { UserType } from '@/modules/chat/constants';

export const ChatPane = ({ sendMessage }: { sendMessage: (message: string) => void }) => {
  const {
    chatHistory,
    shouldShowConfirmationWarning,
    scrollTrigger,
    showConversationFeedback,
    setShowConversationFeedback,
    isLoading
  } = useChatContext();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isConversationFeedbackModalOpen, setIsConversationFeedbackModalOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState<'positive' | 'negative' | undefined>(undefined);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [chatHistory, shouldShowConfirmationWarning, scrollTrigger]);

  // Show conversation feedback prompt after the bot has replied at least once
  useEffect(() => {
    const hasBotReplied = chatHistory.some((msg, index) => index > 0 && msg.user === UserType.bot);
    const hasRecentConversationFeedback = chatHistory.some(
      msg => msg.user === UserType.user && msg.message.startsWith('/feedback conversation-rating-')
    );

    // Show feedback if bot has replied and no recent conversation feedback was given
    if (hasBotReplied && !hasRecentConversationFeedback) {
      setShowConversationFeedback(true);
    } else if (hasRecentConversationFeedback) {
      // Hide feedback prompt if conversation feedback was just submitted
      setShowConversationFeedback(false);
    }
  }, [chatHistory, setShowConversationFeedback]);

  const handleRatingClick = (rating: 'positive' | 'negative') => {
    setSelectedRating(rating);
    setIsConversationFeedbackModalOpen(true);
  };

  const handleFeedbackSubmit = (rating: 'positive' | 'negative') => {
    const topic = rating === 'positive' ? 'conversation-rating-positive' : 'conversation-rating-negative';
    const feedbackMessage = `/feedback ${topic}`;
    sendMessage(feedbackMessage);
    setIsConversationFeedbackModalOpen(false);
    setShowConversationFeedback(false);
  };

  useDismissChatSuggestion();

  return (
    <>
      {/* Conversation Feedback Modal */}
      <ConversationFeedbackModal
        isOpen={isConversationFeedbackModalOpen}
        onClose={() => setIsConversationFeedbackModalOpen(false)}
        onSubmit={handleFeedbackSubmit}
        initialRating={selectedRating}
      />

      {/* Chat Pane */}
      <motion.div
        className="chat-pane md:bg-panel flex h-full w-full flex-col group-has-[.details-pane]:w-[324px] md:rounded-3xl"
        layout
        key="chat-pane"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ layout: { duration: 0 }, opacity: { duration: 0.5, ease: easeOutExpo } }}
      >
        <ChatHeader />
        {/* The @container/chat class allows to style children based on breakpoints on this container */}
        <div className="@container/chat h-[calc(100%-65px)] px-6 pb-4 pt-[22px] md:h-full xl:pb-5 xl:pt-8">
          <div className="mx-auto flex h-full max-w-[600px] flex-col justify-between gap-5">
            <div
              ref={chatContainerRef}
              className="scrollbar-thin-always flex w-full flex-col gap-10 overflow-y-auto pr-2 xl:gap-8"
            >
              {chatHistory.map(({ user, message, type, intents }, index) => {
                const formattedMessage = formatMessage(message);
                const isLastMessage = index === chatHistory.length - 1 && index !== 0;
                const isFirstMessage = index === 0;
                return (
                  <ChatBubble
                    key={index}
                    user={user}
                    message={formattedMessage}
                    type={type}
                    isLastMessage={isLastMessage}
                    intents={intents}
                    sendMessage={sendMessage}
                    showModifierRow={!isFirstMessage && isLastMessage}
                    isFirstMessage={isFirstMessage}
                    isOnlyMessage={chatHistory.length === 1}
                  />
                );
              })}

              {/* Conversation Feedback Prompt */}
              {showConversationFeedback && (
                <div className="w-full">
                  <ConversationFeedbackPrompt onRatingClick={handleRatingClick} disabled={isLoading} />
                </div>
              )}
            </div>
            <ChatInput sendMessage={sendMessage} />
          </div>
        </div>
      </motion.div>
    </>
  );
};
