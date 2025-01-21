import { request, gql } from 'graphql-request';
import { ReadHook } from '../hooks';
import { TRUST_LEVELS, TrustLevelEnum, ModuleEnum, TransactionTypeEnum } from '../constants';
import { getBaseSubgraphUrl } from '../helpers/getSubgraphUrl';
import { useQuery } from '@tanstack/react-query';
import { useAccount, useChainId } from 'wagmi';
import { HistoryItem } from '../shared/shared';
import { TOKENS } from '../tokens/tokens.constants';
import { useTokenAddressMap } from '../tokens/useTokenAddressMap';
import { Token } from '../tokens/types';

type BaseTradeHistoryItem = HistoryItem & {
  fromAmount: bigint;
  toAmount: bigint;
  referralCode: string;
  fromToken: Token;
  toToken: Token;
  address: string;
};

type BaseTradeHistory = BaseTradeHistoryItem[];

async function fetchBaseTradeHistory(
  urlSubgraph: string,
  chainId: number,
  tokenAddressMap: { [address: string]: (typeof TOKENS)[keyof typeof TOKENS] },
  address?: string,
  excludeSUsds: boolean = false
): Promise<BaseTradeHistory | undefined> {
  if (!address) return [];
  const sUsdsAddressForChain = TOKENS.susds.address[chainId];
  const whereClause = excludeSUsds
    ? `{
      sender: "${address}",
      receiver: "${address}",
      assetIn_not: "${sUsdsAddressForChain.toLowerCase()}",
      assetOut_not: "${sUsdsAddressForChain.toLowerCase()}"
    }`
    : `{
      sender: "${address}",
      receiver: "${address}"
    }`;

  const query = gql`
  {
    swaps(where: ${whereClause}) {
      id
      transactionHash
      assetIn
      assetOut
      sender
      receiver
      amountIn
      amountOut
      referralCode
      blockTimestamp
    }
  }
  `;

  const response = (await request(urlSubgraph, query)) as any;

  const swaps: BaseTradeHistory = response.swaps.map((e: any) => ({
    blockTimestamp: new Date(parseInt(e.blockTimestamp) * 1000),
    transactionHash: e.transactionHash,
    module: ModuleEnum.TRADE,
    type: TransactionTypeEnum.TRADE,
    fromToken: tokenAddressMap[e.assetIn.toLowerCase()],
    toToken: tokenAddressMap[e.assetOut.toLowerCase()],
    fromAmount: BigInt(e.amountIn),
    toAmount: BigInt(e.amountOut),
    referralCode: e.referralCode,
    address: e.sender
  }));

  return swaps.sort(
    (a: BaseTradeHistoryItem, b: BaseTradeHistoryItem) =>
      b.blockTimestamp.getTime() - a.blockTimestamp.getTime()
  );
}

export function useBaseTradeHistory({
  subgraphUrl,
  enabled: enabledProp = true,
  excludeSUsds = false
}: {
  subgraphUrl?: string;
  enabled?: boolean;
  excludeSUsds?: boolean;
} = {}): ReadHook & { data?: BaseTradeHistory } {
  const { address } = useAccount();
  const chainId = useChainId();
  const urlSubgraph = subgraphUrl ? subgraphUrl : getBaseSubgraphUrl(chainId) || '';
  const tokenAddressMap = useTokenAddressMap();

  const {
    data,
    error,
    refetch: mutate,
    isLoading
  } = useQuery({
    enabled: Boolean(urlSubgraph) && enabledProp,
    queryKey: ['base-trade-history', urlSubgraph, address, excludeSUsds],
    queryFn: () => fetchBaseTradeHistory(urlSubgraph, chainId, tokenAddressMap, address, excludeSUsds)
  });

  return {
    data,
    isLoading: !data && isLoading,
    error: error as Error,
    mutate,
    dataSources: [
      {
        title: 'Sky Ecosystem subgraph',
        href: urlSubgraph,
        onChain: false,
        trustLevel: TRUST_LEVELS[TrustLevelEnum.ONE]
      }
    ]
  };
}
