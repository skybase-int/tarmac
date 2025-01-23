import { HistoryItem } from '@/shared/shared.d.ts';
import { Token } from '@/tokens/types';
export type SavingsHistory = Array<SavingsHistoryItem>;

export type SavingsSupplyResponse = {
  assets: string;
  blockTimestamp: string;
  transactionHash: string;
};

export type SavingsWithdrawalResponse = {
  assets: string;
  blockTimestamp: string;
  transactionHash: string;
};

export type SavingsSupply = HistoryItem & {
  assets: bigint;
  token: Token;
};

export type SavingsWithdrawal = HistoryItem & {
  assets: bigint;
  token: Token;
};

export type SavingsHistoryItem = SavingsSupply | SavingsWithdrawal;
