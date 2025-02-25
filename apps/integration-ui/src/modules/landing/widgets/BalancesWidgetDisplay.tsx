import { BalancesWidget as BaseBalancesWidget } from '@jetstreamgg/widgets';
import { formatNumber } from '@jetstreamgg/utils';
import { useCustomConnectModal } from '../../hooks/useCustomConnectModal';

export function BalancesWidgetDisplay() {
  const onConnectModal = useCustomConnectModal();

  return (
    <BaseBalancesWidget
      onConnect={onConnectModal}
      locale="en"
      rightHeaderComponent={undefined}
      externalWidgetState={{ tab: 'left' }}
      hideModuleBalances={false}
      actionForToken={(symbol, balance) => {
        return symbol.toLowerCase() === 'dai'
          ? {
              label: `Upgrade your ${formatNumber(
                parseFloat(balance)
              )} ${symbol.toUpperCase()} to USDS and start getting Sky Token Rewards`,
              actionUrl: '?widget=upgrade',
              image: `/tokens/actions/${symbol.toLowerCase()}.png`
            }
          : undefined;
      }}
      rewardsCardUrl={''}
      savingsCardUrlMap={{}}
      sealCardUrl={''}
    />
  );
}
