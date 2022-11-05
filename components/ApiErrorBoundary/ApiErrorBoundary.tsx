import { FC, Fragment, useMemo } from 'react';

import { IApiErrorBoundaryProps } from './ApiErrorBoundary.types';

export const ApiErrorBoundary: FC<IApiErrorBoundaryProps> = ({
  res,
  children,
  fallback,
  fallbackItemCount = 1,
  ...props
}) => {
  const Fallback = useMemo(() => {
    return Array(fallbackItemCount)
      .fill('')
      .map((_, index) => <Fragment key={index}>{fallback}</Fragment>);
  }, [fallback, fallbackItemCount]);

  const content = useMemo(() => {
    const { isLoading, isError, isFetching, error, isSuccess } = res;
    if (isLoading) return Fallback || 'Yuklanmoqda...';
    if (isFetching) return Fallback || 'Qayta yuklanmoqda...';
    if (isError) return <pre>{JSON.stringify(error, null, 2)}</pre>;
    if (isSuccess) return <>{children}</>;
    return <></>;
  }, [res]);

  return <div {...props}>{content}</div>;
};
