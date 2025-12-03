export interface StUsdsHistoryItem {
  type: TransactionTypeEnum;
  assets: bigint;
  shares: bigint;
  blockTimestamp: Date;
  transactionHash: string;
  timestamp: number;
  referral?: number;
  /** Provider that executed this transaction (native or curve) */
  provider?: 'native' | 'curve';
}

export interface StUsdsVaultMetrics {
  totalAssets: bigint;
  totalSupply: bigint;
  assetPerShare: bigint;
  yieldRate: bigint;
  chi: bigint;
  cap: bigint;
  line: bigint;
}

export interface StUsdsUserMetrics {
  userStUsdsBalance: bigint;
  userUsdsBalance: bigint;
  userMaxDeposit: bigint;
  userMaxWithdraw: bigint;
}
