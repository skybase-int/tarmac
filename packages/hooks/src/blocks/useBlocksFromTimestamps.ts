import request, { gql } from 'graphql-request';
import { useMemo } from 'react';
import { TRUST_LEVELS, TrustLevelEnum } from '../constants';
import { useQuery } from '@tanstack/react-query';
import { BlocksHookResponse } from './blocks';
import { getBlocksSubgraphUrl } from '../helpers/getSubgraphUrl';
import { useChainId } from 'wagmi';

export const GET_BLOCKS = (timestamps: number[]) => {
  let queryString = '{';
  queryString += timestamps.map(timestamp => {
    return `t${timestamp}:blocks(first: 1, orderBy: timestamp, orderDirection: desc, where: { timestamp_gt: ${timestamp}, timestamp_lt: ${
      timestamp + 600
    } }) {
          number
        }`;
  });
  queryString += '}';
  return gql`
    ${queryString}
  `;
};

async function fetchBlocks(graphUrl: string, timestamps: number[]): Promise<Record<string, any[]>> {
  return request(graphUrl, GET_BLOCKS(timestamps));
}

/**
 * for a given array of timestamps, returns block entities
 * @param timestamps
 */
export function useBlocksFromTimestamps(timestamps: number[]): BlocksHookResponse {
  const chainId = useChainId();
  const blocksSubgraph = getBlocksSubgraphUrl(chainId) || '';

  const {
    data: blocks,
    error,
    refetch: mutate,
    isLoading
  } = useQuery<Record<string, any[]>>({
    queryKey: ['blocks', blocksSubgraph, timestamps],
    queryFn: () => fetchBlocks(blocksSubgraph, timestamps)
  });

  const blocksFormatted = useMemo(() => {
    if (blocks) {
      const formatted = [];
      for (const t in blocks) {
        if (blocks[t].length > 0) {
          const number = blocks[t][0]['number'];
          const deploymentBlock = chainId === 1 ? 14292820 : 0;
          const adjustedNumber = number > deploymentBlock ? number : deploymentBlock;

          formatted.push({
            timestamp: t.split('t')[1],
            number: adjustedNumber
          });
        }
      }
      return formatted;
    }
    return undefined;
  }, [blocks]);

  return {
    data: blocksFormatted,
    error: error as Error,
    isLoading: !blocks && isLoading,
    mutate,
    dataSources: [
      {
        title: 'Blocklytics Ethereum blocks subgraph',
        href: blocksSubgraph,
        onChain: false,
        trustLevel: TRUST_LEVELS[TrustLevelEnum.ONE]
      }
    ]
  };
}
