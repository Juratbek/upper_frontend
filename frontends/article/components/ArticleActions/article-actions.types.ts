import EditorJS from '@editorjs/editorjs';

export interface IArticleActionsProps {
  editor: EditorJS | null;
  isLikedOrDisliked?: number;
  likeDislikeCount: number;
  likeDislike: (value: -1 | 1) => void;
}
