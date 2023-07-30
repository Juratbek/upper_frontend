export interface IBlogRegisterDto {
  name: string;
  bio?: string;
  username: string;
  password: string;
  reCaptchaResponse: string;
  email?: string;
}

export interface IBlogRegisterResponse {
  id: number;
  token: string;
  refreshToken: string;
  name?: string;
  email?: string;
  image?: string;
}

export interface IBlogLoginDto {
  username: string;
  password: string;
  reCaptchaResponse: string;
}

export interface IChangePasswordDto {
  currentPassword: string;
  newPassword: string;
}

export interface IChangeLoginDto {
  username: string;
  password: string;
}

export interface IChangeCredentiasDto {
  username: string;
  password: string;
  token: string;
}

export interface IBlogDonatCredentialsDto {
  donatText?: string;
  cardNumber: string;
}

export interface ITelegramConnectionStatusResponseDto {
  isConnected: boolean;
  username?: string;
}
