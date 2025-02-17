import { Button } from '@/components/ui/button';
import { ChatIntent } from '../types/Chat';
import { Text } from '@/modules/layout/components/Typography';
import { useChatContext } from '../context/ChatContext';
import { useNavigate } from 'react-router-dom';
import { useRetainedQueryParams } from '@/modules/ui/hooks/useRetainedQueryParams';
import { intentSelectedMessage } from '../lib/intentSelectedMessage';
import { QueryParams } from '@/lib/constants';
import { useCallback } from 'react';

export const ConfirmationWarningRow = () => {
  const {
    setConfirmationWarningOpened,
    setSelectedIntent,
    hasShownIntent,
    setChatHistory,
    selectedIntent,
    warningShown,
    setWarningShown
  } = useChatContext();

  const navigate = useNavigate();

  const onIntentSelected = useCallback(
    (intent: ChatIntent) => setChatHistory(prev => [...prev, intentSelectedMessage(intent)]),
    []
  );

  const handleCancel = useCallback(
    (change: boolean) => {
      setConfirmationWarningOpened(change);
      setSelectedIntent(undefined);
    },
    [setConfirmationWarningOpened, setSelectedIntent]
  );

  const selectedIntentUrl = useRetainedQueryParams(selectedIntent?.url || '', [
    QueryParams.Locale,
    QueryParams.Details,
    QueryParams.Chat
  ]);

  const handleConfirm = useCallback(() => {
    setConfirmationWarningOpened(false);
    if (selectedIntent && !hasShownIntent(selectedIntent)) {
      setWarningShown([...warningShown, selectedIntent]);
    }
    if (selectedIntentUrl) navigate(selectedIntentUrl);
    if (selectedIntent) onIntentSelected(selectedIntent);
  }, [
    selectedIntentUrl,
    setConfirmationWarningOpened,
    navigate,
    selectedIntent,
    onIntentSelected,
    warningShown,
    hasShownIntent
  ]);

  return (
    <div className="mt-6 h-[200px] bg-red-200">
      <Text>ConfirmationWarning</Text>
      <Button variant="secondary" onClick={() => handleCancel(false)}>
        Cancel
      </Button>
      <Button variant="default" onClick={handleConfirm}>
        Continue
      </Button>
    </div>
  );
};
