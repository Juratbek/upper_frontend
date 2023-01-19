import { QueryDefinition } from '@reduxjs/toolkit/dist/query';
import { UseLazyQuery } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { IRes } from 'components/ApiErrorBoundary';
import { TBaseQuery } from 'store/apis/config';
import { IPagingResponse, TOptionalPagingRequest } from 'types';

export type THook<T> = UseLazyQuery<
  QueryDefinition<
    TOptionalPagingRequest<Record<string, unknown>>,
    TBaseQuery,
    never,
    IPagingResponse<T>
  >
>;

export interface IInfiniteScrollV2<T> extends IRes {
  list: T[];
  //   newItems: T[];
  //   page: number;
  hasMore: boolean;
  fetchFirstPage: TFetchFirstPage;
  fetchNextPage: TFetchNextPage;
}

export interface IConfig {
  size: number;
}

export type TFetchFirstPage<T extends TOptionalPagingRequest<T> = Record<string, unknown>> = <T>(
  params?: T,
) => Promise<void>;

export type TFetchNextPage<T extends TOptionalPagingRequest<T> = Record<string, unknown>> = <T>(
  params?: T,
) => Promise<void>;
