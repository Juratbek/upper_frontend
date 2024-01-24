import { createSlice } from '@reduxjs/toolkit';

export interface IState {
  isOpen: boolean;
}

const initialState: IState = {
  isOpen: false,
};

const publishModal = createSlice({
  name: 'publishModal',
  initialState,
  reducers: {
    open(state) {
      state.isOpen = true;
    },
    close(state) {
      state.isOpen = false;
    },
  },
});

export const { open: openPublishModal, close: closePublishModal } = publishModal.actions;
export default publishModal.reducer;
