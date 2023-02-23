import { useNextAuth } from 'hooks/useNextAuth/useNextAuth';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
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
  const isLoading = useMemo(() => status === 'loading', [status]);
  const {
    push,
    query: { redirect },
  } = useRouter();

  const authenticate = (user: IBlogRegisterResponse): void => {
    dispatch(storeAuthenticate(user));
    signIn(user.token);
    if (typeof redirect === 'string') push(redirect);
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
    isLoading,
    authenticate,
    unauthenticate,
    getToken,
    getRefreshToken,
  };
};
