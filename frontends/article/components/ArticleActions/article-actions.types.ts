import EditorJS from '@editorjs/editorjs';
import { Dispatch, SetStateAction } from 'react';
import { IArticle } from 'types';

type TLikeFn = () => void;

type TDislikeFn = (wasLikedBefore: boolean) => void;

export interface IArticleActionsProps {
  editor: EditorJS | null;
  article: IArticle | null;
  onLike: TLikeFn;
  onDislike: TDislikeFn;
}

export interface IArticleActionsIconsProps {
  article: IArticle | null;
  onLike: TLikeFn;
  onDislike: TDislikeFn;
  isSharePopupOpen: boolean;
  setIsSharePopupOpen: Dispatch<SetStateAction<boolean>>;
  popupId: string;
  className?: string;
}
