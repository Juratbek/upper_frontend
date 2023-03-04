import { IBlogRegisterResponse } from 'store/apis';
import { TAuthStatus } from 'types';

export interface IUseAuth {
  status: TAuthStatus;
  isAuthenticated: boolean | null;
  isLoading: boolean;
  currentBlog?: IBlogRegisterResponse;
  authenticate: (user: IBlogRegisterResponse) => void;
  unauthenticate: () => void;
  getToken: () => string | null;
  getRefreshToken: () => string | null;
}
