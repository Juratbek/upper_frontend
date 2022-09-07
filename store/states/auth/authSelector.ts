import { TRootState } from 'store/store';

export const getToken = (store: TRootState): string | null => store.auth.token;
