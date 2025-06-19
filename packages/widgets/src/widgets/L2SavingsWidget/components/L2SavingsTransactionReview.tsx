import { Token } from '@jetstreamgg/sky-hooks';
import { useLingui } from '@lingui/react/macro';
import { WidgetContext } from '@widgets/context/WidgetContext';
import { TransactionReview } from '@widgets/shared/components/ui/transaction/TransactionReview';
import { BatchStatus } from '@widgets/shared/constants';
import {
  getSavingsSupplyReviewSubtitle,
  getSavingsWithdrawReviewSubtitle,
  savingsActionDescription,
  SavingsFlow,
  savingsSupplyReviewTitle,
  savingsWithdrawReviewTitle
} from '@widgets/widgets/SavingsWidget/lib/constants';
import { useContext, useEffect } from 'react';

export const L2SavingsTransactionReview = ({
  onExternalLinkClicked,
  batchEnabled,
  setBatchEnabled,
  isBatchTransaction,
  originToken,
  originAmount
}: {
  onExternalLinkClicked?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  batchEnabled?: boolean;
  setBatchEnabled?: (enabled: boolean) => void;
  isBatchTransaction: boolean;
  originToken: Token;
  originAmount: bigint;
}) => {
  const { i18n } = useLingui();
  const {
    setTxTitle,
    setTxSubtitle,
    setOriginToken,
    setOriginAmount,
    setTxDescription,
    txStatus,
    widgetState
  } = useContext(WidgetContext);
  const { flow, action, screen } = widgetState;

  useEffect(() => {
    setOriginToken(originToken);
    setOriginAmount(originAmount);
  }, [originToken, originAmount]);

  // Sets the title and subtitle of the card
  useEffect(() => {
    if (flow === SavingsFlow.SUPPLY) {
      setTxTitle(i18n._(savingsSupplyReviewTitle));
      setTxSubtitle(
        i18n._(
          getSavingsSupplyReviewSubtitle({
            batchStatus: batchEnabled ? BatchStatus.ENABLED : BatchStatus.DISABLED,
            symbol: originToken.symbol
          })
        )
      );
    } else if (flow === SavingsFlow.WITHDRAW) {
      setTxTitle(i18n._(savingsWithdrawReviewTitle));
      setTxSubtitle(
        i18n._(
          getSavingsWithdrawReviewSubtitle({
            batchStatus: batchEnabled ? BatchStatus.ENABLED : BatchStatus.DISABLED,
            symbol: 'sUSDS'
          })
        )
      );
    }
    setTxDescription(i18n._(savingsActionDescription({ flow, action, txStatus })));
  }, [flow, action, screen, i18n.locale, isBatchTransaction]);

  return (
    <TransactionReview
      onExternalLinkClicked={onExternalLinkClicked}
      batchEnabled={batchEnabled}
      setBatchEnabled={setBatchEnabled}
    />
  );
};
