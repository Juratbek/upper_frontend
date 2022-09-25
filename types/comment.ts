import { IBlogSmall } from './blog';

export interface IComment {
  id: number;
  date: string;
  message: string;
  author: IBlogSmall;
}
