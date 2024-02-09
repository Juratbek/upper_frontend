import { IArticle, IResponseError } from 'types';

export interface IArticlePageMainProps {
  article: IArticle | null;
  title: string;
  error: IResponseError | null;
  fullUrl: string;
}
