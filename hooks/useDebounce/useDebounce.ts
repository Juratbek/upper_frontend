import { useEffect, useState } from 'react';

export const useDebounce = (value: string, ms = 500): string => {
  const [debauncedValue, setDebauncedValue] = useState<string>('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebauncedValue(value);
    }, ms);
    return () => clearTimeout(timeout);
  }, [value]);

  return debauncedValue;
};
