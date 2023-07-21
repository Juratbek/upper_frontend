import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReactNode } from 'react';

interface ILoginModalState {
  isOpen: boolean;
  title: ReactNode;
}

const initialState: ILoginModalState = {
  isOpen: false,
  title: null,
};

const authModal = createSlice({
  name: 'loginModal',
  initialState,
  reducers: {
    open(state, { payload }: PayloadAction<ReactNode>) {
      state.isOpen = true;
      state.title = payload;
    },
    close(state) {
      state.isOpen = false;
      state.title = null;
    },
  },
});

export const { open: openAuthModal, close: closeAuthModal } = authModal.actions;
export default authModal.reducer;
