import { TRootState } from 'store/store';
import { TAuthStatus } from 'types';

import { ICurrentBlog } from './authSlice.types';

export const getAuthStatus = (store: TRootState): TAuthStatus => store.auth.status;

export const getCurrentBlog = (store: TRootState): ICurrentBlog | undefined =>
  store.auth.currentBlog;

export const getIsAuthenticated = (store: TRootState): boolean | null => store.auth.isAuthenticated;
