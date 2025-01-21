import { useTotalSavingsSuppliers } from '@jetstreamgg/hooks';

export const UseTotalSavingsSuppliers = () => {
  const { data, error, isLoading } = useTotalSavingsSuppliers();

  if (isLoading) return <div>Loading total savings suppliers...</div>;
  if (error) return <div>Error fetching total savings suppliers</div>;

  return (
    <div>
      <pre>useTotalSavingsSuppliers: {data}</pre>
    </div>
  );
};
