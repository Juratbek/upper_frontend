import { TRootState } from 'store/store';

import { IAuthState } from './authSlice.types';

export const getAuthStatus = (store: TRootState): IAuthState['status'] => store.auth.status;

export const getIsAuthenticated = (store: TRootState): IAuthState['isAuthenticated'] =>
  store.auth.isAuthenticated;
