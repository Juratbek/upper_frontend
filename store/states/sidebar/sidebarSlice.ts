import { createSlice } from '@reduxjs/toolkit';

interface ISidebarState {
  isOpen: boolean;
}

const initialState: ISidebarState = {
  isOpen: false,
};

const sidebarSlice = createSlice({
  name: 'sidebar',
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

export const { open: openSidebar, close: closeSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
