import EditorJS from '@editorjs/editorjs';
import { Dispatch, FormEvent, SetStateAction } from 'react';

export interface IArticleActionsProps {
  editor: EditorJS | null;
  isLikedOrDisliked?: number;
  likeDislikeCount: number;
  isSharePopupOpen: boolean;
  likeDislike: (value: -1 | 1) => void;
  shareIconClickHandler: (event: FormEvent<Element>) => void;
  setIsSharePopupOpen: Dispatch<SetStateAction<boolean>>;
}
