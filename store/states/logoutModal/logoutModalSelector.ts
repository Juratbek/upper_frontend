import { TRootState } from 'store/store';

export const getIsLogoutModalOpen = (store: TRootState): boolean => store.logoutModal.isOpen;
