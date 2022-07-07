export interface IBlog {
  id: number;
  imgUrl: string;
  name: string;
  bio?: string;
  followersCount?: number;
  articlesCount?: number;
}
