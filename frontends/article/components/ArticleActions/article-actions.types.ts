import EditorJS from '@editorjs/editorjs';
import { IArticle } from 'types';

export interface IArticleActionsProps {
  editor: EditorJS | null;
  article: IArticle;
}
