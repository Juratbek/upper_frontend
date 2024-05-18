import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IArticle } from 'types';

export interface IWriteArticleState {
  editor: unknown | null;
  article: IArticle | null;
}

const initialState: IWriteArticleState = {
  editor: null,
  article: null,
};

const writeArticleSlice = createSlice({
  name: 'writeArticle',
  initialState,
  reducers: {
    setEditor(state, { payload }: PayloadAction) {
      state.editor = payload;
    },
    setArticle(state, { payload }: PayloadAction<IArticle | null>) {
      state.article = payload;
    },
  },
});

export const { setEditor, setArticle } = writeArticleSlice.actions;

export default writeArticleSlice.reducer;
