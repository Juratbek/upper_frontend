import { IBlogSmall } from './blog';

export interface IComment {
  id: number;
  date: string;
  text: string;
  updatedText: string;
  author: IBlogSmall;
}
