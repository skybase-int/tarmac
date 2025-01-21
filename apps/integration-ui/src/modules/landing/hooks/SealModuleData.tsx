import { useCurrentUrnIndex, useCollateralData } from '@jetstreamgg/hooks';

export const SealModuleData = () => {
  const { data: urnIndexData, isLoading: isLoadingCurrentUrn, error: errorCurrentUrn } = useCurrentUrnIndex();
  const { data: collateralData } = useCollateralData();

  if (isLoadingCurrentUrn) return <div>Loading current Urn index...</div>;
  if (errorCurrentUrn) return <div>Error fetching current Urn index</div>;

  const urnIndexString = JSON.stringify(
    urnIndexData,
    (key, value) => (typeof value === 'bigint' ? value.toString() : value) // convert BigInt to string
  );

  return (
    <>
      <div>
        <h3>{'useCurrentUrnIndex()'}</h3>
        <pre>{urnIndexString}</pre>
      </div>
      <div>
        <h3>{'useCollateralData()'}</h3>
        <pre>
          {collateralData &&
            Object.entries(collateralData).map(([key, value]) => (
              <p key={key}>
                {key}: {value.toString()}
              </p>
            ))}
        </pre>
      </div>
    </>
  );
};
