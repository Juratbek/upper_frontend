import { createSlice } from '@reduxjs/toolkit';

interface ILoginModalState {
  isOpen: boolean;
}

const initialState: ILoginModalState = {
  isOpen: true,
};

const loginModalSlice = createSlice({
  name: 'loginModal',
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

export const { open: openLoginModal, close: closeLoginModal } = loginModalSlice.actions;
export default loginModalSlice.reducer;
