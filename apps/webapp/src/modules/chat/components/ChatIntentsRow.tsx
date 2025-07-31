import { Button } from '@/components/ui/button';
import { ChatIntent } from '../types/Chat';
import { Text } from '@/modules/layout/components/Typography';
import { useChatContext } from '../context/ChatContext';
import { useNavigate } from 'react-router-dom';
import { useRetainedQueryParams } from '@/modules/ui/hooks/useRetainedQueryParams';
import { intentSelectedMessage } from '../lib/intentSelectedMessage';
import { QueryParams } from '@/lib/constants';
import { useNetworkFromIntentUrl } from '../hooks/useNetworkFromUrl';
import { chainIdNameMapping, intentModifiesState } from '../lib/intentUtils';
import { useChainId } from 'wagmi';
import { ConfirmationWarningRow } from './ConfirmationWarningRow';
import { HStack } from '@/modules/layout/components/HStack';
import { InfoTooltip } from '@/components/InfoTooltip';
import { Trans } from '@lingui/react/macro';

type ChatIntentsRowProps = {
  intents: ChatIntent[];
};

const addResetParam = (url: string): string => {
  try {
    const urlObj = new URL(url, window.location.origin);
    urlObj.searchParams.set(QueryParams.Reset, 'true');
    return urlObj.pathname + urlObj.search;
  } catch (error) {
    console.error('Failed to parse URL:', error);
    return url;
  }
};

export const ChatIntentsRow = ({ intents }: ChatIntentsRowProps) => {
  const { shouldShowConfirmationWarning, shouldDisableActionButtons } = useChatContext();

  return (
    <div>
      <HStack>
        <Text className="mr-2 text-xs italic text-gray-500">
          <Trans>Try a suggested action</Trans>
        </Text>
        <InfoTooltip
          iconClassName="text-gray-400"
          iconSize={12}
          content={
            <Text variant="small">
              <Trans>
                Selecting a suggested action will prefill transaction details, but execution still requires
                user review and confirmation.
              </Trans>
            </Text>
          }
        />
      </HStack>
      <div className="mt-2 flex flex-wrap gap-2">
        {intents.map((intent, index) => (
          <IntentRow
            key={index}
            intent={{ ...intent, url: addResetParam(intent.url) }}
            shouldDisableActionButtons={shouldDisableActionButtons}
          />
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
    >
      {intent.title}
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
