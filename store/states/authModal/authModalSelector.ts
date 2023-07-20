import { ReactNode } from 'react';
import { TRootState } from 'store/store';

export const getIsAuthModalOpen = (store: TRootState): boolean => store.authModal.isOpen;

export const getAuthModalTitle = (store: TRootState): ReactNode => store.authModal.title;
