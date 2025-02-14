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

const sealIntents = [
  {
    intent_description: 'Go to Seal',
    url: '/?widget=seal',
    intent_id: 'seal'
  },
  {
    intent_description: 'Manage Seal URN 1',
    url: '/?widget=seal&urn_index=0',
    intent_id: 'seal'
  },
  {
    intent_description: 'Manage Seal URN 2',
    url: '/?widget=seal&urn_index=1',
    intent_id: 'seal'
  },
  {
    intent_description: 'Seal 10 tokens in URN 3',
    url: '/?widget=seal&urn_index=2&input_amount=10&seal_tab=lock',
    intent_id: 'seal'
  },
  {
    intent_description: 'OPEN NEW position with 10 tokens',
    url: '/?widget=seal&input_amount=10&flow=open',
    intent_id: 'seal'
  },
  {
    intent_description: 'OPEN NEW position',
    url: '/?widget=seal&flow=open',
    intent_id: 'seal'
  },
  {
    intent_description: 'Unseal 33 tokens in URN 4',
    url: '/?widget=seal&urn_index=3&input_amount=33&seal_tab=free',
    intent_id: 'seal'
  },
  {
    intent_description: 'Manage Seal URN 3',
    url: '/?widget=seal&urn_index=2',
    intent_id: 'seal'
  },
  {
    intent_description: 'Seal - LOCK tokens in URN 3',
    url: '/?widget=seal&urn_index=2&seal_tab=lock',
    intent_id: 'seal'
  },
  {
    intent_description: 'Seal - FREE tokens in URN 13 (LAST ONE)',
    url: '/?widget=seal&urn_index=12&seal_tab=free',
    intent_id: 'seal'
  },
  {
    intent_description: 'Manage Seal URN 14 (IT DOES NOT EXIST)',
    url: '/?widget=seal&urn_index=14',
    intent_id: 'seal'
  },
  {
    intent_description: 'Manage Seal URN 99 (IT DOES NOT EXIST)',
    url: '/?widget=seal&urn_index=98',
    intent_id: 'seal'
  },
  {
    intent_description: 'Go to Rewards',
    url: '/?widget=rewards',
    intent_id: 'rewards'
  }
];

export const ChatIntentsRow = ({ intents }: ChatIntentsRowProps) => {
  console.log('🚀 ~ ChatIntentsRow ~ intents:', intents);
  return (
    <div>
      <Text className="text-xs italic text-gray-500">Try a suggested action</Text>
      <div className="mt-2 flex flex-wrap gap-2">
        {sealIntents.map((intent, index) => (
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
