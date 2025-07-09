import { Button } from '@/components/ui/button';
import { ChatbotSend } from '@/modules/icons';
import { HStack } from '@/modules/layout/components/HStack';
import { useState, useRef } from 'react';
import { Trans } from '@lingui/react/macro';
import { t } from '@lingui/core/macro';
import { useChatContext } from '../context/ChatContext';
import { Text } from '@/modules/layout/components/Typography';
import { MAX_MESSAGE_LENGTH } from '@/lib/constants';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export const ChatInput = ({ sendMessage }: { sendMessage: (message: string) => void }) => {
  const [inputText, setInputText] = useState('');
  const { isLoading, chatHistory } = useChatContext();
  const isMessageSendingBlocked = !inputText || isLoading;
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFeedbackClick = () => {
    setInputText('/feedback ');
    inputRef.current?.focus();
  };

  const handleSubmit = () => {
    if (isMessageSendingBlocked) return;
    sendMessage(inputText);
    setInputText('');
  };

  // Support for sending messages with the enter key
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputText) {
      handleSubmit();
      return;
    }
  };

  const isFirstMessage = chatHistory.length === 1;
  const placeholder = isFirstMessage ? t`Ask me anything` : t`Ask another question`;

  return (
    <div>
      <HStack className="bg-card justify-between rounded-xl p-4 hover:brightness-125">
        <input
          ref={inputRef}
          placeholder={placeholder}
          className="ring-offset-background grow bg-transparent text-sm leading-4 text-white placeholder:text-violet-200/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:placeholder:text-violet-200/20"
          value={inputText}
          maxLength={MAX_MESSAGE_LENGTH}
          onChange={e => setInputText(e.target.value.slice(0, MAX_MESSAGE_LENGTH))}
          onKeyUp={handleKeyPress}
        />
        <HStack className="gap-2">
          <Tooltip delayDuration={400}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className="h-6 rounded-lg border border-violet-200/30 bg-transparent px-2 text-xs text-violet-200/70 hover:border-violet-200/50 hover:bg-transparent hover:text-white active:bg-transparent"
                onClick={handleFeedbackClick}
              >
                <Trans>Feedback</Trans>
              </Button>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <Trans>
                Share your feedback about this chat experience. Click this button to start a feedback message,
                then type your thoughts and send.
              </Trans>
            </TooltipContent>
          </Tooltip>
          <Button
            variant="ghost"
            className="h-6 bg-transparent p-0 text-white hover:bg-transparent active:bg-transparent disabled:bg-transparent disabled:text-violet-200/50"
            disabled={isMessageSendingBlocked}
            onClick={handleSubmit}
          >
            <ChatbotSend />
          </Button>
        </HStack>
      </HStack>
      <Text className="ml-1 mt-1 text-[8px] text-violet-200/50">
        {inputText.length} / {MAX_MESSAGE_LENGTH}
      </Text>
    </div>
  );
};
