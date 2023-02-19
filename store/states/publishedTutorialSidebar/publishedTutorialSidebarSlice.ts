import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBlogSmall } from 'types';

interface IPublishedTutorialSidebarState {
  author?: IBlogSmall;
}

const initialState: IPublishedTutorialSidebarState = {};

const publishedTutorialSidebarSlice = createSlice({
  name: 'publishedTutorialSidebar',
  initialState,
  reducers: {
    setAuthor(state, { payload }: PayloadAction<IBlogSmall>) {
      state.author = payload;
    },
  },
});

export const { setAuthor: setPublishedTutorialAuthor } = publishedTutorialSidebarSlice.actions;

export default publishedTutorialSidebarSlice.reducer;
