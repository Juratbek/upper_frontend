import { TDebouncer } from './debouncer.types';

export const debouncer = <TValue = unknown>(milliseconds = 1000): TDebouncer<TValue> => {
  let timeout: NodeJS.Timeout;
  return (value, cb, { ms, onClear } = {}) => {
    if (timeout) {
      clearTimeout(timeout);
      onClear?.();
    }
    timeout = setTimeout(() => cb(value), ms ?? milliseconds);
  };
};
