import { OutputData } from '@editorjs/editorjs';
import { ARTICLE_STATUSES } from 'variables/article';

import { IBlogSmall } from './blog';
import { ILabel } from './label';

export interface IArticleResult {
  id: number;
  title: string;
  content: string;
  status: TArticleStatus;
  imgUrl?: string;
  author?: IBlogSmall;
  labels: ILabel[];
  publishedDate: Date;
  updatedDate?: Date;
  viewCount?: number;
  likes?: number;
}

export interface IArticle {
  id: number;
  title: string;
  content: OutputData;
  imgUrl?: string;
  author?: IBlogSmall;
  labels: ILabel[];
  publishedDate: string;
  updatedDate?: string;
  viewCount?: number;
  likes?: number;
  prevArticleId?: number;
  nextArticleId?: number;
}

export type TArticleStatus =
  | typeof ARTICLE_STATUSES.PUBLISHED
  | typeof ARTICLE_STATUSES.UNPUBLISHED
  | typeof ARTICLE_STATUSES.DRAFT
  | typeof ARTICLE_STATUSES.DELETED;
