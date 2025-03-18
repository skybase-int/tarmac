import { MutationFunction, useMutation } from '@tanstack/react-query';
import { Recommendation, SendMessageRequest, SendMessageResponse } from '../types/Chat';
import { useChatContext } from '../context/ChatContext';
import { CHATBOT_NAME, MessageType, UserType } from '../constants';
import { generateUUID } from '../lib/generateUUID';
import { t } from '@lingui/macro';
import { handleActionIntent } from '../lib/handleActionIntent';
import { mainnet } from 'wagmi/chains';
import { base } from 'wagmi/chains';
import { arbitrum } from 'wagmi/chains';

const fetchEndpoints = async (messagePayload: Partial<SendMessageRequest>) => {
  const endpoint = import.meta.env.VITE_CHATBOT_ENDPOINT || 'https://staging-api.sky.money';
  const host = import.meta.env.VITE_CHATBOT_ENDPOINT_HOST || '';

  // TODO: Remove this once we have the endpoint working with localhost so we don't have to use the proxy to prevent CORS issues
  // const response = await fetch(`${endpoint}`), {
  const response = await fetch(`${endpoint}`.replaceAll(host, '/chatbot-api'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify([
      {
        ...messagePayload
      }
    ])
  });

  if (!response.ok) {
    throw new Error('Advanced chat response was not ok');
  }

  const { data } = await response.json();

  // Transform the advanced response to match the simple mode structure
  // TODO: Handle the response from the chatbot, for now we focus on the chat response
  return {
    chatResponse: {
      message: '', // TODO: add message
      response: data?.[0]?.prediction || '',
      messageId: data?.[0]?.messageId || ''
    },
    actionIntentResponse: {
      classification: '',
      confidence: 0
    },
    questionIntentResponse: {
      recommendations: []
    },
    slotResponse: {
      slots: []
    }
  };
};

const sendMessageMutation: MutationFunction<
  SendMessageResponse,
  { messagePayload: Partial<SendMessageRequest> }
> = async ({ messagePayload }) => {
  const chatEnabled = import.meta.env.VITE_CHATBOT_ENABLED === 'true';
  if (!chatEnabled) {
    throw new Error(`${CHATBOT_NAME} is disabled`);
  }

  const { chatResponse, actionIntentResponse, questionIntentResponse, slotResponse } =
    await fetchEndpoints(messagePayload);

  if (!chatResponse.response) {
    throw new Error('Chatbot did not respond');
  }
  // initally set data to the chat response
  // we will override the response if we detect an action intent
  const data: SendMessageResponse = { ...chatResponse };

  if (
    actionIntentResponse.classification &&
    slotResponse.slots &&
    actionIntentResponse.classification !== 'NONE'
  ) {
    // if so, return the action intent button, accompanied by hard-coded text acknowledging the intent
    const actionIntents = handleActionIntent({
      classification: actionIntentResponse.classification,
      slots: slotResponse.slots,
      chains: [mainnet, base, arbitrum]
    });

    data.intents = actionIntents;
  }

  // next, check for question intents
  if (questionIntentResponse.recommendations && questionIntentResponse.recommendations.length > 0) {
    const questions = questionIntentResponse.recommendations.map(
      (rec: Recommendation) => rec.metadata.content
    );
    data.suggestions = questions;
  }

  return data;
};

export const useSendMessage = () => {
  const { setChatHistory } = useChatContext();
  const { loading: LOADING, error: ERROR, canceled: CANCELED } = MessageType;
  const { mutate } = useMutation<SendMessageResponse, Error, { messagePayload: Partial<SendMessageRequest> }>(
    {
      mutationFn: sendMessageMutation
    }
  );

  const sendMessage = (message: string) => {
    mutate(
      {
        messagePayload: {
          // session_id: sessionId,
          // message,
          // history: history
          //   .filter(record => record.type !== CANCELED)
          //   .map(record => ({
          //     ...record,
          //     role: record.user === UserType.user ? 'user' : 'assistant'
          //   }))
          promptText: message
        }
      },
      {
        onSuccess: data => {
          setChatHistory(prevHistory => {
            return prevHistory[prevHistory.length - 1].type === CANCELED
              ? prevHistory
              : [
                  ...prevHistory.filter(item => item.type !== LOADING),
                  {
                    id: generateUUID(),
                    user: UserType.bot,
                    message: data.response,
                    suggestions: data.suggestions,
                    intents: data.intents
                  }
                ];
          });
        },
        onError: error => {
          console.error('Failed to send message:', error);
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
    );
    setChatHistory(prevHistory => [
      ...prevHistory,
      { id: generateUUID(), user: UserType.user, message },
      { id: generateUUID(), user: UserType.bot, message: t`typing...`, type: LOADING }
    ]);
  };

  return { sendMessage };
};
