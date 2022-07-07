import { IBlog } from './blog';
import { ILabel } from './label';

export interface IArticle {
  id: number;
  title: string;
  content: string;
  imgUrl?: string;
  author?: IBlog;
  labels: ILabel[];
  publishedDate: Date;
  updatedDate?: Date;
  viewCount?: number;
  likes?: number;
}
