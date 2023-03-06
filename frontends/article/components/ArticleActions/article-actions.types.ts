import EditorJS from '@editorjs/editorjs';
import { Dispatch, SetStateAction } from 'react';
import { IArticle } from 'types';

type TLikeDislikeFn = () => void;
export interface IArticleActionsProps {
  editor: EditorJS | null;
  article: IArticle | null;
  onLike: TLikeDislikeFn;
}

export interface IArticleActionsIconsProps {
  article: IArticle | null;
  onLike: TLikeDislikeFn;
  isSharePopupOpen: boolean;
  setIsSharePopupOpen: Dispatch<SetStateAction<boolean>>;
  popupId: string;
  className?: string;
}
