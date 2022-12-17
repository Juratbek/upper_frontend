import { IArticleResult, IBlogSmall, TIcon } from 'types';

export interface IArticleProps {
  className?: string;
  icons?: TIcon[];
  redirectUrl?: string;
  article: IArticleResult;
  author?: IBlogSmall;
}
