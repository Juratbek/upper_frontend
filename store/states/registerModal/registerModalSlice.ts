import { createSlice } from '@reduxjs/toolkit';

interface IRegisterModalState {
  isOpen: boolean;
}

const initialState: IRegisterModalState = {
  isOpen: true,
};

const loginModalSlice = createSlice({
  name: 'registerModal',
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

export const { open: openRegisterModal, close: closeRegisterModal } = loginModalSlice.actions;
export default loginModalSlice.reducer;
