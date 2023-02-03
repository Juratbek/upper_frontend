import { IArticle, IResponseError } from 'types';

export interface IArticleProps {
  className?: string;
  showAuthor?: boolean;
  article: IArticle | null;
  error: IResponseError;
  fullUrl: string;
}
