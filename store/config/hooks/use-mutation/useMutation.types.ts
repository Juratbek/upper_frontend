import { UseMutationResult } from '@tanstack/react-query';

export interface IMutationConfig<TData> {
  onSuccess?: (data: TData) => Promise<unknown> | void;
  enabled?: boolean;
}

export interface IMutationResult<TData = unknown, TBody = unknown> {
  data?: TData;
  error: unknown;
  isError: boolean;
  isIdle: boolean;
  isLoading: boolean;
  isPaused: boolean;
  isSuccess: boolean;
  mutate: (body: TBody) => unknown;
  reset: () => unknown;
  status: 'idle' | 'loading' | 'error' | 'success';
}

export type TMutationResult = UseMutationResult;

export type TMutationHook<TData = unknown, TBody = unknown> = (
  config?: IMutationConfig<TData>,
) => IMutationResult<TData, TBody>;
