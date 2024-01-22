import { TRootState } from 'store/store';

import { ICommentModalState } from './commentsModalSlice';

export const getIsCommentsModalOpen = (store: TRootState): ICommentModalState['isOpen'] =>
  store.comments.isOpen;
