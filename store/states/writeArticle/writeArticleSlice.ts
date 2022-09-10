import EditorJS from '@editorjs/editorjs';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IArticle } from 'types';

interface IWriteArticleState {
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
    setArticle(state, { payload }: PayloadAction<IArticle>) {
      state.article = payload;
    },
  },
});

export const { setEditor, setArticle } = writeArticleSlice.actions;

export default writeArticleSlice.reducer;
