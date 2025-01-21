import { useEffect, useState } from 'react';

export const useDebounceQuery = (query: string, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(query);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(query);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  return debouncedValue;
};
