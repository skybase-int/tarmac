import { TxStatus } from './constants';

export type TxCardCopyText = {
  [TxStatus.INITIALIZED]: string;
  [TxStatus.LOADING]: string;
  [TxStatus.SUCCESS]: string;
  [TxStatus.ERROR]: string;
};
