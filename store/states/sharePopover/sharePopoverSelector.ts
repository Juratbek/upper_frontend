import { TRootState } from 'store/store';

export const getIsSharePopoverOpen = (store: TRootState): boolean => store.share.isOpen;
