import {
  useInfiniteQuery as useInfiniteReactQuery,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';

import { IPage, TInfiniteQueryResult } from './useInfiniteQuery.types';

export const useInfiniteQuery = <T = unknown>(
  options: Omit<
    UseInfiniteQueryOptions<any, any, { pages: IPage<T>[] }, any, any, number>,
    'initialPageParam' | 'getNextPageParam'
  >,
): TInfiniteQueryResult<T> => {
  const res = useInfiniteReactQuery<any, any, { pages: IPage<T>[] }, any, number>({
    ...options,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      return lastPageParam + 1;
    },
  });

  if (!res.data) return { ...res, list: [] };

  const { pages } = res.data;
  const list = pages.reduce<T[]>((res, page) => [...res, ...page.list], []);

  return { ...res, list };
};
