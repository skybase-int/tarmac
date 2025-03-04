import { Button } from '@/components/ui/button';
import { ChatIntent } from '../types/Chat';
import { Text } from '@/modules/layout/components/Typography';
import { useChatContext } from '../context/ChatContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useRetainedQueryParams } from '@/modules/ui/hooks/useRetainedQueryParams';
import { intentSelectedMessage } from '../lib/intentSelectedMessage';
import { QueryParams } from '@/lib/constants';
import { useNetworkFromIntentUrl } from '../hooks/useNetworkFromUrl';
import { chainIdNameMapping, intentModifiesState } from '../lib/intentUtils';
import { useChainId } from 'wagmi';
import { ConfirmationWarningRow } from './ConfirmationWarningRow';
import { deleteSearchParams } from '@/modules/utils/deleteSearchParams';

type ChatIntentsRowProps = {
  intents: ChatIntent[];
};

const intentsTest = (current: string) => {
  return [
    {
      intent_description: 'RESET CURRENT',
      url: `/?${current}&reset=true`,
      intent_id: 'reset'
    },
    {
      intent_description: 'Enter in a reward with 3.9',
      url: '/?network=ethereum&widget=rewards&reward=0x0650CAF159C5A49f711e8169D4336ECB9b950275&flow=supply&details=false&input_amount=3.9106&reset=true',
      intent_id: 'rewards'
    },
    {
      intent_description: 'Start Reward flow',
      url: '/?network=ethereum&widget=rewards&reset=true',
      intent_id: 'rewards'
    },
    {
      url: '/?network=ethereum&widget=savings&details=false&flow=supply&reset=true',
      intent_description: 'Start Savings flow',
      intent_id: 'savings'
    },
    {
      url: '/?network=arbitrumone&widget=savings&details=false&flow=withdraw&reset=true',
      intent_description: 'Start Savings withdraw flow',
      intent_id: 'savings'
    },
    {
      intent_description: 'Start Upgrade flow',
      url: '/?network=ethereum&widget=upgrade&reset=true',
      intent_id: 'upgrade'
    },
    {
      intent_description: 'Start Trade flow',
      url: '/?network=ethereum&widget=trade&reset=true',
      intent_id: 'trade'
    },
    {
      intent_description: 'Start Trade flow Arbitrum',
      url: '/?network=arbitrumone&widget=trade&reset=true',
      intent_id: 'trade'
    },
    {
      intent_description: 'Start Trade flow Base',
      url: '/?network=base&widget=trade&reset=true',
      intent_id: 'trade'
    },
    {
      intent_description: 'Start Seal flow',
      url: '/?network=ethereum&widget=seal&reset=true',
      intent_id: 'seal'
    }
  ];
};

export const ChatIntentsRow = ({ intents }: ChatIntentsRowProps) => {
  console.log('🚀 ~ ChatIntentsRow ~ intents:', intents);
  const { shouldShowConfirmationWarning, shouldDisableActionButtons } = useChatContext();

  // TODO: remove this vvvvvv
  const [searchParams] = useSearchParams();
  const newSearchParams = deleteSearchParams(searchParams);
  console.log('🚀 ~ ChatIntentsRow ~ newSearchParams:', newSearchParams.toString());
  console.log('🚀 ~ ChatIntentsRow ~ searchParams:', searchParams);
  // TODO: remove this ^^^^^^

  return (
    <div>
      <Text className="text-xs italic text-gray-500">Try a suggested action</Text>
      <div className="mt-2 flex flex-wrap gap-2">
        {intentsTest(newSearchParams.toString()).map((intent, index) => (
          <IntentRow key={index} intent={intent} shouldDisableActionButtons={shouldDisableActionButtons} />
        ))}
      </div>
      {shouldShowConfirmationWarning && <ConfirmationWarningRow />}
    </div>
  );
};

type IntentRowProps = {
  intent: ChatIntent;
  shouldDisableActionButtons: boolean;
};

const IntentRow = ({ intent, shouldDisableActionButtons }: IntentRowProps) => {
  const chainId = useChainId();
  const { setConfirmationWarningOpened, setSelectedIntent, setChatHistory, hasShownIntent } =
    useChatContext();
  const navigate = useNavigate();
  const intentUrl = useRetainedQueryParams(intent?.url || '', [
    QueryParams.Locale,
    QueryParams.Details,
    QueryParams.Chat
  ]);

  const network =
    useNetworkFromIntentUrl(intentUrl) || chainIdNameMapping[chainId as keyof typeof chainIdNameMapping];
  const modifiesState = intentModifiesState(intent);

  return (
    <Button
      variant="suggest"
      disabled={shouldDisableActionButtons}
      onClick={() => {
        setConfirmationWarningOpened(false);

        if (!hasShownIntent(intent) && modifiesState) {
          setConfirmationWarningOpened(true);
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
      {network && (
        <img
          src={`/networks/${network}.svg`}
          alt={`${network} logo`}
          className={`ml-2 h-5 w-5 ${shouldDisableActionButtons ? 'opacity-30' : ''}`}
        />
      )}
    </Button>
  );
};
