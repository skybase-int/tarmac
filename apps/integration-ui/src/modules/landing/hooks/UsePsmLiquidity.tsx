import { usePsmLiquidity } from '@jetstreamgg/hooks';

export const UsePsmLiquidity = () => {
  const { data, error, isLoading } = usePsmLiquidity();

  if (isLoading) return <div>Loading psm liquidity...</div>;
  if (error) return <div>Error fetching psm liquidity</div>;
  console.log('data', data);
  return <div>{/* <pre>usePsmLiquidity: {JSON.stringify(data, null, 2)}</pre> */}</div>;
};
