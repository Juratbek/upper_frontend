import { useEffect, useRef, useState } from 'react';

import { DEFAULT_CONFIG, DEFAULT_PAGE_SIZE } from './useInfiniteScrollV2.constants';
import {
  IConfig,
  IInfiniteScrollV2,
  TFetchFirstPage,
  TFetchNextPage,
  THook,
  TUpdateItem,
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
  const requestIdRef = useRef<string | null | undefined>(null);

  const incrementPage = (): void => setPage((prev) => 1 + prev);

  const addNewItems = (items: T[]): void => setList((prev) => [...prev, ...items]);

  const fetchFirstPage: TFetchFirstPage = async (params) => {
    try {
      const res = fetch({ page: 0, size, ...params });
      requestIdRef.current = (await res).requestId;
      const data = await res.unwrap();
      const newItems = data.list || [];
      setList(newItems);
      setPage(1);
      if (newItems.length < size) setHasMore(false);
    } catch (e) {
      console.error(e);
    }
  };

  const updateItem: TUpdateItem<T> = (item, identificator) => {
    let updatedList: T[] = [];
    if (identificator) {
      updatedList = list.map((l) => (l[identificator] === item[identificator] ? item : l));
    } else if ('id' in item) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      updatedList = list.map((l) => (l.id === item.id ? item : l));
    } else {
      throw new Error('Please specify the identificator for updateItem method');
    }
    setList(updatedList);
  };

  const fetchNextPage: TFetchNextPage = (params) => {
    return fetch({ page, size, ...params }).then((res) => {
      const newItems = res.data?.list || [];
      addNewItems(newItems);
      incrementPage();
      if (newItems.length < size) setHasMore(false);
    });
  };

  useEffect(() => {
    if (
      requestIdRef.current &&
      fetchRes.requestId &&
      fetchRes.requestId !== requestIdRef.current &&
      fetchRes.status === 'fulfilled' &&
      fetchRes.data?.list &&
      fetchRes.originalArgs?.page === 0
    ) {
      setList(fetchRes.data.list);
      setPage(1);
    }
  }, [fetchRes.requestId, fetchRes.status]);

  return {
    ...fetchRes,
    list,
    hasMore,
    fetchFirstPage,
    fetchNextPage,
    setList,
    updateItem,
  };
};
