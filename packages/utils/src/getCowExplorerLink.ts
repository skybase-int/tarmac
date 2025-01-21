import { chainId } from './chainId';

export function getCowExplorerLink(chainId: number, orderId: string) {
  const prefix = getCowPrefix(chainId);
  return `https://${prefix}/orders/${orderId}`;
}

function getCowPrefix(id: number) {
  switch (id) {
    case chainId.mainnet:
      return 'explorer.cow.fi';
    case chainId.sepolia:
      return 'explorer.cow.fi/sepolia';
    default:
      return 'explorer.cow.fi';
  }
}
