import { UpgradeWidget as BaseUpgradeWidget } from '@jetstreamgg/widgets';
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';
import { useCustomConnectModal } from '../../hooks/useCustomConnectModal';
import { TOKENS } from '@jetstreamgg/hooks';

interface UpgradeWidgetProps {
  externalWidgetState: any;
}

export function UpgradeWidgetDisplay({ externalWidgetState }: UpgradeWidgetProps) {
  const addRecentTransaction = useAddRecentTransaction();
  const onConnectModal = useCustomConnectModal();

  // Simulate restricted page
  const mockRestricted = false;
  const upgradeOptions = mockRestricted ? [TOKENS.dai] : [TOKENS.dai, TOKENS.mkr];

  return (
    <BaseUpgradeWidget
      locale="en"
      addRecentTransaction={addRecentTransaction}
      onConnect={onConnectModal}
      rightHeaderComponent={undefined}
      externalWidgetState={externalWidgetState}
      upgradeOptions={upgradeOptions}
    />
  );
}
