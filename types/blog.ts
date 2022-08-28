import { TIcon } from './common';

interface ILink {
  icon: TIcon;
  link: string;
}

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
  links?: ILink[];
  createdDate: Date;
}
