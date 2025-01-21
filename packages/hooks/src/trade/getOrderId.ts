import { hashTypedData, keccak256, parseEventLogs, toBytes, TransactionReceipt } from 'viem';
import { sepolia } from 'viem/chains';
import { ethFlowAbi, ethFlowAddress, ethFlowSepoliaAbi, ethFlowSepoliaAddress } from '../generated';
import { gpv2SettlementAddress, ORDER_TYPE_FIELDS, OrderBalance, OrderQuoteSideKind } from './constants';

const getBalance = (balance: string, isSell: boolean) => {
  switch (balance) {
    // buy and sell
    case keccak256(toBytes('erc20')):
      return OrderBalance.ERC20;
    // buy and sell
    case keccak256(toBytes('internal')):
      return OrderBalance.INTERNAL;
    // sell only
    case keccak256(toBytes('external')):
      if (!isSell) {
        throw new Error('Invalid balance');
      }
      return OrderBalance.EXTERNAL;
    default:
      throw new Error(`Unknown balance: ${balance}`);
  }
};

const getKind = (kind: string) => {
  switch (kind) {
    case keccak256(toBytes('sell')):
      return OrderQuoteSideKind.SELL;
    case keccak256(toBytes('buy')):
      return OrderQuoteSideKind.BUY;
    default:
      throw new Error(`Unknown kind: ${kind}`);
  }
};

export const getOrderId = (
  txReceipt: TransactionReceipt | undefined,
  chainId: number
): string | undefined => {
  const ethFlowContractAddress =
    chainId === sepolia.id
      ? ethFlowSepoliaAddress[chainId as keyof typeof ethFlowSepoliaAddress]
      : ethFlowAddress[chainId as keyof typeof ethFlowAddress];
  const abi = chainId === sepolia.id ? ethFlowSepoliaAbi : ethFlowAbi;

  const parsedLogs =
    txReceipt &&
    parseEventLogs({
      abi,
      logs: txReceipt.logs
    });

  const ethFlowOrderUids = parsedLogs?.reduce((orderIds, log) => {
    if (log.address.toLowerCase() !== ethFlowContractAddress.toLowerCase()) {
      return orderIds;
    }

    if (log.eventName === 'OrderPlacement') {
      const { order } = log.args;

      const orderHash = hashTypedData({
        domain: {
          name: 'Gnosis Protocol',
          version: 'v2',
          chainId,
          verifyingContract: gpv2SettlementAddress[chainId as keyof typeof gpv2SettlementAddress]
        },
        types: {
          Order: ORDER_TYPE_FIELDS
        },
        primaryType: 'Order',
        message: {
          ...order,
          kind: getKind(order.kind),
          sellTokenBalance: getBalance(order.sellTokenBalance, true),
          buyTokenBalance: getBalance(order.buyTokenBalance, false)
        }
      });

      const orderUid = orderHash + ethFlowContractAddress.slice(2) + 'ffffffff';
      orderIds.push(orderUid);
    }

    return orderIds;
  }, [] as string[]);

  return ethFlowOrderUids?.[0];
};
