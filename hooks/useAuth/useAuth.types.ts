import { IBlogRegisterResponse } from 'store/apis';
import { ICurrentBlog } from 'store/states';
import { TAuthStatus } from 'types';

export interface ITokens {
  token: string;
  refreshToken: string;
}

export type TAuthenticateFn = (data: IBlogRegisterResponse) => void;

export type TAuthenticateTokensFn = (tokens: ITokens) => void;

export type TSetCurrentBlogFn = (blog: ICurrentBlog) => void;

export interface IUseAuth {
  status: TAuthStatus;
  isAuthenticated: boolean | null;
  isLoading: boolean;
  currentBlog?: ICurrentBlog;
  authenticate: TAuthenticateFn;
  authenticateTokens: TAuthenticateTokensFn;
  unauthenticate: () => void;
  getToken: () => string | null;
  getRefreshToken: () => string | null;
  setCurrentBlog: TSetCurrentBlogFn;
  openLoginPage: (title?: string) => void;
}
