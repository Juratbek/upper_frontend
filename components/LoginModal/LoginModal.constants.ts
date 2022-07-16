import { AUTH_PROVIDER_TYPES, ICON_TYPES } from 'variables';

import { ISocialMediaLoginOption } from './LoginModal.types';

export const AUTH_TYPES = {
  telegram: 'telegram',
  nextAuth: 'next-auth',
};

export const SOCIAL_MEDIA_LOGIN_OPTIONS: ISocialMediaLoginOption[] = [
  {
    icon: ICON_TYPES.telegram,
    label: 'Telegram',
    type: AUTH_TYPES.telegram,
  },
  {
    icon: ICON_TYPES.google,
    label: 'Google',
    id: AUTH_PROVIDER_TYPES.google,
    type: AUTH_TYPES.nextAuth,
  },
  {
    icon: ICON_TYPES.facebook,
    label: 'Facebook',
    id: AUTH_PROVIDER_TYPES.facebook,
    type: AUTH_TYPES.nextAuth,
  },
  {
    icon: ICON_TYPES.github,
    label: 'GitHub',
    id: AUTH_PROVIDER_TYPES.github,
    type: AUTH_TYPES.nextAuth,
  },
];
