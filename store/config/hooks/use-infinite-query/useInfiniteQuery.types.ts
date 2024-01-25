import { UseInfiniteQueryResult } from '@tanstack/react-query';

export interface IInfiniteQueryConfig {
  enabled?: boolean;
}

export interface IPage<TData = unknown> {
  hasMore: boolean;
  list: TData[];
  page: number;
  totalItemCount?: number;
}

export type TInfiniteQueryResult<T> = UseInfiniteQueryResult & {
  list: T[];
};
