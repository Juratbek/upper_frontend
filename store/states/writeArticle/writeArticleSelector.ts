import { TRootState } from 'store/store';

import { IWriteArticleState } from './writeArticleSlice';

export const getEditor = (store: TRootState): IWriteArticleState['editor'] =>
  store.writeArticle.editor;

export const getArticle = (store: TRootState): IWriteArticleState['article'] =>
  store.writeArticle.article;
