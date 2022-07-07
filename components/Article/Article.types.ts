import { IArticle, TAction, TIcon } from 'types';

export interface IArticleProps extends IArticle {
  className?: string;
  icons?: TIcon[];
  actions?: TAction[];
}
