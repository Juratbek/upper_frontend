import { OutputBlockData } from '@editorjs/editorjs';

import { IBlogSmall } from './blog';
import { ILabel } from './label';

export interface ISidebarArticle {
  id: number;
  title: string;
  imgUrl: string;
  author: IBlogSmall;
}
export interface IArticleResult {
  id: number;
  title: string;
  content: string;
  status: TArticleStatus;
  imgUrl: string;
  author?: IBlogSmall;
  labels: ILabel[];
  publishedDate: Date;
  updatedDate?: Date;
  viewCount: number;
  likes?: number;
}

export interface IArticle {
  id: number;
  title: string;
  blocks: OutputBlockData[];
  imgUrl?: string;
  author: IBlogSmall;
  labels: ILabel[];
  publishedDate?: string;
  updatedDate?: string;
  viewCount: number;
  likeCount: number;
  dislikeCount: number;
  prevArticleId?: number;
  nextArticleId?: number;
  status: TArticleStatus;
  publishedArticleId?: number;
  hasNotpublishedChanges?: boolean;
  token?: string;
}

export type TArticleStatus = 'PUBLISHED' | 'UNPUBLISHED' | 'SAVED' | 'DELETED';
