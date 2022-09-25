import EditorJS from '@editorjs/editorjs';

export interface IArticleActionsProps {
  editor: EditorJS | null;
  isLikedOrDisliked?: number;
}
