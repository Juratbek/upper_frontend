import { useInfiniteQuery as useInfiniteReactQuery } from 'react-query';

import { IPage, TInfiniteQueryResult } from './useInfiniteQuery.types';

export const useInfiniteQuery = <T = unknown>(
  ...args: Parameters<typeof useInfiniteReactQuery<IPage<T>>>
): TInfiniteQueryResult<T> => {
  const res = useInfiniteReactQuery<IPage<T>>(...args);
  const { pages = [] } = res.data ?? {};
  const list = pages.reduce<T[]>((res, page) => [...res, ...page.list], []);

  return { ...res, list };
};
