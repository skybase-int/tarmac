import { VStack } from '@/shared/components/ui/layout/VStack';
import { useTokenBalances, useTokens, usePrices, TokenForChain } from '@jetstreamgg/hooks';
import { defaultConfig } from '@/config/default-config';
import { useAccount, useChainId } from 'wagmi';
import { AssetBalance } from './AssetBalance';

export const TokenBalances = ({
  actionForToken,
  customTokenList
}: {
  actionForToken?: (
    symbol: string,
    balance: string
  ) => { label: string; actionUrl: string; image: string } | undefined;
  customTokenList?: TokenForChain[];
}) => {
  const { address } = useAccount();
  const chainId = useChainId();

  const allTokens = useTokens(chainId);
  const balancesTokenList = defaultConfig.balancesTokenList[chainId] || [];

  // Use customTokenList if provided, otherwise use the filtered tokens
  const tokens =
    customTokenList && customTokenList.length > 0
      ? customTokenList
      : allTokens.filter(token =>
          balancesTokenList.some(balancesToken => balancesToken.symbol === token.symbol)
        );

  const { data: pricesData, isLoading: pricesLoading /*, error: pricesError */ } = usePrices();
  const {
    data: tokenBalances,
    isLoading: tokenBalancesLoading
    /* error: tokenBalancesError */
  } = useTokenBalances({ address, tokens, chainId });

  // map token balances to include price
  const tokenBalancesWithPrices =
    tokenBalances?.map(tokenBalance => {
      const price = pricesData?.[tokenBalance.symbol]?.price || 0;
      const tokenDecimalsFactor = Math.pow(10, -tokenBalance.decimals);
      return {
        ...tokenBalance,
        valueInDollars: Number(tokenBalance.value) * tokenDecimalsFactor * Number(price)
      };
    }) || [];

  // sort token balances by total in USD prices
  const sortedTokenBalances =
    tokenBalancesWithPrices && pricesData
      ? tokenBalancesWithPrices.sort((a, b) => b.valueInDollars - a.valueInDollars)
      : undefined;

  const isLoading = tokenBalancesLoading || pricesLoading;

  // TODO handle error
  // const error = tokenBalancesError || pricesError;
  return (
    <VStack gap={2}>
      {sortedTokenBalances?.map(tokenBalance => {
        const priceData = pricesData?.[tokenBalance.symbol];
        return (
          <AssetBalance
            key={tokenBalance.symbol}
            symbol={tokenBalance.symbol}
            isLoading={isLoading}
            decimals={tokenBalance.decimals}
            formatted={tokenBalance.formatted}
            priceData={priceData}
            value={tokenBalance.value}
            actionForToken={actionForToken}
          />
        );
      })}
    </VStack>
  );
};
