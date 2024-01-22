import EditorJS from '@editorjs/editorjs';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IArticle, ILabel } from 'types';

export interface IWriteArticleState {
  editor: EditorJS | null;
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
    setEditor(state, { payload }: PayloadAction<EditorJS>) {
      state.editor = payload;
    },
    setArticle(state, { payload }: PayloadAction<IArticle | null>) {
      state.article = payload;
    },
    setLabels(state, { payload }: PayloadAction<ILabel[]>) {
      if (state.article) {
        state.article.labels = payload;
      }
    },
  },
});

export const { setEditor, setArticle, setLabels } = writeArticleSlice.actions;

export default writeArticleSlice.reducer;
