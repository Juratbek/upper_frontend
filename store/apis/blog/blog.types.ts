export interface IBlogRegisterDto {
  name: string;
  bio: string;
  username: string;
  password: string;
}

export interface IBlogRegisterResponse {
  token: string;
  refreshToken: string;
  name?: string;
  email?: string;
  image?: string;
}

export interface IBlogLoginDto {
  username: string;
  password: string;
}
