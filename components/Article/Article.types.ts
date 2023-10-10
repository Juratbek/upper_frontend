import { IArticleResult, IBlogSmall } from 'types';

export interface IArticleProps {
  className?: string;
  redirectUrl?: string;
  article: IArticleResult;
  author?: IBlogSmall;
}
