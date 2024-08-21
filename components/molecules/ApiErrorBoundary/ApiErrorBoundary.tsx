import { FC, Fragment, useMemo } from 'react';

import { TApiErrorBoundaryProps } from './ApiErrorBoundary.types';

export const ApiErrorBoundary: FC<TApiErrorBoundaryProps> = ({
  res,
  children,
  fallback,
  fallbackItemCount = 1,
  onError,
  defaultComponent,
  memoizationDependencies = [],
  ...props
}) => {
  const Fallback = useMemo(() => {
    if (!fallback) return 'Yuklanmoqda...';
    return Array(fallbackItemCount)
      .fill('')
      .map((_, index) => <Fragment key={index}>{fallback}</Fragment>);
  }, [fallback, fallbackItemCount]);

  const content = useMemo(() => {
    const { isLoading, isError, isFetching, error, isSuccess, isPending } = res;

    if (isLoading) return Fallback;

    if (isError) {
      const ErrorComponent = onError?.(error);
      if (ErrorComponent) return ErrorComponent;

      const nodeEnv = process.env.NODE_ENV;
      if (nodeEnv === 'development') {
        return <pre>Xatolik yuz berdi: {JSON.stringify(error, null, 2)}</pre>;
      }
      return <></>;
    }

    if (isSuccess || isFetching) return <>{children}</>;

    if (isPending) return defaultComponent;

    return <></>;
  }, [res, ...memoizationDependencies, defaultComponent]);

  return <div {...props}>{content}</div>;
};
