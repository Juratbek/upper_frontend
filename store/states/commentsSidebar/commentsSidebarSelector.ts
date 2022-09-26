import { TRootState } from 'store/store';

export const getIsCommentsSidebarOpen = (store: TRootState): boolean => store.comments.isOpen;
