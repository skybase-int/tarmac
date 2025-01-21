# useBlocksFromTimestamps

Hook for fetching block entities for a given array of timestamps.

## Import

```ts
import { useBlocksFromTimestamps } from '@jetstreamgg/hooks';
```

## Usage

```tsx
import { useBlocksFromTimestamps } from '@jetstreamgg/hooks';

function App() {
  const { data, error, isLoading } = useBlocksFromTimestamps([1625097600, 1625184000]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.map(block => (
        <div key={block.timestamp}>
          <p>Timestamp: {block.timestamp}</p>
          <p>Block Number: {block.number}</p>
        </div>
      ))}
    </div>
  );
}
```

## Parameters

```ts
import { type ReadHookParams } from '@jetstreamgg/hooks';
```

### Props

```ts
type Props = ReadHookParams<Block[]> & { timestamps: number[] };
```

- `timestamps`: `number[]`
  - An array of timestamps to fetch block entities for.
- `options`: `ReadHookParams<Block[]>`
  - Additional options for the query.

## Return Type

```ts
import { type Block } from '@jetstreamgg/hooks';
```

Returns an object containing:

- `data`: `Block[] | undefined`
  - The fetched block entities.
- `error`: `any | undefined`
  - Any error that occurred during the fetch.
- `isLoading`: `boolean`
  - Whether the fetch is currently loading.
