import { ILink } from './common';
import { ILabel } from './label';

export interface IBlogSmall {
  id: number;
  imgUrl: string;
  name: string;
}
export interface IBlogMedium extends IBlogSmall {
  bio?: string;
  links: ILink[];
}

export interface IBlog extends IBlogMedium {
  createdDate: string;
  labels: ILabel[];
  isFollowed?: boolean;
  isCurrentBlog?: boolean;
  followersCount?: number;
  articlesCount?: number;
}
