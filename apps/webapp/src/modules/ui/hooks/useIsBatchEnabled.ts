import { BATCH_TX_ENABLED, BATCH_TX_KEY } from '@/lib/constants';

export function useIsBatchEnabled(): boolean {
  return BATCH_TX_ENABLED && window.localStorage.getItem(BATCH_TX_KEY) === 'true';
}
