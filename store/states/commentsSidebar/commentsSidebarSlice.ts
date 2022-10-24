import { createSlice } from '@reduxjs/toolkit';

interface ICommentSidebarState {
  isOpen: boolean;
}

const initialState: ICommentSidebarState = {
  isOpen: false,
};

const commentsSidebarSlice = createSlice({
  name: 'commentSidebar',
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
  open: openCommentsSidebar,
  close: closeCommentsSidebar,
  toggle: toggleCommentsSidebar,
} = commentsSidebarSlice.actions;
export default commentsSidebarSlice.reducer;
