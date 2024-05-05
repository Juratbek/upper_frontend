import { IBlogSmall } from './blog';

export type TPublishedArticleStatus = 'ACTIVE';

export interface IPublishedArticleItem {
  id: number;
  title: string;
  content: string;
  imgUrl: string;
  author?: IBlogSmall;
}
