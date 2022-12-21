import { IBlog, IResponseError } from 'types';

export interface IBlogPageProps {
  blog?: IBlog | null;
  error?: IResponseError;
  fullUrl: string;
}
