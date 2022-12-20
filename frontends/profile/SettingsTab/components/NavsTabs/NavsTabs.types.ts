import { IRes } from 'components/ApiErrorBoundary';
import { IBlog } from 'types';

export interface INavTab {
  res?: IRes;
  currentBlog?: IBlog;
}
