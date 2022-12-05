import { QueryDefinition } from '@reduxjs/toolkit/dist/query';
import { UseLazyQuery } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { IRes } from 'components/ApiErrorBoundary';
import { useState } from 'react';
import { TBaseQuery } from 'store/apis/config';
import { IPagingResponse, TOptionalPagingRequest } from 'types';

type THook<T> = UseLazyQuery<
  QueryDefinition<
    TOptionalPagingRequest<Record<string, unknown>>,
    TBaseQuery,
    never,
    IPagingResponse<T>
  >
>;

interface IInfiniteScroll<T> extends IRes {
  list: T[];
  newItems: T[];
  page: number;
  hasMore: boolean;
}

type TFetch = (params?: TOptionalPagingRequest) => Promise<void>;
type TFetchNextPage = () => Promise<void>;

export const useInfiniteScroll = <T>(
  hook: THook<T>,
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
      setList((prev) => [...prev, ...res.list]);
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
