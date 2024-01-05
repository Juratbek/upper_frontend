import { TRootState } from 'store/store';

export const getIsCommentsModalOpen = (store: TRootState): boolean => store.comments.isOpen;
