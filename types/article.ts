import { OutputBlockData } from '@editorjs/editorjs';

import { IBlogSmall } from './blog';

export interface IArticleSmall {
  id: number;
  title: string;
}
export interface ISidebarArticle {
  id: number;
  title: string;
  imgUrl: string;
  author: IBlogSmall;
}
export interface IArticleResult extends IArticleSmall {
  content?: string;
}

export interface IArticle extends IArticleSmall {
  blocks: OutputBlockData[];
  imgUrl: string;
  author: IBlogSmall;
  tags: string[];
  publishedDate?: string;
  updatedDate?: string;
  status: TArticleStatus;
  publishedArticleId?: number;
  token?: string;
  textContent?: string;
}

export type TArticleStatus = 'PUBLISHED' | 'SAVED';
