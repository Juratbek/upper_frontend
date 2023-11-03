export interface IInfiniteQueryConfig {
  enabled?: boolean;
}

export interface IPage<TData = unknown> {
  hasMore: boolean;
  list: TData[];
  page: number;
  totalItemCount?: number;
}

interface IInfiniteQueryData<TData> {
  pageParams: unknown[];
  pages: Array<IPage<TData>>;
}

export interface IInfiniteQueryResult<TData> {
  data?: IInfiniteQueryData<TData>;
  error: unknown;
  fetchNextPage: () => void;
  fetchPreviousPage: () => void;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  isError: boolean;
  isFetched: boolean;
  isFetchedAfterMount: boolean;
  isFetching: boolean;
  isFetchingNextPage: boolean;
  isFetchingPreviousPage: boolean;
  isIdle: boolean;
  isLoading: boolean;
  isLoadingError: boolean;
  isPlaceholderData: boolean;
  isPreviousData: boolean;
  isRefetchError: boolean;
  isRefetching: boolean;
  isStale: boolean;
  isSuccess: boolean;
  refetch: () => void;
  remove: () => void;
  status: 'idle' | 'loading' | 'error' | 'success';
}

export type TInfiniteQueryHook<TData = unknown> = (
  config?: IInfiniteQueryConfig,
) => IInfiniteQueryResult<TData>;
