import { IAuthProvider } from 'types';
import { facebookSignIn, githubSignIn, googleSignIn } from 'utils';

export const AUTH_PROVIDER_TYPES = {
  google: 'google',
  github: 'github',
  facebook: 'facebook',
};

export const AUTH_PROVIDERS: IAuthProvider = {
  [AUTH_PROVIDER_TYPES.github]: githubSignIn,
  [AUTH_PROVIDER_TYPES.google]: googleSignIn,
  [AUTH_PROVIDER_TYPES.facebook]: facebookSignIn,
};
