/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from 'react';
import { TOptionalPagingRequest } from 'types';

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

  const setListWithoutDiblicates = (
    newItemsFromApi: T[],
    params: TOptionalPagingRequest | undefined,
  ): void => {
    const { itemUniqueKey } = config;
    if (itemUniqueKey) {
      // @ts-ignore
      const set = new Set(list.map((item) => item[itemUniqueKey]));
      const newItemsWithoutDublicates = newItemsFromApi.filter((item) => {
        // @ts-ignore
        const hasInCurrentList = set.has(item[itemUniqueKey]);
        if (!hasInCurrentList) list.push(item);
        return !hasInCurrentList;
      });

      if (newItemsFromApi.length !== 0 && newItemsWithoutDublicates.length === 0)
        setTimeout(() => {
          fetchList({ page: (params?.page || page) + 1 });
        }, 0);
    } else {
      const set = new Set(list);
      newItems.forEach((item) => {
        if (!set.has(item)) list.push(item);
      });
    }

    setList(list);
  };

  const fetchList: TFetch = async (params) => {
    list.length === 0 ? setIsLoading(true) : setIsFetching(true);
    setIsSuccess(false);
    setIsError(false);
    try {
      const res = await fetchItems({ page: params?.page || page }).unwrap();
      const newItemsFromApi = res.list;
      if (config.removeDublicates) {
        setListWithoutDiblicates(newItemsFromApi, params);
      } else {
        setList((prev) => [...prev, ...newItemsFromApi]);
      }
      setNewItems(newItemsFromApi);
      setIsSuccess(true);
      if (!Boolean(newItemsFromApi) || newItemsFromApi.length === 0) {
        setHasMore(false);
      }
    } catch (e) {
      console.error(e);
      setIsError(true);
      setHasMore(false);
    } finally {
      list.length === 0 && setIsFetching(false);
      setIsLoading(false);
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
