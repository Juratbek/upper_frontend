import { ReactNode } from 'react';
import { TRootState } from 'store/store';

export const getIsModalOpen = (store: TRootState): boolean => store.loginModal.isOpen;

export const getLoginModalTitle = (store: TRootState): ReactNode => store.loginModal.title;
