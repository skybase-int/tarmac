import { toast, toastWithClose } from '@/components/ui/use-toast';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Text } from '@/modules/layout/components/Typography';
import { HStack } from '@/modules/layout/components/HStack';
import { VStack } from '@/modules/layout/components/VStack';
import { Trans } from '@lingui/react/macro';
import { Button } from '@/components/ui/button';
import { useSearchParams } from 'react-router-dom';
import { BP, useBreakpointIndex } from '@/modules/ui/hooks/useBreakpointIndex';
import {
  CHATBOT_ENABLED,
  QueryParams,
  CHAT_NOTIFICATION_KEY,
  CHAT_NOTIFICATION_TOAST_ID
} from '@/lib/constants';
import { CHATBOT_NAME } from '@/modules/chat/constants';
import { Chat } from '@/modules/icons';

export const useChatNotification = (isAuthorized: boolean) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { bpi } = useBreakpointIndex();

  // Use localStorage directly for notification state
  const [chatSuggested, setChatSuggested] = useState(() => {
    return localStorage.getItem(CHAT_NOTIFICATION_KEY) === 'true';
  });

  const showChat = useMemo(() => CHATBOT_ENABLED && isAuthorized, [CHATBOT_ENABLED, isAuthorized]);

  const onClickChat = useCallback(
    (toastId: string | number) => {
      searchParams.set(QueryParams.Chat, 'true');
      if (bpi < BP['3xl']) searchParams.set(QueryParams.Details, 'false');
      setSearchParams(searchParams);
      toast.dismiss(toastId);
      activeToastIdRef.current = null; // Clear the reference when dismissed
    },
    [bpi, searchParams, setSearchParams]
  );

  const onClose = useCallback(() => {
    localStorage.setItem(CHAT_NOTIFICATION_KEY, 'true');
    setChatSuggested(true);
    activeToastIdRef.current = null; // Clear the reference when closed
  }, []);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeToastIdRef = useRef<string | number | null>(null);

  useEffect(() => {
    // Only show if authorized by the notification queue
    if (!isAuthorized) {
      return;
    }

    if (showChat) {
      timerRef.current = setTimeout(() => {
        // Check if a toast is already active
        if (!chatSuggested && searchParams.get(QueryParams.Chat) !== 'true' && !activeToastIdRef.current) {
          // Use constant toast ID so it can be dismissed from other hooks
          const toastId = CHAT_NOTIFICATION_TOAST_ID;
          activeToastIdRef.current = toastId;

          toastWithClose(
            () => (
              <div>
                <HStack>
                  <img
                    src="/images/chatbot_logo.svg"
                    alt={`${CHATBOT_NAME} avatar`}
                    className="@2xl/chat:h-8 @2xl/chat:w-8 h-5 w-5"
                  />
                  <Text variant="medium" className="text-selectActive ml-1">
                    {CHATBOT_NAME}
                  </Text>
                </HStack>
                <HStack className="ml-1 w-full justify-between">
                  <VStack className="mt-4">
                    <Text variant="medium">
                      <Trans>Hi, {CHATBOT_NAME} here!</Trans>
                    </Text>
                    <Text variant="medium">
                      <Trans>How can I help you today?</Trans>
                    </Text>
                  </VStack>
                  <Button
                    className="place-self-end"
                    variant="pill"
                    size="xs"
                    onClick={() => onClickChat(toastId)}
                  >
                    <Chat width={16} height={16} className="mr-1" />
                    <Trans>Start Chatting</Trans>
                  </Button>
                </HStack>
              </div>
            ),
            {
              id: toastId,
              duration: Infinity,
              classNames: {
                content: 'w-full'
              },
              onDismiss: onClose
            }
          );
        }
      }, 5000);
    } else if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [showChat, chatSuggested, searchParams, isAuthorized]);
};
