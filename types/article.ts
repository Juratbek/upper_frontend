import { IBlockData } from 'components/molecules';

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
  blocks: IBlockData[];
  imgUrl: string;
  author: IBlogSmall;
  tags: string[];
  publishedDate?: string;
  updatedDate?: string;
  status: TArticleStatus;
  publishedArticleId?: number;
  token?: string;
  textContent?: string;
  content?: string;
}

export type TArticleStatus = 'PUBLISHED' | 'SAVED';
