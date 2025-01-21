import { useSavingsChartInfo } from '@jetstreamgg/hooks';

const SaveChartInfo = () => {
  const { data: saveData, error: saveError, isLoading: saveIsLoading } = useSavingsChartInfo();

  if (saveIsLoading) return <div>Loading save chart info...</div>;
  if (saveError) return <div>Error fetching save chart info</div>;

  const saveJsonString = JSON.stringify(
    saveData,
    (key, value) => (typeof value === 'bigint' ? value.toString() : value) // convert BigInt to string
  );

  return (
    <div>
      <h3>useSavingsChartInfo</h3>
      <pre>{saveJsonString}</pre>
    </div>
  );
};

export const UseSavingsChartInfoData = () => {
  return (
    <div>
      <SaveChartInfo />
    </div>
  );
};
