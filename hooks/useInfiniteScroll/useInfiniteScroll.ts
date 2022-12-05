import { QueryDefinition } from '@reduxjs/toolkit/dist/query';
import { LazyQueryTrigger, UseLazyQuery } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { IRes } from 'components/ApiErrorBoundary';
import { useCallback, useEffect, useRef, useState } from 'react';
import { TBaseQuery } from 'store/apis/config';
import { IPagingResponse, TOptionalPagingRequest } from 'types';

type TCallBack<T> = LazyQueryTrigger<
  QueryDefinition<
    TOptionalPagingRequest<Record<string, unknown>>,
    TBaseQuery,
    never,
    IPagingResponse<T>
  >
>;

type THook<T> = UseLazyQuery<
  QueryDefinition<
    TOptionalPagingRequest<Record<string, unknown>>,
    TBaseQuery,
    never,
    IPagingResponse<T>
  >
>;

interface IResponse<T> extends IRes {
  data: {
    list: T[];
  };
}

export const useInfiniteScroll = <T>(
  cb: TCallBack<T>,
  hook: THook<T>,
): [(node: Element | null) => void, IResponse<T>] => {
  const [list, setList] = useState<T[]>([]);
  const [page, setPage] = useState<number>(0);
  const observer = useRef<IntersectionObserver>();
  const [fetchItems, fetchItemsRes] = hook();

  const fetchList = async (): Promise<void> => {
    const res = await fetchItems({ page }).unwrap();
    setList([...list, ...res.list]);
  };

  useEffect(() => {
    fetchList();
  }, []);

  const lastItemRef = useCallback((node: Element | null) => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(async (entries) => {
      const lastItem = entries[0];
      if (lastItem.isIntersecting) {
        const res = await cb({ page }).unwrap();
        console.log(
          '🚀 ~ file: useInfiniteScroll.ts:20 ~ observer.current=newIntersectionObserver ~ res',
          res,
        );
        setPage((prev) => prev + 1);
        observer.current?.unobserve(lastItem.target);
      }
    });

    if (node) observer.current.observe(node);
  }, []);

  return [lastItemRef, { ...fetchItemsRes, data: { list } }];
};
