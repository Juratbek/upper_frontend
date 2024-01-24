import { createSlice } from '@reduxjs/toolkit';

interface ISharePopoverState {
  isOpen: boolean;
}
const initialState: ISharePopoverState = {
  isOpen: false,
};

const sharePopoverSlice = createSlice({
  name: 'sharePopover',
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
  open: openSharePopover,
  close: closeSharePopover,
  toggle: toggleSharePopover,
} = sharePopoverSlice.actions;

export default sharePopoverSlice.reducer;
