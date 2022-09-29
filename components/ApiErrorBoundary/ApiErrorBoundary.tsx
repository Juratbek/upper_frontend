import { FC, useMemo } from 'react';

import { IApiErrorBoundaryProps } from './ApiErrorBoundary.types';

export const ApiErrorBoundary: FC<IApiErrorBoundaryProps> = ({ res, children, ...props }) => {
  const content = useMemo(() => {
    const { isLoading, isError, isFetching, error, isSuccess } = res;
    if (isLoading) return 'Loading...';
    if (isFetching) return 'Fetching...';
    if (isError) return <pre>{JSON.stringify(error, null, 2)}</pre>;
    if (isSuccess) return <>{children}</>;
    return <></>;
  }, [res]);

  return <div {...props}>{content}</div>;
};
