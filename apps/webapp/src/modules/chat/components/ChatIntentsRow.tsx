import { Button } from '@/components/ui/button';
import { ChatIntent } from '../types/Chat';
import { Text } from '@/modules/layout/components/Typography';
import { useChatContext } from '../context/ChatContext';
import { useNavigate } from 'react-router-dom';
import { useRetainedQueryParams } from '@/modules/ui/hooks/useRetainedQueryParams';
import { intentSelectedMessage } from '../lib/intentSelectedMessage';
import { QueryParams } from '@/lib/constants';
import { useNetworkFromIntentUrl } from '../hooks/useNetworkFromUrl';
import { chainIdNameMapping } from '../lib/intentUtils';
import { useChainId } from 'wagmi';

type ChatIntentsRowProps = {
  intents: ChatIntent[];
};

const network = 'ethereum';

const rewardsIntents = [
  {
    intent_description: 'Go to Rewards',
    url: `/?widget=rewards&network=${network}&details=false&chat=true`,
    intent_id: 'rewards'
  },
  {
    intent_description: 'Withdraw rewards (NO farm)',
    url: `/?widget=rewards&flow=withdraw&network=${network}&details=false&chat=true`,
    intent_id: 'rewards'
  },
  {
    intent_description: 'Withdraw rewards (CHR)',
    url: `/?widget=rewards&flow=withdraw&network=${network}&details=true&chat=true&reward=0x10ab606B067C9C461d8893c47C7512472E19e2Ce`,
    intent_id: 'rewards'
  },
  {
    intent_description: 'Withdraw rewards (SKY)',
    url: `/?widget=rewards&flow=withdraw&network=${network}&details=true&chat=true&reward=0x0650CAF159C5A49f711e8169D4336ECB9b950275`,
    intent_id: 'rewards'
  },
  {
    intent_description: 'Withdraw 100 rewards (SKY)',
    url: `/?widget=rewards&flow=withdraw&network=${network}&details=true&chat=true&reward=0x0650CAF159C5A49f711e8169D4336ECB9b950275&input_amount=100`,
    intent_id: 'rewards'
  },
  {
    intent_description: 'Withdraw 334 rewards (SKY)',
    url: `/?widget=rewards&flow=withdraw&network=${network}&details=true&chat=true&reward=0x0650CAF159C5A49f711e8169D4336ECB9b950275&input_amount=334`,
    intent_id: 'rewards'
  },
  {
    intent_description: 'Supply rewards (CHR)',
    url: `/?widget=rewards&flow=supply&network=${network}&details=true&chat=true&reward=0x10ab606B067C9C461d8893c47C7512472E19e2Ce`,
    intent_id: 'rewards'
  },
  {
    intent_description: 'Supply rewards (SKY)',
    url: `/?widget=rewards&flow=supply&network=${network}&details=true&chat=true&reward=0x0650CAF159C5A49f711e8169D4336ECB9b950275`,
    intent_id: 'rewards'
  },
  {
    intent_description: 'Supply 789 rewards (SKY)',
    url: `/?widget=rewards&flow=supply&network=${network}&details=true&chat=true&reward=0x0650CAF159C5A49f711e8169D4336ECB9b950275&input_amount=789`,
    intent_id: 'rewards'
  },
  {
    intent_description: 'Supply 123 rewards (SKY)',
    url: `/?widget=rewards&flow=supply&network=${network}&details=true&chat=true&reward=0x0650CAF159C5A49f711e8169D4336ECB9b950275&input_amount=123`,
    intent_id: 'rewards'
  },
  {
    intent_description: 'Savings Supply',
    url: `/?widget=savings&flow=supply&network=${network}&details=true&chat=true`,
    intent_id: 'savings'
  },
  {
    intent_description: 'Savings Withdraw',
    url: `/?widget=savings&flow=withdraw&network=${network}&details=true&chat=true`,
    intent_id: 'savings'
  }
];

export const ChatIntentsRow = ({ intents }: ChatIntentsRowProps) => {
  console.log('🚀 ~ ChatIntentsRow ~ intents:', intents);
  return (
    <div>
      <Text className="text-xs italic text-gray-500">Try a suggested action</Text>
      <div className="mt-2 flex flex-wrap gap-2">
        {rewardsIntents.map((intent, index) => (
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
  const chainId = useChainId();
  const { setConfirmationModalOpened, setSelectedIntent, hasShownIntent, setChatHistory } = useChatContext();
  const navigate = useNavigate();
  const intentUrl = useRetainedQueryParams(intent?.url || '', [
    QueryParams.Locale,
    QueryParams.Details,
    QueryParams.Chat
  ]);

  const network =
    useNetworkFromIntentUrl(intentUrl) || chainIdNameMapping[chainId as keyof typeof chainIdNameMapping];

  return (
    <Button
      variant="suggest"
      onClick={() => {
        if (!hasShownIntent(intent)) {
          setConfirmationModalOpened(true);
          setSelectedIntent(intent);
        } else {
          setChatHistory(prev => [...prev, intentSelectedMessage(intent)]);
          navigate(intentUrl);
        }
      }}
      onMouseEnter={() => {
        // console.log('🚀 ~ onMouseEnter ~ intent:', intent);
        // console.log('🚀 ~ IntentRow ~ intentUrl:', intentUrl);
      }}
    >
      {intent.intent_description}
      {network && <img src={`/networks/${network}.svg`} alt={`${network} logo`} className="ml-2 h-5 w-5" />}
    </Button>
  );
};
