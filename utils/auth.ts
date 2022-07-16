import { IFacebookUser, IGitHubUser, IGoogleUser, TAuthProviderProp } from 'types';

export const googleSignIn = (profile: TAuthProviderProp): boolean => {
  const {
    email,
    name,
    picture,
    email_verified: isEmailVerified,
  } = profile as unknown as IGoogleUser;
  return true;
};

export const githubSignIn = (profile: TAuthProviderProp): boolean => {
  const { email, bio, login, avatar_url, name, company, location } =
    profile as unknown as IGitHubUser;
  return true;
};

export const facebookSignIn = (profile: TAuthProviderProp): boolean => {
  const {
    email,
    name,
    picture: {
      data: { url },
    },
  } = profile as unknown as IFacebookUser;
  return true;
};
