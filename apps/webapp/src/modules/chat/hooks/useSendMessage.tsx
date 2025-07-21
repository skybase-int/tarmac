import { useAccount, useChainId } from 'wagmi';
import { MutationFunction, useMutation } from '@tanstack/react-query';
import { SendMessageRequest, SendMessageResponse, ChatIntent } from '../types/Chat';
import { useChatContext } from '../context/ChatContext';
import { CHATBOT_NAME, MessageType, UserType } from '../constants';
import { generateUUID } from '../lib/generateUUID';
import { t } from '@lingui/core/macro';
import { chainIdNameMapping, isChatIntentAllowed, processNetworkNameInUrl } from '../lib/intentUtils';
import { CHATBOT_DOMAIN, CHATBOT_ENABLED, MAX_HISTORY_LENGTH } from '@/lib/constants';

interface ChatbotResponse {
  chatResponse: {
    response: string;
  };
  actionIntentResponse: Pick<ChatIntent, 'title' | 'url'>[];
}

const fetchEndpoints = async (messagePayload: Partial<SendMessageRequest>) => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json'
  };

  // Add auth-related headers if environment variables are present
  // Should not exist in production, values would be visible in client
  const cfAccessClientId = import.meta.env.VITE_CHATBOT_CF_ACCESS_CLIENT_ID;
  const cfAccessClientSecret = import.meta.env.VITE_CHATBOT_CF_ACCESS_CLIENT_SECRET;

  if (cfAccessClientId && cfAccessClientSecret) {
    headers['CF-Access-Client-Id'] = cfAccessClientId;
    headers['CF-Access-Client-Secret'] = cfAccessClientSecret;
  }

  const response = await fetch(`${CHATBOT_DOMAIN}/chat`, {
    method: 'POST',
    headers,
    credentials: 'include',
    body: JSON.stringify(messagePayload)
  });

  if (!response.ok) {
    if (response.status === 400) {
      const error: any = new Error('Terms acceptance required');
      error.code = 'TERMS_NOT_ACCEPTED';
      error.status = 400;
      throw error;
    }
    throw new Error('Advanced chat response was not ok');
  }

  const data = await response.json();

  // Transform the advanced response to match the simple mode structure
  return {
    chatResponse: {
      response: data?.response || ''
    },
    actionIntentResponse: data?.actions || []
  } as ChatbotResponse;
};

const sendMessageMutation: MutationFunction<
  SendMessageResponse,
  { messagePayload: Partial<SendMessageRequest> }
> = async ({ messagePayload }) => {
  if (!CHATBOT_ENABLED) {
    throw new Error(`${CHATBOT_NAME} is disabled`);
  }

  const { chatResponse, actionIntentResponse } = await fetchEndpoints(messagePayload);

  if (!chatResponse.response) {
    throw new Error('Chatbot did not respond');
  }
  // initally set data to the chat response
  // we will override the response if we detect an action intent
  const data: SendMessageResponse = { ...chatResponse };

  data.intents = actionIntentResponse.map(action => ({
    title: action.title,
    url: action.url,
    intent_id: action.title
  }));

  return data;
};

export const useSendMessage = () => {
  const { setChatHistory, sessionId, chatHistory } = useChatContext();
  const chainId = useChainId();
  const { isConnected } = useAccount();

  const { loading: LOADING, error: ERROR, canceled: CANCELED } = MessageType;
  const { mutate } = useMutation<SendMessageResponse, Error, { messagePayload: Partial<SendMessageRequest> }>(
    {
      mutationFn: sendMessageMutation
    }
  );

  const history = chatHistory
    .filter(record => record.type !== CANCELED)
    .map(record => ({
      content: record.message,
      role: record.user === UserType.user ? 'user' : 'assistant'
    }));
  const network = isConnected ? chainIdNameMapping[chainId as keyof typeof chainIdNameMapping] : 'ethereum';

  const sendMessage = (message: string) => {
    mutate(
      {
        messagePayload: {
          session_id: sessionId,
          network,
          messages: [...history.slice(-MAX_HISTORY_LENGTH), { role: 'user', content: message }]
        }
      },
      {
        onSuccess: data => {
          const intents = data.intents
            ?.filter(chatIntent => isChatIntentAllowed(chatIntent, chainId))
            .map(intent => ({ ...intent, url: processNetworkNameInUrl(intent.url) }));

          setChatHistory(prevHistory => {
            return prevHistory[prevHistory.length - 1].type === CANCELED
              ? prevHistory
              : [
                  ...prevHistory.filter(item => item.type !== LOADING),
                  {
                    id: generateUUID(),
                    user: UserType.bot,
                    message: data.response,
                    intents
                  }
                ];
          });
        },
        onError: async (error: any) => {
          console.error('Failed to send message:', error);

          // Check if it's a terms acceptance error
          if (error.status === 400 || error.code === 'TERMS_NOT_ACCEPTED') {
            // Remove loading message without adding error message
            // The ChatWithTerms component will handle showing the dialog
            setChatHistory(prevHistory => prevHistory.filter(item => item.type !== LOADING));
          } else {
            setChatHistory(prevHistory => {
              return prevHistory[prevHistory.length - 1].type === CANCELED
                ? prevHistory
                : [
                    ...prevHistory.filter(item => item.type !== LOADING),
                    {
                      id: generateUUID(),
                      user: UserType.bot,
                      message: t`Sorry, something went wrong. Can you repeat your question?`,
                      type: ERROR
                    }
                  ];
            });
          }
        }
      }
    );

    setChatHistory(prevHistory => [
      ...prevHistory,
      { id: generateUUID(), user: UserType.user, message },
      { id: generateUUID(), user: UserType.bot, message: t`typing...`, type: LOADING }
    ]);
  };

  return { sendMessage };
};
