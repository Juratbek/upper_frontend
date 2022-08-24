import { Profile } from 'next-auth';
import { BuiltInProviderType } from 'next-auth/providers';
import { ClientSafeProvider, LiteralUnion } from 'next-auth/react';
import { AUTH_PROVIDER_TYPES } from 'variables';

type TGitHubUserType = 'User';

export type TAuthProviderProp = Profile & Record<string, unknown>;

export type TAuthProviderTypes =
  | typeof AUTH_PROVIDER_TYPES.google
  | typeof AUTH_PROVIDER_TYPES.facebook
  | typeof AUTH_PROVIDER_TYPES.github;

export type TAuthProviders = Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>;

export interface IAuthProvider {
  [name: string]: (profile: TAuthProviderProp) => boolean;
}

export interface IGitHubUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: TGitHubUserType;
  site_admin: boolean;
  name?: string;
  company?: string;
  blog: string;
  location?: string;
  email?: string;
  hireable?: boolean;
  bio?: string;
  twitter_username?: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export interface IGoogleUser {
  iss: string;
  azp: string;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  at_hash: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  locale: string;
  iat: number;
  exp: number;
}

export interface IFacebookUser {
  id: string;
  name: string;
  email: string;
  picture: {
    data: {
      height: number;
      is_silhouette: boolean;
      url: string;
      width: number;
    };
  };
}

export interface ITelegramUser {
  auth_date: number;
  first_name: string;
  last_name?: string;
  photo_url: string;
  hash: string;
  id: number;
  username: string;
}
