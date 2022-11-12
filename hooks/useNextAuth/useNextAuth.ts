import { useUrlParams } from 'hooks/useUrlParams/useUrlParams';
import { nextAuthSignIn, nextAuthSignOut } from 'utils';

import { IUseNextAuthProps } from './useNextAuth.types';

export const useNextAuth = (): IUseNextAuthProps => {
  const { location } = useUrlParams();

  const signIn = (token: string): Promise<Response> => nextAuthSignIn(location.origin, token);

  const signOut = (): Promise<Response> => nextAuthSignOut(location.origin);

  return {
    signIn,
    signOut,
  };
};
