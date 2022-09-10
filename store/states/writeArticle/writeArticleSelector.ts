import EditorJS from '@editorjs/editorjs';
import { TRootState } from 'store/store';
import { IArticle } from 'types';

export const getEditor = (store: TRootState): EditorJS | null => store.writeArticle.editor;

export const getArticle = (store: TRootState): IArticle | null => store.writeArticle.article;
