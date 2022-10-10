import { useNextAuth } from 'hooks/useNextAuth/useNextAuth';
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
  const { signIn, signOut } = useNextAuth();
  const status = useAppSelector(getAuthStatus);
  const isAuthenticated = useAppSelector(getIsAuthenticated);

  useEffect(() => {
    const token = getToken();
    const refreshToken = getRefreshToken() || '';
    if (token) {
      authenticate({ token, refreshToken });
    } else {
      unauthenticate();
    }
  }, []);

  const authenticate = (user: IBlogRegisterResponse): void => {
    dispatch(storeAuthenticate(user));
    signIn(user.token);
  };

  const unauthenticate = (): void => {
    dispatch(storeUnauthenticate());
    signOut();
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
