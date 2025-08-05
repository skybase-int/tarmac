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
import {
  ArbitrumChain as Arbitrumone,
  Info,
  MainnetChain as Ethereum,
  OptimismChain as Opmainnet,
  BaseChain as Base,
  UnichainChain as Unichain
} from '@/modules/icons';
import { Tooltip, TooltipArrow, TooltipPortal, TooltipTrigger } from '@/components/ui/tooltip';
import { TooltipContent } from '@/components/ui/tooltip';
import { Trans } from '@lingui/react/macro';
import { capitalizeFirstLetter } from '@/lib/helpers/string/capitalizeFirstLetter';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

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
  const { shouldShowConfirmationWarning, shouldDisableActionButtons, triggerScroll } = useChatContext();
  const [isExpanded, setIsExpanded] = useState(false);

  const INITIAL_VISIBLE_COUNT = 3;
  const hasMoreIntents = intents.length > INITIAL_VISIBLE_COUNT;
  const visibleIntents = hasMoreIntents && !isExpanded ? intents.slice(0, INITIAL_VISIBLE_COUNT) : intents;
  const hiddenCount = intents.length - INITIAL_VISIBLE_COUNT;

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      // Trigger scroll when expanding
      setTimeout(() => {
        triggerScroll();
      }, 100);
    }
  };

  return (
    <div>
      <HStack>
        <Text className="mr-2 text-xs italic text-gray-500">
          <Trans>Try a suggested action</Trans>
        </Text>
        <Tooltip>
          <TooltipTrigger asChild className="cursor-pointer text-gray-400">
            <Info width={12} height={12} />
          </TooltipTrigger>
          <TooltipPortal>
            <TooltipContent arrowPadding={10} className="max-w-[300px]">
              <Text variant="small">
                <Trans>
                  Selecting a suggested action will prefill transaction details, but execution still requires
                  user review and confirmation.
                </Trans>
              </Text>
              <TooltipArrow width={12} height={8} />
            </TooltipContent>
          </TooltipPortal>
        </Tooltip>
      </HStack>
      <div className="mt-2 flex flex-wrap gap-2">
        {visibleIntents.map((intent, index) => (
          <IntentRow
            key={index}
            intent={{ ...intent, url: addResetParam(intent.url) }}
            shouldDisableActionButtons={shouldDisableActionButtons}
          />
        ))}
      </div>
      {hasMoreIntents && (
        <Button
          variant="link"
          onClick={handleToggleExpand}
          className="mt-3 flex h-auto items-center gap-1 py-1 pl-1 pr-0 text-sm font-normal"
        >
          {isExpanded ? (
            <Trans>Collapse</Trans>
          ) : (
            <Trans>
              Show {hiddenCount} more {hiddenCount === 1 ? 'action' : 'actions'}
            </Trans>
          )}
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
          />
        </Button>
      )}
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

  const networkIcons = {
    Ethereum,
    Arbitrumone,
    Opmainnet,
    Base,
    Unichain
  };

  const IconComponent =
    networkIcons[capitalizeFirstLetter(network || '') as keyof typeof networkIcons] || Ethereum;

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
      <IconComponent className="h-4.5 w-4.5 ml-2" />
    </Button>
  );
};
