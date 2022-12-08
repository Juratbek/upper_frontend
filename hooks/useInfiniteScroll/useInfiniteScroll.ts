import { useState } from 'react';

import { IConfig, IInfiniteScroll, TFetch, TFetchNextPage, THook } from './useInfiniteScroll.types';

export const useInfiniteScroll = <T>(
  hook: THook<T>,
  config: IConfig = { removeDublicates: false },
): [TFetch, IInfiniteScroll<T>, TFetchNextPage] => {
  const [list, setList] = useState<T[]>([]);
  const [newItems, setNewItems] = useState<T[]>([]);
  const [page, setPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [fetchItems] = hook();

  const fetchList: TFetch = async (params) => {
    list.length === 0 ? setIsLoading(true) : setIsFetching(true);
    setIsSuccess(false);
    setIsError(false);
    try {
      const res = await fetchItems({ page: params?.page || page }).unwrap();
      setList((prev) => {
        const newItems = res.list;
        if (config.removeDublicates) {
          const { itemUniqueKey } = config;
          if (itemUniqueKey) {
            // @ts-ignore
            const set = new Set(prev.map((item) => item[itemUniqueKey]));
            const newItemsWithoutDublicates = newItems.filter((item) => {
              // @ts-ignore
              const hasInCurrentList = set.has(item[itemUniqueKey]);
              if (!hasInCurrentList) prev.push(item);
              return !hasInCurrentList;
            });

            if (newItemsWithoutDublicates.length) fetchNextPage();

            return prev;
          }

          const set = new Set(prev);
          newItems.forEach((item) => {
            if (!set.has(item)) prev.push(item);
          });
          return prev;
        }
        return [...prev, ...newItems];
      });
      setNewItems(res.list);
      setIsSuccess(true);
      if (!Boolean(res.list) || res.list.length === 0) {
        setHasMore(false);
      }
    } catch (e) {
      console.error(e);
      setIsError(true);
      setHasMore(false);
    } finally {
      list.length === 0 ? setIsLoading(false) : setIsFetching(false);
    }
  };

  const fetchNextPage: TFetchNextPage = async () => {
    fetchList({ page: page + 1 }).then(() => {
      setPage((prev) => prev + 1);
    });
  };

  return [
    fetchList,
    { list, newItems, page, isLoading, isSuccess, isError, isFetching, hasMore },
    fetchNextPage,
  ];
};
