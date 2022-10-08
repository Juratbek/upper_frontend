import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { IBlogRegisterResponse } from 'store/apis/blog/blog.types';
import {
  authenticate as storeAuthenticate,
  getAuthStatus,
  getIsAuthenticated,
  unauthenticate as storeUnauthenticate,
} from 'store/states';
import { REFRESH_TOKEN, TOKEN } from 'variables';

import { IUseAuth } from './useAuth.types';

export const useAuth = (): IUseAuth => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(getAuthStatus);
  const isAuthenticated = useAppSelector(getIsAuthenticated);

  useEffect(() => {
    const token = getToken();
    const refreshToken = getRefreshToken() || '';
    dispatch(token ? storeAuthenticate({ token, refreshToken }) : storeUnauthenticate());
  }, []);

  const authenticate = (user: IBlogRegisterResponse): void => {
    dispatch(storeAuthenticate(user));
  };

  const unauthenticate = (): void => {
    dispatch(storeUnauthenticate());
  };

  const getToken = (): string | null => {
    try {
      return localStorage.getItem(TOKEN);
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  const getRefreshToken = (): string | null => {
    try {
      return localStorage.getItem(REFRESH_TOKEN);
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
