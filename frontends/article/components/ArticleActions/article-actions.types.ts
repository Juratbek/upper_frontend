import EditorJS from '@editorjs/editorjs';
import { Dispatch, SetStateAction } from 'react';
import { IArticle } from 'types';

export interface IArticleActionsProps {
  editor: EditorJS | null;
  article: IArticle | null;
}

export interface IArticleActionsIconsProps {
  article: IArticle | null;
  isSharePopupOpen: boolean;
  setIsSharePopupOpen: Dispatch<SetStateAction<boolean>>;
  popupId: string;
  right?: number;
}
