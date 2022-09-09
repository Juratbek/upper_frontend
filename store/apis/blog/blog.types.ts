export interface IBlogRegisterDto {
  name: string;
  description: string;
  username: string;
  password: string;
}

export interface IBlogRegisterResponse {
  token: string;
  name: string;
  email: string;
  image: string;
}

export interface IBlogLoginDto {
  username: string;
  password: string;
}
