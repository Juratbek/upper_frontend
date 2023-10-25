import { IArticleResult, IBlogSmall } from 'types';

export interface IPublishedArticleProps {
  className?: string;
  article: IArticleResult;
  author?: IBlogSmall;
}
