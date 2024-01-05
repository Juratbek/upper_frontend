import { ICurrentBlog } from 'store/states';
import { IComment } from 'types';

export interface ICommentProps extends IComment {
  currentBlog?: ICurrentBlog | undefined;
}
