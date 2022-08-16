import { OutputData } from '@editorjs/editorjs';

import { IBlog } from './blog';
import { ILabel } from './label';

export interface IArticleResult {
  id: number;
  title: string;
  content: string;
  imgUrl?: string;
  author?: IBlog;
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
  author?: IBlog;
  labels: ILabel[];
  publishedDate: string;
  updatedDate?: string;
  viewCount?: number;
  likes?: number;
  prevArticleId?: number;
  nextArticleId?: number;
}
