import { TRootState } from 'store/store';

export const getIsModalOpen = (store: TRootState): boolean => store.loginModal.isOpen;
