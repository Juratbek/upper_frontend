import { useUrlParams } from 'hooks/useUrlParams/useUrlParams';

import { IUseNextAuthProps } from './useNextAuth.types';

export const useNextAuth = (): IUseNextAuthProps => {
  const { location } = useUrlParams();

  const signIn = (token: string): Promise<Response> => {
    return fetch(`${location.origin}/api/sign-in?token=${token}`);
  };

  const signOut = (): Promise<Response> => fetch(`${location.origin}/api/sign-out`);

  return {
    signIn,
    signOut,
  };
};
