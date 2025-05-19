import { request, gql } from 'graphql-request';
import { ReadHook } from '../hooks';
import { TRUST_LEVELS, TrustLevelEnum } from '../constants';
import { getMakerSubgraphUrl } from '../helpers/getSubgraphUrl';
import { useQuery } from '@tanstack/react-query';
import { DelegateInfo, DelegateRaw } from './delegate';
import { getRandomItem } from '@jetstreamgg/utils';
import { useMemo } from 'react';
import { parseDelegatesFn } from './utils';
import { useDelegateMetadataMapping } from './useDelegateMetadataMapping';

async function fetchDelegates(
  urlSubgraph: string,
  first: number,
  skip: number,
  exclude?: `0x${string}`[],
  orderBy?: string,
  orderDirection?: string,
  search?: string,
  version?: 1 | 2 | 3
): Promise<DelegateInfo[] | undefined> {
  const whereConditions = [];
  if (version) whereConditions.push(`{version: "${version}"}`);
  if (exclude?.length) whereConditions.push(`{id_not_in: [${exclude.map(addr => `"${addr}"`).join(', ')}]}`);
  if (search) whereConditions.push(`{id_contains_nocase: "${search}"}`);
  const whereClause = whereConditions.length ? `where: { and: [${whereConditions.join(', ')}] }` : '';

  const paginationClause = first !== undefined && skip !== undefined ? `first: ${first}, skip: ${skip}` : '';

  const orderByClause =
    orderBy && orderDirection ? `orderBy: ${orderBy}, orderDirection: ${orderDirection}` : '';

  const query = gql`
    {
        delegates${
          whereClause || paginationClause
            ? `(${[whereClause, paginationClause, orderByClause].filter(Boolean).join(', ')})`
            : ''
        } {
        blockTimestamp
        blockNumber
        ownerAddress
        totalDelegated
        id
        delegators
      }
    }
  `;

  const response = await request<{ delegates: DelegateRaw[] }>(urlSubgraph, query);
  const parsedDelegates = response.delegates as DelegateRaw[];
  if (!parsedDelegates) {
    return undefined;
  }

  return parsedDelegates.map(parseDelegatesFn);
}

export function useDelegates({
  subgraphUrl,
  chainId,
  exclude,
  page = 1,
  pageSize = 100,
  random,
  search,
  version,
  urlMetadata,
  enabled = true
}: {
  chainId: number;
  subgraphUrl?: string;
  exclude?: `0x${string}`[];
  page?: number;
  pageSize?: number;
  random?: boolean;
  search?: string;
  version?: 1 | 2 | 3;
  urlMetadata?: string;
  enabled?: boolean;
}): ReadHook & { data?: DelegateInfo[] } {
  const urlSubgraph = subgraphUrl ? subgraphUrl : getMakerSubgraphUrl(chainId) || '';

  const orderByFields = [
    'blockTimestamp',
    'blockNumber',
    'totalDelegated',
    'ownerAddress',
    'id',
    'delegators'
  ];
  const randomOrderBy = useMemo(() => (random ? getRandomItem(orderByFields) : undefined), [random]);
  const randomOrderDirection = useMemo(() => (random ? getRandomItem(['asc', 'desc']) : undefined), [random]);

  const {
    data: subgraphDelegates,
    error,
    refetch: mutate,
    isLoading
  } = useQuery({
    enabled: Boolean(urlSubgraph && enabled),
    queryKey: [
      'delegates',
      urlSubgraph,
      exclude,
      page,
      pageSize,
      random ? randomOrderBy : undefined,
      random ? randomOrderDirection : undefined,
      search,
      version,
      urlMetadata
    ],
    queryFn: () =>
      fetchDelegates(
        urlSubgraph,
        pageSize,
        (page - 1) * pageSize,
        exclude,
        randomOrderBy,
        randomOrderDirection,
        search,
        version
      )
  });

  const { data: metadataMapping } = useDelegateMetadataMapping(urlMetadata);
  const data = subgraphDelegates?.map(d => ({
    ...d,
    metadata: metadataMapping?.[d.id] || null
  })) as DelegateInfo[] | undefined;

  return {
    isLoading,
    data,
    error,
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
