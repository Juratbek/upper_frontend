import { useRouter } from 'next/router';

import { IUseUrl, TParamValue } from './useUrlParams.types';

export const useUrlParams = (): IUseUrl => {
  const { query, push, pathname, isReady } = useRouter();

  const getParam = (name: string): TParamValue => {
    return query[name];
  };

  const setParam = (name: string, value: TParamValue): void => {
    push({
      pathname: pathname,
      query: { ...query, [name]: value },
    });
  };

  return {
    getParam,
    setParam,
    isReady,
  };
};
