import { QueryDefinition } from '@reduxjs/toolkit/dist/query';
import { UseLazyQuery } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { IRes } from 'components/ApiErrorBoundary';
import { Dispatch, SetStateAction } from 'react';
import { TBaseQuery } from 'store/apis/config';
import { IPagingResponse, TOptionalPagingRequest } from 'types';

export type THook<T> = UseLazyQuery<
  QueryDefinition<any, TBaseQuery, never, IPagingResponse<T>, any>
>;

export type TUpdateItem<T> = (item: T, identificator?: keyof T) => void;

export interface IInfiniteScrollV2<T> extends IRes {
  list: T[];
  //   newItems: T[];
  //   page: number;
  hasMore: boolean;
  fetchFirstPage: TFetchFirstPage;
  fetchNextPage: TFetchNextPage;
  setList: Dispatch<SetStateAction<T[]>>;
  updateItem: TUpdateItem<T>;
}

export interface IConfig {
  size?: number;
  shouldBeInvalidated?: boolean;
}

export type TFetchFirstPage<T extends TOptionalPagingRequest<T> = Record<string, unknown>> = <T>(
  params?: T,
) => Promise<void>;

export type TFetchNextPage<T extends TOptionalPagingRequest<T> = Record<string, unknown>> = <T>(
  params?: T,
) => Promise<void>;
