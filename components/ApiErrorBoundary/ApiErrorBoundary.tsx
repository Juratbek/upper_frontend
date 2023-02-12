import { FC, Fragment, useMemo } from 'react';

import { TApiErrorBoundaryProps } from './ApiErrorBoundary.types';

export const ApiErrorBoundary: FC<TApiErrorBoundaryProps> = ({
  res,
  children,
  fallback,
  fallbackItemCount = 1,
  onError,
  defaultComponent,
  ...props
}) => {
  const Fallback = useMemo(() => {
    return Array(fallbackItemCount)
      .fill('')
      .map((_, index) => <Fragment key={index}>{fallback}</Fragment>);
  }, [fallback, fallbackItemCount]);

  const content = useMemo(() => {
    const { isLoading, isError, isFetching, error, isSuccess, isUninitialized } = res;
    if (isUninitialized) return defaultComponent;
    if (isLoading) return Fallback || 'Yuklanmoqda...';
    if (isError) {
      const ErrorComponent = onError?.(error);
      return ErrorComponent || <pre>{JSON.stringify(error, null, 2)}</pre>;
    }
    if (isSuccess || isFetching) return <>{children}</>;
    return <></>;
  }, [res, props.memoizationDependencies, defaultComponent]);

  return <div {...props}>{content}</div>;
};
