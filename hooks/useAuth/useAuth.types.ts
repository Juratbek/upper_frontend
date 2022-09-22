import { TAuthStatus } from 'types';

export interface IUseAuth {
  status: TAuthStatus;
  authenticate: (token: string) => void;
  unauthenticate: () => void;
  getToken: () => string | null;
}
