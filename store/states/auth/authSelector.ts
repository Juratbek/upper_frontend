import { TRootState } from 'store/store';
import { TAuthStatus } from 'types';

export const getAuthStatus = (store: TRootState): TAuthStatus => store.auth.status;
