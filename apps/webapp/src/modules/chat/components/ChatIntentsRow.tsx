import { Button } from '@/components/ui/button';
import { ChatIntent } from '../types/Chat';
import { Text } from '@/modules/layout/components/Typography';
import { useChatContext } from '../context/ChatContext';
import { useNavigate } from 'react-router-dom';
import { useRetainedQueryParams } from '@/modules/ui/hooks/useRetainedQueryParams';
import { intentSelectedMessage } from '../lib/intentSelectedMessage';
import { QueryParams } from '@/lib/constants';

type ChatIntentsRowProps = {
  intents: ChatIntent[];
};

// TEST PURPOSES ONLY
const network = 'ethereum';
const testTradeIntents: ChatIntent[] = [
  // Simple "Trade (token)" variants - allowed tokens
  {
    intent_id: 'trade',
    intent_description: 'Go to Trade',
    url: `?widget=trade&chat=true&details=false&network=${network}`
  },
  {
    intent_id: 'trade',
    intent_description: 'Trade USDC',
    url: `?widget=trade&chat=true&details=false&network=${network}&source_token=USDC`
  },
  {
    intent_id: 'trade',
    intent_description: 'Trade ETH',
    url: `?widget=trade&chat=true&details=false&network=${network}&source_token=ETH`
  },
  {
    intent_id: 'trade',
    intent_description: 'Trade WETH',
    url: `?widget=trade&chat=true&details=false&network=${network}&source_token=WETH`
  },
  {
    intent_id: 'trade',
    intent_description: 'Trade USDT',
    url: `?widget=trade&chat=true&details=false&network=${network}&source_token=USDT`
  },
  {
    intent_id: 'trade',
    intent_description: 'Trade DAI',
    url: `?widget=trade&chat=true&details=false&network=${network}&source_token=DAI`
  },
  {
    intent_id: 'trade',
    intent_description: 'Trade USDS',
    url: `?widget=trade&chat=true&details=false&network=${network}&source_token=USDS`
  },

  // "Trade to Token" variants
  {
    intent_id: 'trade',
    intent_description: 'Trade to USDC',
    url: `?widget=trade&chat=true&details=false&network=${network}&target_token=USDC`
  },
  {
    intent_id: 'trade',
    intent_description: 'Trade to ETH',
    url: `?widget=trade&chat=true&details=false&network=${network}&target_token=ETH`
  },
  {
    intent_id: 'trade',
    intent_description: 'Trade to WETH',
    url: `?widget=trade&chat=true&details=false&network=${network}&target_token=WETH`
  },

  // Valid "Trade TokenA for TokenB" combinations
  {
    intent_id: 'trade',
    intent_description: 'Trade USDC for DAI',
    url: `?widget=trade&chat=true&details=false&network=${network}&source_token=USDC&target_token=DAI`
  },
  {
    intent_id: 'trade',
    intent_description: 'Trade USDT for USDC',
    url: `?widget=trade&chat=true&details=false&network=${network}&source_token=USDT&target_token=USDC`
  },
  {
    intent_id: 'trade',
    intent_description: 'Trade DAI for USDS',
    url: `?widget=trade&chat=true&details=false&network=${network}&source_token=DAI&target_token=USDS`
  },

  // Not allowed combinations (ETH/WETH) - good for testing restrictions
  {
    intent_id: 'trade',
    intent_description: 'Trade ETH for WETH',
    url: `?widget=trade&chat=true&details=false&network=${network}&source_token=ETH&target_token=WETH`
  },
  {
    intent_id: 'trade',
    intent_description: 'Trade WETH for ETH',
    url: `?widget=trade&chat=true&details=false&network=${network}&source_token=WETH&target_token=ETH`
  },

  // "Trade N Amount Token" variants
  {
    intent_id: 'trade',
    intent_description: 'Trade 100 USDC',
    url: `?widget=trade&chat=true&details=false&network=${network}&source_token=USDC&input_amount=100`
  },
  {
    intent_id: 'trade',
    intent_description: 'Trade 1 ETH',
    url: `?widget=trade&chat=true&details=false&network=${network}&source_token=ETH&input_amount=1`
  },
  {
    intent_id: 'trade',
    intent_description: 'Trade 2 WETH',
    url: `?widget=trade&chat=true&details=false&network=${network}&source_token=WETH&input_amount=2`
  },

  // "Trade N Amount TokenA for TokenB" variants - valid combinations
  {
    intent_id: 'trade',
    intent_description: 'Trade 1000 USDC for DAI',
    url: `?widget=trade&chat=true&details=false&network=${network}&source_token=USDC&target_token=DAI&input_amount=1000`
  },
  {
    intent_id: 'trade',
    intent_description: 'Trade 500 USDT for USDC',
    url: `?widget=trade&chat=true&details=false&network=${network}&source_token=USDT&target_token=USDC&input_amount=500`
  },
  {
    intent_id: 'trade',
    intent_description: 'Trade 200 DAI for USDS',
    url: `?widget=trade&chat=true&details=false&network=${network}&source_token=DAI&target_token=USDS&input_amount=200`
  },

  // Not allowed combinations with amounts (ETH/WETH) - good for testing restrictions
  {
    intent_id: 'trade',
    intent_description: 'Trade 1 ETH for WETH',
    url: `?widget=trade&chat=true&details=false&network=${network}&source_token=ETH&target_token=WETH&input_amount=1`
  },
  {
    intent_id: 'trade',
    intent_description: 'Trade 2 WETH for ETH',
    url: `?widget=trade&chat=true&details=false&network=${network}&source_token=WETH&target_token=ETH&input_amount=2`
  },
  {
    intent_id: 'trade',
    intent_description: 'Trade DAI for DAI',
    url: `?widget=trade&chat=true&details=false&network=${network}&source_token=DAI&target_token=DAI`
  },
  {
    intent_id: 'trade',
    intent_description: 'Trade USDC for USDC',
    url: `?widget=trade&chat=true&details=false&network=${network}&source_token=USDC&target_token=USDC`
  }
];
// TODO: remove this ^^^^

export const ChatIntentsRow = ({ intents }: ChatIntentsRowProps) => {
  console.log('🚀 ~ intents:', intents);
  return (
    <div>
      <Text className="text-xs italic text-gray-500">Try a suggested action</Text>
      <div className="mt-2 flex flex-wrap gap-2">
        {/* {intents.map((intent, index) => ( */}
        {testTradeIntents.map((intent, index) => (
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
  // const { setConfirmationModalOpened, setSelectedIntent, hasShownIntent, setChatHistory } = useChatContext();
  const { setChatHistory } = useChatContext();
  const navigate = useNavigate();
  const intentUrl = useRetainedQueryParams(intent?.url || '', [
    QueryParams.Locale,
    QueryParams.Details,
    QueryParams.Chat
  ]);

  return (
    <Button
      variant="suggest"
      onClick={() => {
        // if (!hasShownIntent(intent)) {
        //   setConfirmationModalOpened(true);
        //   setSelectedIntent(intent);
        // } else {
        //   setChatHistory(prev => [...prev, intentSelectedMessage(intent)]);
        //   navigate(intentUrl);
        // }
        setChatHistory(prev => [...prev, intentSelectedMessage(intent)]);
        // navigate('?widget=trade&chat=true&target_token=USDC&network=sepolia&details=false');
        navigate(intentUrl);
      }}
      onMouseEnter={() => {
        console.log('🚀 ~ onMouseEnter ~ intent:', intent);
        console.log('🚀 ~ IntentRow ~ intentUrl:', intentUrl);
      }}
    >
      {intent.intent_description}
    </Button>
  );
};
