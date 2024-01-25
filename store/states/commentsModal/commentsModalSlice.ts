import { createSlice } from '@reduxjs/toolkit';

export interface ICommentModalState {
  isOpen: boolean;
}

const initialState: ICommentModalState = {
  isOpen: true,
};

const commentsModalSlice = createSlice({
  name: 'commentModal',
  initialState,
  reducers: {
    open(state) {
      state.isOpen = true;
    },
    close(state) {
      state.isOpen = false;
    },
    toggle(state) {
      const isOpen = state.isOpen;
      state.isOpen = !isOpen;
    },
  },
});

export const {
  open: openCommentsModal,
  close: closeCommentsModal,
  toggle: toggleCommentsModal,
} = commentsModalSlice.actions;

export default commentsModalSlice.reducer;
