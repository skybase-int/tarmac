import { skyAddress, useTokenChartInfo } from '@jetstreamgg/hooks';
import { useChainId } from 'wagmi';

export const UseSkyChartInfoData = () => {
  const chainId = useChainId();
  const skyTokenAddress = skyAddress[chainId as keyof typeof skyAddress];
  const {
    data: skyData,
    error: skyError,
    isLoading: skyIsLoading
  } = useTokenChartInfo({ tokenAddress: skyTokenAddress });

  if (skyIsLoading) return <div>Loading SKY chart info...</div>;
  if (skyError) return <div>Error fetching SKY chart info</div>;

  const skyJsonString = JSON.stringify(
    skyData,
    (key, value) => (typeof value === 'bigint' ? value.toString() : value) // convert BigInt to string
  );

  return (
    <div>
      <h3>{`useTokenChartInfo(${skyTokenAddress}) (SKY)`}</h3>
      <pre>{skyJsonString}</pre>
    </div>
  );
};
