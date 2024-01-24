import { TRootState } from 'store/store';

import { IState } from './publishModalSlice';

export const getIsPublishModalOpen = (store: TRootState): IState['isOpen'] =>
  store.publishModal.isOpen;
