import React, { useContext } from 'react';
import { useSignAndCancelOrder } from '@jetstreamgg/hooks';
import { LoadingButton } from '@/shared/components/ui/LoadingButton';
import { WidgetContext } from '@/context/WidgetContext';
import { t } from '@lingui/core/macro';
import { TxStatus } from '@/shared/constants';
import { WidgetMessage } from '@/shared/types/widgetState';

export const CancelOrderButton: React.FC<{
  onNotification?: (message: WidgetMessage) => void;
}> = ({ onNotification }) => {
  const { orderId, setTxStatus } = useContext(WidgetContext);

  const { execute } = useSignAndCancelOrder({
    orderUids: orderId ? [orderId] : [],
    onSuccess: () => {
      onNotification?.({
        title: t`Cancel successful`,
        description: t`You successfully cancelled the order`,
        status: TxStatus.SUCCESS
      });
      setTxStatus(TxStatus.CANCELLED);
    },
    onError: (error: Error) => {
      console.error(error);
      // TODO handle error
    }
  });

  const handleCancelOrder = () => {
    execute();
  };

  return (
    <LoadingButton
      variant="secondary"
      onClick={handleCancelOrder}
      disabled={!orderId}
      buttonText={t`Cancel Order`}
    />
  );
};
