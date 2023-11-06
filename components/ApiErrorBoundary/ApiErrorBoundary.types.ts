import { HTMLAttributes, ReactNode } from 'react';
import { Override } from 'utils';

export interface IRes {
  isLoading?: boolean;
  isFetching?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
  isUninitialized?: boolean;
  error?: unknown;
}

export type TApiErrorBoundaryProps = Override<
  HTMLAttributes<HTMLDivElement>,
  {
    res: IRes;
    fallback?: ReactNode;
    fallbackItemCount?: number;
    memoizationDependencies?: unknown[];
    onError?: (error: unknown) => ReactNode | void;
    defaultComponent?: ReactNode;
  }
>;
