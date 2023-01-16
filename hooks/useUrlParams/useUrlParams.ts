import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { ILocation, IUseUrl, TParamValue } from './useUrlParams.types';

export const useUrlParams = (): IUseUrl => {
  const { query, push, pathname, isReady } = useRouter();

  const location: ILocation = useMemo(() => {
    try {
      return window.location;
    } catch (e) {
      return {
        host: '',
        origin: '',
      };
    }
  }, []);

  const getParam = (name: string): TParamValue => {
    return query[name];
  };

  const setParams = (params: { [name: string]: TParamValue }): void => {
    push({
      pathname: pathname,
      query: { ...query, ...params },
    });
  };

  const setParam = (name: string, value: TParamValue | number): void => {
    push({
      pathname: pathname,
      query: { ...query, [name]: value },
    });
  };

  return {
    getParam,
    setParam,
    setParams,
    location,
    isReady,
  };
};
