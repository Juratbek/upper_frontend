import { HTMLAttributes, ReactNode } from 'react';
import { TRtkError } from 'types';
import { Override } from 'utils';

export interface IRes {
  isLoading?: boolean;
  isFetching?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
  error?: TRtkError;
  [name: string]: unknown;
}

export type TApiErrorBoundaryProps = Override<
  HTMLAttributes<HTMLDivElement>,
  {
    res: IRes;
    fallback?: ReactNode;
    fallbackItemCount?: number;
    memoizationDependencies?: unknown[];
    onError?: (error: TRtkError) => ReactNode | void;
  }
>;
