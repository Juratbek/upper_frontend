import { NotificationIcon, TelegramIcon, UserIcon } from 'components/icons';
import { INavigation } from 'components/organisms';

export const SETTINGS_NAVIGATION: INavigation[] = [
  {
    href: '/settings/profile',
    icon: UserIcon,
    text: 'Profil',
  },
  {
    href: '/settings/notifications',
    icon: NotificationIcon,
    text: 'Xabarlar',
  },
  {
    href: '/settings/telegram-channels',
    icon: TelegramIcon,
    text: 'Telegram Kanallari',
  },
  // {
  //   href: '/settings/social-media',
  //   text: 'Ijtimoiy tarmoqlar',
  // },
];
