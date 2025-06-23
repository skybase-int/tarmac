import { Token } from '@jetstreamgg/sky-hooks';
import { useLingui } from '@lingui/react/macro';
import { WidgetContext } from '@widgets/context/WidgetContext';
import { TransactionReview } from '@widgets/shared/components/ui/transaction/TransactionReview';
import { BatchStatus } from '@widgets/shared/constants';
import {
  getUpgradeReviewSubtitle,
  getRevertReviewSubtitle,
  upgradeActionDescription,
  UpgradeFlow,
  upgradeReviewTitle,
  revertReviewTitle
} from '@widgets/widgets/UpgradeWidget/lib/constants';
import { useContext, useEffect } from 'react';

export const UpgradeTransactionReview = ({
  onExternalLinkClicked,
  batchEnabled,
  setBatchEnabled,
  isBatchTransaction,
  originToken,
  originAmount,
  targetToken,
  targetAmount,
  needsAllowance
}: {
  onExternalLinkClicked?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  batchEnabled?: boolean;
  setBatchEnabled?: (enabled: boolean) => void;
  isBatchTransaction: boolean;
  originToken: Token;
  originAmount: bigint;
  targetToken: Token;
  targetAmount: bigint;
  needsAllowance: boolean;
}) => {
  const { i18n } = useLingui();
  const {
    setTxTitle,
    setTxSubtitle,
    setOriginToken,
    setOriginAmount,
    setTargetToken,
    setTargetAmount,
    setTxDescription,
    txStatus,
    widgetState
  } = useContext(WidgetContext);
  const { flow, action, screen } = widgetState;

  useEffect(() => {
    setOriginToken(originToken);
    setOriginAmount(originAmount);
    setTargetToken(targetToken);
    setTargetAmount(targetAmount);
  }, [originToken, originAmount, targetToken, targetAmount]);

  // Sets the title and subtitle of the card
  useEffect(() => {
    if (flow === UpgradeFlow.UPGRADE) {
      setTxTitle(i18n._(upgradeReviewTitle));
      setTxSubtitle(
        i18n._(
          getUpgradeReviewSubtitle({
            batchStatus: batchEnabled ? BatchStatus.ENABLED : BatchStatus.DISABLED,
            originToken,
            targetToken,
            needsAllowance
          })
        )
      );
    } else if (flow === UpgradeFlow.REVERT) {
      setTxTitle(i18n._(revertReviewTitle));
      setTxSubtitle(
        i18n._(
          getRevertReviewSubtitle({
            batchStatus: batchEnabled ? BatchStatus.ENABLED : BatchStatus.DISABLED,
            originToken,
            targetToken,
            needsAllowance
          })
        )
      );
    }
    setTxDescription(
      i18n._(upgradeActionDescription({ flow, action, txStatus, needsAllowance, originToken, targetToken }))
    );
  }, [flow, action, screen, i18n.locale, isBatchTransaction, batchEnabled]);

  return (
    <TransactionReview
      onExternalLinkClicked={onExternalLinkClicked}
      batchEnabled={batchEnabled}
      setBatchEnabled={setBatchEnabled}
    />
  );
};
