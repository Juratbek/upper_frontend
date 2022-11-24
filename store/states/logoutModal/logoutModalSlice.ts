import { createSlice } from '@reduxjs/toolkit';

interface ILogoutModalState {
  isOpen: boolean;
}

const initialState: ILogoutModalState = {
  isOpen: false,
};

const logoutModalSlice = createSlice({
  name: 'logoutModal',
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

export const { open: openLogoutModal, close: closeLogoutModal } = logoutModalSlice.actions;
export default logoutModalSlice.reducer;
