import { IBlogRegisterResponse } from 'store/apis/blog/blog.types';
import { TAuthStatus } from 'types';

export interface IAuthState {
  status: TAuthStatus;
  isAuthenticated: boolean | null;
  isGoogleScriptLoaded: boolean;
  user?: IBlogRegisterResponse;
}
