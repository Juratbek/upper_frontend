import { IComment } from 'types';

export interface ICommentProps extends IComment {
  onEditClick: (comment: IComment) => void;
}
