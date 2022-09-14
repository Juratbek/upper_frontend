import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBlogMedium } from 'types';

interface IReadArticleState {
  author: IBlogMedium | null;
}

const initialState: IReadArticleState = {
  author: null,
};

const readArticleSlice = createSlice({
  name: 'readArticle',
  initialState,
  reducers: {
    setAuthor(state, { payload }: PayloadAction<IBlogMedium>) {
      state.author = payload;
    },
  },
});

export const { setAuthor: setArticleAuthor } = readArticleSlice.actions;

export default readArticleSlice.reducer;
