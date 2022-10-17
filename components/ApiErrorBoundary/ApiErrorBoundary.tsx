import { FC, useMemo } from 'react';

import { IApiErrorBoundaryProps } from './ApiErrorBoundary.types';

export const ApiErrorBoundary: FC<IApiErrorBoundaryProps> = ({
  res,
  children,
  fallback,
  ...props
}) => {
  const content = useMemo(() => {
    const { isLoading, isError, isFetching, error, isSuccess } = res;
    if (isLoading) return fallback || 'Yuklanmoqda...';
    if (isFetching) return fallback || 'Qayta yuklanmoqda...';
    if (isError) return <pre>{JSON.stringify(error, null, 2)}</pre>;
    if (isSuccess) return <>{children}</>;
    return <></>;
  }, [res]);

  return <div {...props}>{content}</div>;
};
