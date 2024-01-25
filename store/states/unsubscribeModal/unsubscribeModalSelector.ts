import { TRootState } from 'store/store';

import { IState } from './unsubscribeModalSlice';

export const getIsUnsubscribeModalOpen = (store: TRootState): IState['isOpen'] =>
  store.unsubscribeModal.isOpen;

export const getBlogIdToUnsubscribe = (store: TRootState): IState['blogId'] =>
  store.unsubscribeModal.blogId;
