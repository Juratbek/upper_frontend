import { useEffect, useState } from 'react';

export const useDebounce = (value: string, ms = 500): string => {
  const [debauncedValue, setDebauncedvalue] = useState<string>('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebauncedvalue(value);
    }, ms);
    return () => clearTimeout(timeout);
  }, [value]);

  return debauncedValue;
};
