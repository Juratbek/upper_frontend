import { TAuthStatus } from 'types';

export interface IUseAuth {
  status: TAuthStatus;
  isAuthenticated: boolean | undefined;
  authenticate: (token: string) => void;
  unauthenticate: () => void;
  getToken: () => string | null;
}
