import { createContext, useContext, useState } from 'react';
import { ChatHistory, ChatIntent } from '../types/Chat';
import { generateUUID } from '../lib/generateUUID';
import { t } from '@lingui/macro';
import { CHATBOT_NAME, MessageType, UserType } from '../constants';

interface ChatContextType {
  isLoading: boolean;
  chatHistory: ChatHistory[];
  setChatHistory: React.Dispatch<React.SetStateAction<ChatHistory[]>>;
  confirmationModalOpened: boolean;
  setConfirmationModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
  selectedIntent: ChatIntent | undefined;
  setSelectedIntent: React.Dispatch<React.SetStateAction<ChatIntent | undefined>>;
  modalShown: boolean;
  setModalShown: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatContext = createContext<ChatContextType>({
  isLoading: false,
  chatHistory: [],
  setChatHistory: () => {},
  confirmationModalOpened: false,
  setConfirmationModalOpened: () => {},
  selectedIntent: undefined,
  setSelectedIntent: () => {},
  modalShown: false,
  setModalShown: () => {}
});

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Mock messages array to store chat history
  const messages = [
    {
      id: generateUUID(),
      user: UserType.bot,
      message: t`Hi, ${CHATBOT_NAME} here! How can I help you today?`
    }
  ];

  const [chatHistory, setChatHistory] = useState<ChatHistory[]>(messages);
  const [selectedIntent, setSelectedIntent] = useState<ChatIntent | undefined>(undefined);
  const [confirmationModalOpened, setConfirmationModalOpened] = useState<boolean>(false);
  const [modalShown, setModalShown] = useState<boolean>(false);
  const isLoading = chatHistory[chatHistory.length - 1]?.type === MessageType.loading;

  return (
    <ChatContext.Provider
      value={{
        chatHistory,
        setChatHistory,
        isLoading,
        confirmationModalOpened,
        setConfirmationModalOpened,
        selectedIntent,
        setSelectedIntent,
        modalShown,
        setModalShown
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => useContext(ChatContext);
