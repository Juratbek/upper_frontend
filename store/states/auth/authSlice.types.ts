import { TAuthStatus } from 'types';

export interface ICurrentBlog {
  id: number;
  name?: string;
  email?: string;
  image?: string;
}
export interface IAuthState {
  status: TAuthStatus;
  isAuthenticated: boolean | null;
  isGoogleScriptLoaded: boolean;
  currentBlog?: ICurrentBlog;
}
