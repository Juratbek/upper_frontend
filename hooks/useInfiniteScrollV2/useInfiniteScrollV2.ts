import { useState } from 'react';

import { DEFAULT_CONFIG, DEFAULT_PAGE_SIZE } from './useInfiniteScrollV2.constants';
import {
  IConfig,
  IInfiniteScrollV2,
  TFetchFirstPage,
  TFetchNextPage,
  THook,
} from './useInfiniteScrollV2.types';

export const useInfiniteScrollV2 = <T>(
  hook: THook<T>,
  config: IConfig = DEFAULT_CONFIG,
): IInfiniteScrollV2<T> => {
  const [fetch, fetchRes] = hook();
  const [list, setList] = useState<T[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const { size = DEFAULT_PAGE_SIZE } = config;

  const incrementPage = (): void => setPage((prev) => 1 + prev);

  const addNewItems = (items: T[]): void => setList((prev) => [...prev, ...items]);

  const fetchFirstPage: TFetchFirstPage = async (params) => {
    try {
      const res = await fetch({ page: 0, size, ...params }).unwrap();
      const newItems = res.list || [];
      setList(newItems);
      setPage(1);
      if (newItems.length < size) setHasMore(false);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchNextPage: TFetchNextPage = (params) => {
    return fetch({ page, size, ...params }).then((res) => {
      const newItems = res.data?.list || [];
      addNewItems(newItems);
      incrementPage();
      if (newItems.length < size) setHasMore(false);
    });
  };

  return {
    ...fetchRes,
    list,
    hasMore,
    fetchFirstPage,
    fetchNextPage,
  };
};
