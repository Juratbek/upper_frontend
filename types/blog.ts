import { ILink } from './common';
import { ILabel } from './label';

export interface IBlogSmall {
  id: number;
  imgUrl: string;
  name: string;
}
export interface IBlogMedium extends IBlogSmall {
  bio?: string;
  followersCount?: number;
  articlesCount?: number;
}

export interface IBlog extends IBlogMedium {
  links: ILink[];
  createdDate: string;
  labels: ILabel[];
  isFollowed?: boolean;
  isCurrentBlog?: boolean;
}
