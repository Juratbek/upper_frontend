import { TRootState } from 'store/store';

export const getIsRegisterModalOpen = (store: TRootState): boolean => store.registerModal.isOpen;
