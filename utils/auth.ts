import { IFacebookUser, IGitHubUser, IGoogleUser, ITelegramUser, TAuthProviderProp } from 'types';

export const googleSignIn = (profile: TAuthProviderProp): boolean => {
  const {
    email,
    name,
    picture,
    email_verified: isEmailVerified,
  } = profile as unknown as IGoogleUser;
  console.log('🚀 ~ file: auth.ts ~ line 10 ~ googleSignIn ~ email', email);
  return true;
};

export const githubSignIn = (profile: TAuthProviderProp): boolean => {
  const { email, bio, login, avatar_url, name, company, location } =
    profile as unknown as IGitHubUser;
  console.log('🚀 ~ file: auth.ts ~ line 16 ~ githubSignIn ~ login', login);
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
  console.log('🚀 ~ file: auth.ts ~ line 29 ~ facebookSignIn ~ email', email);
  return true;
};

export const telegramSignIn = (profile: ITelegramUser): boolean => {
  const { first_name, last_name, photo_url, username } = profile;
  console.log('🚀 ~ file: auth.ts ~ line 35 ~ telegramSignIn ~ username', username);
  return true;
};
