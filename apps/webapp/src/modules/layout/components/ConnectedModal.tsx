import { Dialog, DialogContent, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { t } from '@lingui/core/macro';
import { X } from 'lucide-react';
import { Text } from '@/modules/layout/components/Typography';
import { CustomAvatar } from '@/modules/ui/components/Avatar';
import { getEtherscanLink, formatBigInt, useFormatDates } from '@jetstreamgg/sky-utils';
import {
  useAllNetworksCombinedHistory,
  TransactionTypeEnum,
  ModuleEnum,
  useAvailableTokenRewardContractsForChains
} from '@jetstreamgg/sky-hooks';
import { useEffect, useMemo } from 'react';
import { useLingui } from '@lingui/react';
import { ExternalLink as ExternalLinkComponent } from '@/modules/layout/components/ExternalLink';
import { absBigInt } from '@/modules/utils/math';

interface ConnectedModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  address: string;
  chainId: number;
  ensName?: string | null;
  ensAvatar?: string | null;
  connectorName?: string;
  onDisconnect: () => void;
}

export function ConnectedModal({
  isOpen,
  onOpenChange,
  address,
  chainId,
  ensName,
  ensAvatar,
  connectorName,
  onDisconnect
}: ConnectedModalProps) {
  const { i18n } = useLingui();

  // Fetch all transaction history from subgraphs across all networks
  const { data: allHistory, mutate } = useAllNetworksCombinedHistory();

  // Get reward contracts configuration for token symbol lookup
  const getRewardContracts = useAvailableTokenRewardContractsForChains();

  useEffect(() => {
    mutate();
  }, [isOpen]);

  // Filter to current chain and take only the 5 most recent
  const recentTransactions = useMemo(() => {
    if (!allHistory) return [];
    return allHistory.filter(tx => tx.chainId === chainId).slice(0, 10);
  }, [allHistory, chainId]);

  // Format dates using the same pattern as history tables
  const memoizedDates = useMemo(() => recentTransactions.map(tx => tx.blockTimestamp), [recentTransactions]);
  const formattedDates = useFormatDates(memoizedDates, i18n.locale, 'MMM d, yyyy, h:mm a');

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const getModulePrefix = (module: ModuleEnum): string => {
    switch (module) {
      case ModuleEnum.SAVINGS:
        return 'Savings';
      case ModuleEnum.STAKE:
        return 'Stake';
      case ModuleEnum.SEAL:
        return 'Seal';
      case ModuleEnum.REWARDS:
        return 'Rewards';
      case ModuleEnum.TRADE:
        return 'Trade';
      case ModuleEnum.UPGRADE:
        return 'Upgrade';
      default:
        return '';
    }
  };

  const getAmount = (tx: any): string | null => {
    // Savings transactions: assets field
    if (tx.module === ModuleEnum.SAVINGS && tx.assets) {
      const token = tx.token?.symbol || '';
      return `${formatBigInt(absBigInt(tx.assets), { compact: true })} ${token}`;
    }

    // Upgrade transactions (DAI/USDS): wad field
    if (
      tx.wad &&
      (tx.type === TransactionTypeEnum.DAI_TO_USDS || tx.type === TransactionTypeEnum.USDS_TO_DAI)
    ) {
      const token = tx.type === TransactionTypeEnum.DAI_TO_USDS ? 'DAI' : 'USDS';
      return `${formatBigInt(absBigInt(tx.wad), { compact: true })} ${token}`;
    }

    // Upgrade transactions (MKR/SKY): mkrAmt or skyAmt
    if (tx.mkrAmt && tx.type === TransactionTypeEnum.MKR_TO_SKY) {
      return `${formatBigInt(absBigInt(tx.mkrAmt), { compact: true })} MKR`;
    }
    if (tx.skyAmt && tx.type === TransactionTypeEnum.SKY_TO_MKR) {
      return `${formatBigInt(absBigInt(tx.skyAmt), { compact: true })} SKY`;
    }

    // Rewards transactions: amount field
    if (tx.amount && tx.module === ModuleEnum.REWARDS) {
      // Find the reward contract for this transaction
      const rewardContracts = getRewardContracts(tx.chainId);
      const rewardContract = rewardContracts.find(
        rc => rc.contractAddress.toLowerCase() === tx.rewardContractAddress?.toLowerCase()
      );

      if (rewardContract) {
        // Use rewardToken for claims, supplyToken for supply/withdraw
        const token =
          tx.type === TransactionTypeEnum.REWARD
            ? rewardContract.rewardToken.symbol
            : rewardContract.supplyToken.symbol;
        return `${formatBigInt(absBigInt(tx.amount), { compact: true })} ${token}`;
      }

      // Fallback if contract not found
      const token = tx.token?.symbol || '';
      return `${formatBigInt(absBigInt(tx.amount), { compact: true })} ${token}`;
    }

    // Stake transactions: amount field with SKY token
    if (tx.amount && tx.module === ModuleEnum.STAKE) {
      // Borrowed USDS for stake borrow, otherwise SKY
      const token = tx.type === TransactionTypeEnum.STAKE_BORROW ? 'USDS' : 'SKY';
      return `${formatBigInt(absBigInt(tx.amount), { compact: true })} ${token}`;
    }

    // Seal transactions: amount field with MKR token
    if (tx.amount && tx.module === ModuleEnum.SEAL) {
      const token = tx.type === TransactionTypeEnum.SEAL_REWARD ? 'NST' : 'MKR';
      return `${formatBigInt(absBigInt(tx.amount), { compact: true })} ${token}`;
    }

    // Stake kick: wad field with SKY token
    if (
      tx.wad &&
      tx.type !== TransactionTypeEnum.DAI_TO_USDS &&
      tx.type !== TransactionTypeEnum.USDS_TO_DAI
    ) {
      return `${formatBigInt(absBigInt(tx.wad), { compact: true })} SKY`;
    }

    return null;
  };

  const getTransactionDescription = (tx: any): string => {
    const module = tx.module;
    const prefix = getModulePrefix(module);
    const amount = getAmount(tx);

    // Rewards module - natural language descriptions
    if (module === ModuleEnum.REWARDS) {
      if (tx.type === TransactionTypeEnum.REWARD) {
        return amount ? `Claimed ${amount} in Rewards` : 'Claimed rewards';
      }
      if (tx.type === TransactionTypeEnum.SUPPLY) {
        return amount ? `Supplied ${amount} to Rewards` : 'Supplied to Rewards';
      }
      if (tx.type === TransactionTypeEnum.WITHDRAW) {
        return amount ? `Withdrew ${amount} from Rewards` : 'Withdrew from Rewards';
      }
    }

    // Other modules - keeping old format for now
    const typeDescriptions: Record<string, string> = {
      [TransactionTypeEnum.SUPPLY]: amount ? `${amount} - ${prefix} Supply` : `${prefix}: Supply`,
      [TransactionTypeEnum.WITHDRAW]: amount ? `${amount} - ${prefix} Withdrawal` : `${prefix}: Withdrawal`,
      [TransactionTypeEnum.TRADE]: `${prefix}: Swap`,
      [TransactionTypeEnum.DAI_TO_USDS]: amount ? `${amount} - ${prefix} Upgrade` : `${prefix}: DAI → USDS`,
      [TransactionTypeEnum.MKR_TO_SKY]: amount ? `${amount} - ${prefix} Upgrade` : `${prefix}: MKR → SKY`,
      [TransactionTypeEnum.SKY_TO_MKR]: amount ? `${amount} - ${prefix} Downgrade` : `${prefix}: SKY → MKR`,
      [TransactionTypeEnum.USDS_TO_DAI]: amount ? `${amount} - ${prefix} Downgrade` : `${prefix}: USDS → DAI`,
      [TransactionTypeEnum.STAKE]: amount ? `${amount} - ${prefix} Stake` : `${prefix}: Stake`,
      [TransactionTypeEnum.UNSTAKE]: amount ? `${amount} - ${prefix} Unstake` : `${prefix}: Unstake`,
      [TransactionTypeEnum.STAKE_BORROW]: amount ? `${amount} - ${prefix} Borrow` : `${prefix}: Borrow`,
      [TransactionTypeEnum.STAKE_REPAY]: amount ? `${amount} - ${prefix} Repay` : `${prefix}: Repay`,
      [TransactionTypeEnum.STAKE_REWARD]: amount ? `${amount} - ${prefix} Claim` : `${prefix}: Claim`,
      [TransactionTypeEnum.STAKE_OPEN]: `${prefix}: Open position`,
      [TransactionTypeEnum.STAKE_SELECT_DELEGATE]: `${prefix}: Select delegate`,
      [TransactionTypeEnum.STAKE_SELECT_REWARD]: `${prefix}: Select reward`,
      [TransactionTypeEnum.SEAL]: amount ? `${amount} - ${prefix} Seal` : `${prefix}: Seal`,
      [TransactionTypeEnum.UNSEAL]: amount ? `${amount} - ${prefix} Unseal` : `${prefix}: Unseal`,
      [TransactionTypeEnum.SEAL_REWARD]: amount ? `${amount} - ${prefix} Claim` : `${prefix}: Claim`
    };

    return typeDescriptions[tx.type] || `${prefix}: ${tx.type}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-containerDark p-0 sm:max-w-[400px]">
        <div className="border-borderPrimary flex items-center justify-between border-b px-6 py-5">
          <DialogTitle>
            <Text className="text-text text-xl font-semibold">{t`Account`}</Text>
          </DialogTitle>
          <DialogClose asChild>
            <Button variant="ghost" className="text-textSecondary hover:text-text h-8 w-8 rounded-full p-0">
              <X className="h-5 w-5" />
            </Button>
          </DialogClose>
        </div>

        <div className="p-6">
          <div className="mb-6 flex flex-col items-center gap-4">
            {ensAvatar ? (
              <img alt="ENS Avatar" className="h-20 w-20 rounded-full" src={ensAvatar} />
            ) : (
              <CustomAvatar address={address} size={80} />
            )}
            <div className="text-center">
              <div className="text-text text-lg font-medium">{ensName || formatAddress(address)}</div>
              {ensName && <div className="text-textSecondary mt-1 text-sm">{formatAddress(address)}</div>}
              {connectorName && (
                <div className="text-textSecondary mt-2 text-sm">Connected with {connectorName}</div>
              )}
            </div>
          </div>

          {/* Recent Transactions Section */}
          {recentTransactions.length > 0 && (
            <div className="mb-6">
              <div className="mb-2 flex items-center justify-between">
                <Text className="text-textSecondary text-sm font-medium">{t`Recent Transactions`}</Text>
                <a
                  href={getEtherscanLink(chainId, address, 'address')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-textSecondary hover:text-text text-xs transition-colors"
                >
                  {t`View all`} →
                </a>
              </div>
              <div className="space-y-1">
                {recentTransactions.map((tx, index) => (
                  <a
                    key={tx.transactionHash}
                    href={getEtherscanLink(chainId, tx.transactionHash, 'tx')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:bg-containerLight flex items-center justify-between gap-2 rounded px-2 py-2 transition-colors"
                  >
                    <div className="min-w-0 flex-1">
                      <Text className="text-text truncate">{getTransactionDescription(tx)}</Text>
                      <Text variant="small" className="text-textSecondary">
                        {formattedDates.length > index ? formattedDates[index] : ''}
                      </Text>
                    </div>
                    <ExternalLinkComponent
                      href={getEtherscanLink(chainId, tx.transactionHash, 'tx')}
                      iconSize={13}
                    />
                  </a>
                ))}
              </div>
            </div>
          )}

          <Button variant="connect" onClick={onDisconnect} className="w-full">
            {t`Disconnect Wallet`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
