import { TAuthProviderTypes, TIcon } from 'types';

import { AUTH_TYPES } from './LoginModal.constants';

type TAuth = typeof AUTH_TYPES.nextAuth | typeof AUTH_TYPES.telegram;

export interface ISocialMediaLoginOption {
  icon: TIcon;
  label: string;
  type: TAuth;
  id?: TAuthProviderTypes;
}
