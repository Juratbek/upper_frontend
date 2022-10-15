import EditorJS from '@editorjs/editorjs';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IArticle, IDirection, IField, ILabel } from 'types';

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
    setArticle(state, { payload }: PayloadAction<IArticle | null>) {
      state.article = payload;
    },
    setLabels(state, { payload }: PayloadAction<ILabel[]>) {
      if (state.article) {
        state.article.labels = payload;
      }
    },
    setField(state, { payload }: PayloadAction<IField>) {
      if (state.article) {
        state.article.field = payload;
      }
    },
    setDirections(state, { payload }: PayloadAction<IDirection[]>) {
      if (state.article) {
        state.article.directions = payload;
      }
    },
  },
});

export const { setEditor, setArticle, setLabels, setField, setDirections } =
  writeArticleSlice.actions;

export default writeArticleSlice.reducer;
