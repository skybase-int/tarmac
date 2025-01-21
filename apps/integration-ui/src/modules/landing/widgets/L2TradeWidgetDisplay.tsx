import { L2TradeWidget, ExternalWidgetState } from '@jetstreamgg/widgets';
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';
import { useCustomConnectModal } from '../../hooks/useCustomConnectModal';

interface TradeWidgetProps {
  externalWidgetState: ExternalWidgetState;
}

export function BaseTradeWidgetDisplay({ externalWidgetState }: TradeWidgetProps) {
  const addRecentTransaction = useAddRecentTransaction();
  const onConnectModal = useCustomConnectModal();

  return (
    <L2TradeWidget
      onConnect={onConnectModal}
      addRecentTransaction={addRecentTransaction}
      locale="en"
      referralCode={1}
      rightHeaderComponent={undefined}
      externalWidgetState={externalWidgetState}
      onExternalLinkClicked={e => {
        const href = e.currentTarget.getAttribute('href');
        const linkText = e.currentTarget.textContent;
        console.log(href);
        console.log(linkText);

        const isAllowed = true; // Check here if the link is allowed
        if (!isAllowed) {
          e.preventDefault();
          console.log('Show modal');
        }
      }}
      widgetTitle="Base Trade"
    />
  );
}
