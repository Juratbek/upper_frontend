import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import {
  authenticate as storeAuthenticate,
  getAuthStatus,
  unauthenticate as storeUnauthenticate,
} from 'store/states';
import { TOKEN } from 'variables';

import { IUseAuth } from './useAuth.types';

export const useAuth = (): IUseAuth => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(getAuthStatus);

  useEffect(() => {
    const token = getToken();
    token && dispatch(storeAuthenticate());
  }, []);

  const authenticate = (token: string): void => {
    try {
      localStorage.setItem(TOKEN, token);
      dispatch(storeAuthenticate());
    } catch (e) {
      console.error(e);
    }
  };

  const unauthenticate = (): void => {
    try {
      localStorage.removeItem(TOKEN);
      dispatch(storeUnauthenticate());
    } catch (e) {
      console.error(e);
    }
  };

  const getToken = (): string | null => {
    try {
      return localStorage.getItem(TOKEN);
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  return {
    status,
    authenticate,
    unauthenticate,
    getToken,
  };
};
