import { Button } from '@/components/ui/button';
import { ChatIntent } from '../types/Chat';
import { Text } from '@/modules/layout/components/Typography';
import { useChatContext } from '../context/ChatContext';
import { useNavigate } from 'react-router-dom';
import { useRetainedQueryParams } from '@/modules/ui/hooks/useRetainedQueryParams';

type ChatIntentsRowProps = {
  intents: ChatIntent[];
};

export const ChatIntentsRow = ({ intents }: ChatIntentsRowProps) => {
  return (
    <div>
      <Text className="text-xs italic text-gray-500">Try a suggested action</Text>
      <div className="mt-2 flex flex-wrap gap-2">
        {intents.map((intent, index) => (
          <IntentRow key={index} intent={intent} />
        ))}
      </div>
    </div>
  );
};

type IntentRowProps = {
  intent: ChatIntent;
};

const IntentRow = ({ intent }: IntentRowProps) => {
  const { setConfirmationModalOpened, setSelectedIntent, modalShown } = useChatContext();
  const navigate = useNavigate();
  const intentUrl = useRetainedQueryParams(intent?.url || '');

  return (
    <Button
      variant="suggest"
      onClick={() => {
        if (!modalShown) {
          setConfirmationModalOpened(true);
          setSelectedIntent(intent);
        } else {
          navigate(intentUrl);
        }
      }}
    >
      {intent.intent_description}
    </Button>
  );
};
