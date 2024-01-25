import {
  useInfiniteQuery as useInfiniteReactQuery,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';

import { IPage, TInfiniteQueryResult } from './useInfiniteQuery.types';

export const useInfiniteQuery = <T = unknown>(
  options: Omit<
    UseInfiniteQueryOptions<any, any, { pages: IPage<T>[] }, any, any, string>,
    'initialPageParam' | 'getNextPageParam'
  >,
): TInfiniteQueryResult<T> => {
  const res = useInfiniteReactQuery<any, any, { pages: IPage<T>[] }, any, string>({
    ...options,
    initialPageParam: '0',
    getNextPageParam: (lastPage: IPage) => (lastPage.hasMore ? String(++lastPage.page) : undefined),
  });

  if (!res.data) return { ...res, list: [] };

  const { pages } = res.data;
  const list = pages.reduce<T[]>((res, page) => [...res, ...page.list], []);

  return { ...res, list };
};
