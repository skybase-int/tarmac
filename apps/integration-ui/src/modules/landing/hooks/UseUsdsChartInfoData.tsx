import { useTokenChartInfo } from '@jetstreamgg/hooks';
import { usdsAddress } from '@jetstreamgg/hooks';
import { useChainId } from 'wagmi';

export const UseUsdsChartInfoData = () => {
  const chainId = useChainId();
  const usdsTokenAddress = usdsAddress[chainId as keyof typeof usdsAddress];
  const {
    data: usdsData,
    error: usdsError,
    isLoading: usdsIsLoading
  } = useTokenChartInfo({ tokenAddress: usdsTokenAddress });

  if (usdsIsLoading) return <div>Loading USDS chart info...</div>;
  if (usdsError) return <div>Error fetching USDS chart info</div>;

  const usdsJsonString = JSON.stringify(
    usdsData,
    (key, value) => (typeof value === 'bigint' ? value.toString() : value) // convert BigInt to string
  );

  return (
    <div>
      <h3>{`useTokenChartInfo(${usdsTokenAddress}) (USDS)`}</h3>
      <pre>{usdsJsonString}</pre>
    </div>
  );
};
