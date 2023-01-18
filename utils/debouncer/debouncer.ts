import { TDebauncer } from './debouncer.types';

export const debouncer = (milliseconds = 1000): TDebauncer => {
  let timeout: NodeJS.Timeout;
  return (value, cb, ms) => {
    timeout && clearTimeout(timeout);
    timeout = setTimeout(() => cb(value), ms || milliseconds);
  };
};
