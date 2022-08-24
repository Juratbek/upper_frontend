import { createSlice } from '@reduxjs/toolkit';

interface ILoginModalState {
  isOpen: boolean;
}

const initialState: ILoginModalState = {
  isOpen: false,
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

export const { open, close } = loginModalSlice.actions;
export default loginModalSlice.reducer;
