import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import {
  authenticate as storeAuthenticate,
  getAuthStatus,
  getIsAuthenticated,
  unauthenticate as storeUnauthenticate,
} from 'store/states';
import { TOKEN } from 'variables';

import { IUseAuth } from './useAuth.types';

export const useAuth = (): IUseAuth => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(getAuthStatus);
  const isAuthenticated = useAppSelector(getIsAuthenticated);

  useEffect(() => {
    const token = getToken();
    dispatch(token ? storeAuthenticate() : storeUnauthenticate());
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
      console.error(e);
      return null;
    }
  };

  return {
    status,
    isAuthenticated,
    authenticate,
    unauthenticate,
    getToken,
  };
};
