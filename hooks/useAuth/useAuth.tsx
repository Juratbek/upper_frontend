import { useNextAuth } from 'hooks/useNextAuth/useNextAuth';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'store';
import { IBlogRegisterResponse } from 'store/apis';
import { apiClient } from 'store/config';
import {
  authenticate as storeAuthenticate,
  getAuthStatus,
  getIsAuthenticated,
  setCurrentBlog as setStoreCurrentBlog,
  unauthenticate as storeUnauthenticate,
} from 'store/states';
import { removeLocalStorageTokens, setLocalStorateTokens } from 'utils';
import { ACCESS_UPPER_UZ, REFRESH_TOKEN, TOKEN } from 'variables';

import {
  IUseAuth,
  TAuthenticateFn,
  TAuthenticateTokensFn,
  TSetCurrentBlogFn,
} from './useAuth.types';

export const useAuth = (): IUseAuth => {
  const dispatch = useDispatch();
  const { signIn, signOut } = useNextAuth();
  const status = useAppSelector(getAuthStatus);
  const isAuthenticated = useAppSelector(getIsAuthenticated);
  const isLoading = useMemo(() => status === 'loading', [status]);
  const {
    push,
    query: { redirect },
  } = useRouter();

  const authenticate: TAuthenticateFn = (data) => {
    if (!data.token) return;
    setCurrentBlog(data);
    setLocalStorateTokens(data);
    dispatch(storeAuthenticate());
    signIn(data.token);
    if (typeof redirect === 'string') push(redirect);
  };

  const authenticateTokens: TAuthenticateTokensFn = (tokens) => {
    setLocalStorateTokens(tokens);
    dispatch(storeAuthenticate());
    signIn(tokens.token);
    if (typeof redirect === 'string') push(redirect);
  };

  const setCurrentBlog: TSetCurrentBlogFn = (blog) => {
    dispatch(setStoreCurrentBlog(blog));
  };

  const unauthenticate = (): void => {
    removeLocalStorageTokens();
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

  const openLoginPage = (title?: string) => {
    let url = ACCESS_UPPER_UZ;
    if (title) url = `${url}?title=${title}`;
    window.open(url, '_blank');
  };

  const syncTokens = async () => {
    const refreshToken = getRefreshToken();
    if (refreshToken) {
      try {
        const res = await apiClient.post<{ refreshToken: string }, IBlogRegisterResponse>({
          path: 'blog/open/get-token',
          body: { refreshToken },
          headers: {
            Authorization: '',
          },
        });
        authenticate(res);
      } catch (e) {
        console.error(e);
      }
    }
  };

  return {
    status,
    isAuthenticated,
    isLoading,
    authenticate,
    unauthenticate,
    authenticateTokens,
    getToken,
    getRefreshToken,
    setCurrentBlog,
    openLoginPage,
    syncTokens,
  };
};
