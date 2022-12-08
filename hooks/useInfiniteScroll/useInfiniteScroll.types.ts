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

export interface IInfiniteScroll<T> extends IRes {
  list: T[];
  newItems: T[];
  page: number;
  hasMore: boolean;
}

export interface IConfig {
  removeDublicates?: boolean;
  itemUniqueKey?: string;
}

export type TFetch = (params?: TOptionalPagingRequest) => Promise<void>;
export type TFetchNextPage = () => Promise<void>;
