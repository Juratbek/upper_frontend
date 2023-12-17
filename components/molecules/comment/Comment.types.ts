import { ICurrentBlog } from 'store/states';
import { IComment } from 'types';

export interface ICommentProps extends IComment {
  onEditClick: (comment: IComment) => void;
  currentBlog: ICurrentBlog | undefined;
}
