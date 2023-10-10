import { IArticleResult, IBlogSmall } from 'types';

export interface IArticleProps {
  className?: string;
  article: IArticleResult;
  author?: IBlogSmall;
}
