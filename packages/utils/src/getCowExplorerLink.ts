import { chainId } from './chainId';

export function getCowExplorerLink(chainId: number, orderId: string) {
  const prefix = getCowPrefix(chainId);
  return `https://${prefix}/orders/${orderId}`;
}

function getCowPrefix(id: number) {
  switch (id) {
    case chainId.mainnet:
    default:
      return 'explorer.cow.fi';
  }
}
