import { HTMLAttributes, ReactNode } from 'react';
import { TRtkError } from 'types';

export interface IApiErrorBoundaryProps extends HTMLAttributes<HTMLDivElement> {
  res: {
    isLoading?: boolean;
    isFetching?: boolean;
    isError?: boolean;
    isSuccess?: boolean;
    error?: TRtkError;
    [name: string]: unknown;
  };
  fallback?: ReactNode;
}
