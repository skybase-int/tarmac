import { CHATBOT_ENABLED, CHAT_NOTIFICATION_KEY } from '@/lib/constants';
import { useEffect, useState } from 'react';

export const useDismissChatSuggestion = () => {
  const [chatSuggested, setChatSuggested] = useState(() => {
    return localStorage.getItem(CHAT_NOTIFICATION_KEY) === 'true';
  });

  useEffect(() => {
    if (CHATBOT_ENABLED) {
      if (!chatSuggested) {
        localStorage.setItem(CHAT_NOTIFICATION_KEY, 'true');
        setChatSuggested(true);
      }
    }
  }, [chatSuggested]);
};
