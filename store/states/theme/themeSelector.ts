import { TRootState } from 'store/store';

export const getTheme = (store: TRootState): boolean => store.loginModal.isOpen;
