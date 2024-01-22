import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IState {
  isOpen: boolean;
  blogId?: number;
}

const initialState: IState = {
  isOpen: false,
};

const unsubscribeModal = createSlice({
  name: 'unsibscribeModal',
  initialState,
  reducers: {
    open(state, { payload }: PayloadAction<number>) {
      state.isOpen = true;
      state.blogId = payload;
    },
    close(state) {
      state.isOpen = false;
    },
  },
});

export const { open: openUnsubscribeModal, close: closeUnsubscribeModal } =
  unsubscribeModal.actions;
export default unsubscribeModal.reducer;
