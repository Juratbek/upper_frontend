import EditorJS from '@editorjs/editorjs';
import { Dispatch, SetStateAction } from 'react';
import { IArticle } from 'types';

export interface IArticleActionsProps {
  editor: EditorJS | null;
  article: IArticle | null;
  likeDislikeCount: number;
  setLikeDislikeCount: Dispatch<SetStateAction<number>>;
}

export interface IArticleActionsIconsProps {
  article: IArticle | null;
  isSharePopupOpen: boolean;
  setIsSharePopupOpen: Dispatch<SetStateAction<boolean>>;
  setLikeDislikeCount: Dispatch<SetStateAction<number>>;
  popupId: string;
  className?: string;
  likeDislikeCount: number;
}
