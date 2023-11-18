export interface IBlogRegisterResponse {
  id: number;
  token: string;
  refreshToken: string;
  name?: string;
  email?: string;
  image?: string;
}

export interface ICurrentBlog {
  id: number;
  name: string;
  imgUrl: string;
  bio?: string;
}
