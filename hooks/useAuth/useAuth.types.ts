import { IBlogRegisterResponse } from 'store/apis/blog/blog.types';
import { TAuthStatus } from 'types';

export interface IUseAuth {
  status: TAuthStatus;
  isAuthenticated: boolean | null;
  isLoading: boolean;
  authenticate: (user: IBlogRegisterResponse) => void;
  unauthenticate: () => void;
  getToken: () => string | null;
  getRefreshToken: () => string | null;
}
