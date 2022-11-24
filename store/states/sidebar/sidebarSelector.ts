import { TRootState } from 'store/store';

export const getIsSidebarOpen = (store: TRootState): boolean => store.sidebar.isOpen;
