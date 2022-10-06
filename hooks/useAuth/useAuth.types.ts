import { TAuthStatus } from 'types';

export interface IUseAuth {
  status: TAuthStatus;
  isAuthenticated: boolean | null;
  authenticate: (token: string) => void;
  unauthenticate: () => void;
  getToken: () => string | null;
}
