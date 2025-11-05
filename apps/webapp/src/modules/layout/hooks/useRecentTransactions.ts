import { useCallback, useEffect, useState } from 'react';

export interface RecentTransaction {
  hash: string;
  description: string;
  chainId: number;
  timestamp: number;
}

const STORAGE_KEY = 'sky-recent-transactions';
const MAX_TRANSACTIONS = 10; // Store max 10, display only 5

export function useRecentTransactions(address?: string, chainId?: number) {
  const [transactions, setTransactions] = useState<RecentTransaction[]>([]);

  // Helper function to load and filter transactions
  const loadTransactions = useCallback(() => {
    if (!address) {
      setTransactions([]);
      return;
    }

    try {
      const stored = localStorage.getItem(`${STORAGE_KEY}-${address.toLowerCase()}`);
      if (stored) {
        const parsed = JSON.parse(stored) as RecentTransaction[];
        // Filter by current chain if specified
        const filtered = chainId ? parsed.filter(tx => tx.chainId === chainId) : parsed;
        setTransactions(filtered);
      } else {
        setTransactions([]);
      }
    } catch (error) {
      console.error('Failed to load recent transactions:', error);
      setTransactions([]);
    }
  }, [address, chainId]);

  // Load transactions from localStorage on mount and when address/chainId changes
  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  // Listen for storage changes (when other tabs update localStorage)
  useEffect(() => {
    if (!address) return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === `${STORAGE_KEY}-${address.toLowerCase()}` && e.newValue) {
        loadTransactions();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [address, loadTransactions]);

  // Listen for custom events (when same tab updates transactions)
  useEffect(() => {
    if (!address) return;

    const handleCustomUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<{ address: string }>;
      if (customEvent.detail.address === address.toLowerCase()) {
        loadTransactions();
      }
    };

    window.addEventListener('recent-transactions-updated', handleCustomUpdate);
    return () => window.removeEventListener('recent-transactions-updated', handleCustomUpdate);
  }, [address, loadTransactions]);

  // Add a new transaction
  const addTransaction = useCallback(
    (tx: Omit<RecentTransaction, 'timestamp'>) => {
      if (!address) return;

      const newTransaction: RecentTransaction = {
        ...tx,
        timestamp: Date.now()
      };

      try {
        // Read ALL transactions from storage (not just filtered ones)
        const stored = localStorage.getItem(`${STORAGE_KEY}-${address.toLowerCase()}`);
        const allTransactions = stored ? (JSON.parse(stored) as RecentTransaction[]) : [];

        // Remove duplicates and add new transaction at the beginning
        const filtered = allTransactions.filter(t => t.hash.toLowerCase() !== tx.hash.toLowerCase());
        const updated = [newTransaction, ...filtered].slice(0, MAX_TRANSACTIONS);

        // Save ALL transactions back to localStorage
        localStorage.setItem(`${STORAGE_KEY}-${address.toLowerCase()}`, JSON.stringify(updated));

        // Manually trigger a reload for this hook instance (storage event won't fire in same tab)
        loadTransactions();

        // Dispatch a custom event to notify other hook instances in the same tab
        window.dispatchEvent(
          new CustomEvent('recent-transactions-updated', {
            detail: { address: address.toLowerCase() }
          })
        );
      } catch (error) {
        console.error('Failed to save recent transactions:', error);
      }
    },
    [address, loadTransactions]
  );

  // Clear all transactions for current address
  const clearTransactions = useCallback(() => {
    if (!address) return;

    setTransactions([]);
    try {
      localStorage.removeItem(`${STORAGE_KEY}-${address.toLowerCase()}`);
    } catch (error) {
      console.error('Failed to clear recent transactions:', error);
    }
  }, [address]);

  return {
    transactions,
    addTransaction,
    clearTransactions
  };
}
