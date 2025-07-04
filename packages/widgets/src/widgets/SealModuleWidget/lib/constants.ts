import { msg } from '@lingui/core/macro';
import { MessageDescriptor } from '@lingui/core';
import { TxStatus } from '@widgets/shared/constants';
import { TxCardCopyText } from '@widgets/shared/types/txCardCopyText';
import { TOKENS } from '@jetstreamgg/sky-hooks';

export enum SealFlow {
  OPEN = 'open',
  MANAGE = 'manage',
  CLAIM = 'claim'
}

export enum SealAction {
  // Open flow can only do these two actions:
  APPROVE = 'approve',
  MULTICALL = 'multicall',

  OVERVIEW = 'overview',

  // These only need to be used if just a single action is being taken during manage flow:
  LOCK = 'lock',
  FREE = 'free',

  BORROW = 'borrow',
  REPAY = 'repay',

  REWARDS = 'rewards',
  DELEGATE = 'delegate',

  CLAIM = 'claim'
}

export enum SealStep {
  ABOUT = 'about',
  OPEN_BORROW = 'open_borrow', // TODO: technically lock and borrow
  REWARDS = 'rewards',
  DELEGATE = 'delegate',
  SUMMARY = 'summary'
}

export enum SealScreen {
  ACTION = 'action',
  TRANSACTION = 'transaction'
}

export function getStepTitle(step: SealStep, tab: 'left' | 'right'): MessageDescriptor {
  switch (step) {
    case SealStep.OPEN_BORROW:
      return tab === 'left' ? msg`Seal and Borrow` : msg`Unseal and pay back`;
    case SealStep.REWARDS:
      return msg`Select reward`;
    case SealStep.DELEGATE:
      return msg`Select a delegate`;
    case SealStep.SUMMARY:
      return msg`Confirm your position`;
    default:
      return msg``;
  }
}

export const sealApproveTitle: TxCardCopyText = {
  [TxStatus.INITIALIZED]: msg`Approve token access`,
  [TxStatus.LOADING]: msg`In progress`,
  [TxStatus.SUCCESS]: msg`Token access approved`,
  [TxStatus.ERROR]: msg`Error`
};

export const sealApproveSubtitle: TxCardCopyText = {
  [TxStatus.INITIALIZED]: msg`Please allow this app to access the tokens in your wallet.`,
  [TxStatus.LOADING]: msg`Token access approval in progress.`,
  [TxStatus.SUCCESS]: msg`Next, confirm the transaction in your wallet.`,
  [TxStatus.ERROR]: msg`An error occurred when allowing this app to access the tokens in your wallet.`
};

export const sealApproveDescription: Record<string, MessageDescriptor> = {
  [TOKENS.mkr.symbol]: msg`Sealing MKR in the Seal Rewards module`,
  [TOKENS.sky.symbol]: msg`Sealing SKY in the Seal Rewards module`
};

export const hopeLoadingButtonText: TxCardCopyText = {
  [TxStatus.INITIALIZED]: msg`Waiting for confirmation`,
  [TxStatus.LOADING]: msg`Processing transaction`,
  [TxStatus.SUCCESS]: msg`Success`,
  [TxStatus.ERROR]: msg`Error`
};

export const repayApproveDescription: MessageDescriptor = msg`Repaying USDS in the Seal Rewards module`;

export function getSealTitle(
  txStatus: Omit<TxStatus, TxStatus.CANCELLED>,
  flow: SealFlow
): MessageDescriptor {
  switch (txStatus) {
    case TxStatus.INITIALIZED:
      return flow === SealFlow.OPEN
        ? msg`Confirm your transaction`
        : msg`Confirm the change in your position`;
    case TxStatus.LOADING:
      return msg`In progress`;
    case TxStatus.SUCCESS:
      return msg`Success!`;
    case TxStatus.ERROR:
    case TxStatus.CANCELLED:
    default:
      return msg`Error`;
  }
}

export function getSealSubtitle({
  flow,
  txStatus,
  collateralToLock,
  borrowAmount,
  collateralToFree,
  borrowToRepay,
  selectedToken
}: {
  flow: SealFlow;
  txStatus: Omit<TxStatus, TxStatus.CANCELLED>;
  collateralToLock?: string;
  borrowAmount?: string;
  collateralToFree?: string;
  borrowToRepay?: string;
  selectedToken?: string;
}): MessageDescriptor {
  switch (txStatus) {
    case TxStatus.INITIALIZED:
      return msg`Almost done!`;
    case TxStatus.LOADING:
      return flow === SealFlow.OPEN
        ? msg`Your transaction is being processed on the blockchain to create your position. Please wait.`
        : msg`Your transaction is being processed on the blockchain. Please wait.`;
    case TxStatus.SUCCESS:
      return flow === SealFlow.OPEN
        ? collateralToLock && borrowAmount
          ? msg`You've borrowed ${borrowAmount} USDS by sealing ${collateralToLock} ${selectedToken ?? ''}. Your new position is open.`
          : collateralToLock
            ? msg`You've sealed ${collateralToLock} ${selectedToken ?? ''}. Your new position is open.`
            : msg`You just opened your position`
        : collateralToFree && borrowToRepay
          ? msg`You've unsealed ${collateralToFree} ${selectedToken ?? ''} and repaid ${borrowToRepay} USDS to exit your position.`
          : collateralToFree
            ? msg`You've unsealed ${collateralToFree} ${selectedToken ?? ''} to exit your position.`
            : borrowToRepay
              ? msg`You've repaid ${borrowToRepay} USDS to exit your position.`
              : collateralToLock && borrowAmount
                ? msg`You've borrowed ${borrowAmount} USDS by sealing ${collateralToLock} ${selectedToken ?? ''}. Your position is updated.`
                : collateralToLock
                  ? msg`You've sealed ${collateralToLock} ${selectedToken ?? ''}. Your position is updated.`
                  : borrowAmount
                    ? msg`You've borrowed ${borrowAmount} USDS. Your position is updated.`
                    : msg`You just updated your position`;
    case TxStatus.ERROR:
    default:
      return msg`Error`;
  }
}

export function sealLoadingButtonText({
  txStatus,
  flow
}: {
  flow: SealFlow;
  txStatus: TxStatus;
}): MessageDescriptor {
  switch (txStatus) {
    case TxStatus.INITIALIZED:
      return msg`Waiting for confirmation`;
    default:
      return flow === SealFlow.OPEN
        ? msg`Opening position`
        : flow === SealFlow.MANAGE
          ? msg`Changing position`
          : msg`Loading`;
  }
}

export const claimTitle: TxCardCopyText = {
  [TxStatus.INITIALIZED]: msg`Claim your rewards`,
  [TxStatus.LOADING]: msg`In progress`,
  [TxStatus.SUCCESS]: msg`Successfully claimed your rewards`,
  [TxStatus.ERROR]: msg`Error`
};

export const claimSubtitle: TxCardCopyText = {
  [TxStatus.INITIALIZED]: msg`Please confirm that you want to claim your rewards directly to your wallet.`,
  [TxStatus.LOADING]: msg`Your claim is being processed on the blockchain. Please wait.`,
  [TxStatus.SUCCESS]: msg`You’ve claimed your rewards`,
  [TxStatus.ERROR]: msg`An error occurred while claiming your rewards`
};

export function claimLoadingButtonText({ txStatus }: { txStatus: TxStatus }): MessageDescriptor {
  switch (txStatus) {
    case TxStatus.INITIALIZED:
      return msg`Waiting for confirmation`;
    case TxStatus.LOADING:
      return msg`Claiming rewards`;
    default:
      return msg`Loading`;
  }
}

export const borrowRateTooltipText =
  'The borrow rate is a parameter determined by Sky ecosystem governance through a process of decentralised onchain voting. Borrow rate fees accumulate automatically per block and get added to the total debt.';

export const collateralizationRatioTooltipText =
  'The ratio between the value of collateral you’ve provided and the amount you’ve borrowed against that collateral.';

export const liquidationPriceTooltipText =
  "If the value of your collateral (MKR or SKY) drops below the liquidation price noted here, some or all of your collateral may be auctioned to repay the amount of USDS that you borrowed. Note that a one-hour price update delay applies. In other words, when MKR or SKY drops below a user's liquidation price it will only start applying one hour later. This is called the OSM delay in technical terms, and it also applies to any legacy Maker MCD vault.";

export const riskLevelTooltipText =
  'Risk level indicates the likelihood of your collateral being liquidated. This is primarily determined by your Loan-to-Value (LTV) ratio, which represents the amount you’ve borrowed compared to the value of your crypto collateral. A high risk level means your collateral is close to the liquidation price threshold, and most vulnerable to market changes. A medium risk level means you have a reasonable balance between borrowing power and a safety buffer. A low risk level means you have a comparatively wider safety next against price fluctuations.';

export const debtCeilingTooltipText =
  'If the debt ceiling utilization reaches 100%, no new USDS can be borrowed. The debt ceiling is a parameter determined by Sky ecosystem governance through a process of decentralised onchain voting.';
