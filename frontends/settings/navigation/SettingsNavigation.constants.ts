import { INavigation } from 'components/organisms';
import { ICONS } from 'variables';

export const SETTINGS_NAVIGATION: INavigation[] = [
  {
    href: '/settings/profile',
    icon: ICONS.user,
    text: 'Profil',
  },
  {
    href: '/settings/notifications',
    icon: ICONS.notification,
    text: 'Xabarlar',
  },
  {
    href: '/settings/telegram-channels',
    icon: ICONS.telegram,
    text: 'Telegram Kanallari',
  },
  {
    href: '/settings/social-media',
    text: 'Ijtimoiy tarmoqlar',
  },
];
