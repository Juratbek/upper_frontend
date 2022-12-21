import { HTMLAttributes, ReactNode } from 'react';
import { TRtkError } from 'types';

export interface IRes {
  isLoading?: boolean;
  isFetching?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
  error?: TRtkError;
  [name: string]: unknown;
}

export interface IApiErrorBoundaryProps extends HTMLAttributes<HTMLDivElement> {
  res: IRes;
  fallback?: ReactNode;
  fallbackItemCount?: number;
  memoizationDependencies?: unknown[];
}
