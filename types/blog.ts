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
  links: Record<string, string>;
  createdDate: Date;
}
