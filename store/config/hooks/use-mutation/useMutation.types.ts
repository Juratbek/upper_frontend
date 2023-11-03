interface IMutationConfig<TData> {
  onSuccess?: (data: TData) => void;
}

interface IMutationResult<TData = unknown, TBody = unknown> {
  data?: TData;
  error: unknown;
  isError: boolean;
  isIdle: boolean;
  isLoading: boolean;
  isPaused: boolean;
  isSuccess: boolean;
  mutate: (boady: TBody) => void;
  reset: () => void;
  status: 'idle' | 'loading' | 'error' | 'success';
}

export type TMutationHook<TData = unknown, TBody = unknown> = (
  config?: IMutationConfig<TData>,
) => IMutationResult<TData, TBody>;
