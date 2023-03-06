import { IBlogRegisterResponse } from 'store/apis/blog/blog.types';
import { TRootState } from 'store/store';
import { TAuthStatus } from 'types';

export const getAuthStatus = (store: TRootState): TAuthStatus => store.auth.status;

export const getCurrentBlog = (store: TRootState): IBlogRegisterResponse | undefined =>
  store.auth.user;

export const getIsAuthenticated = (store: TRootState): boolean | null => store.auth.isAuthenticated;

export const getIsGoogleScriptLoaded = (store: TRootState): boolean =>
  store.auth.isGoogleScriptLoaded;
