import { IArticle, IResponseError } from 'types';

export interface IArticlePageMainProps {
  article: IArticle | null;
  error: IResponseError | null;
  fullUrl: string;
}
