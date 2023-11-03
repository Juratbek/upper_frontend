import { IBlogSmall, IPublishedArticleItem } from 'types';

export interface IPublishedArticleProps {
  className?: string;
  article: IPublishedArticleItem;
  author?: IBlogSmall;
}
