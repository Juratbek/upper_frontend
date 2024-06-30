import { HomeIcon, NotificationIcon, UserIcon, WriteIcon } from 'components/icons';

import { IButton } from './BottomNavigation.types';

export const leftButtons: IButton[] = [
  {
    icon: HomeIcon,
    path: '/',
    label: 'Asosiy',
  },
  {
    icon: WriteIcon,
    path: '/user/articles/draft',
    label: 'Maqolalaringiz',
  },
];

export const rightButtons: IButton[] = [
  {
    icon: NotificationIcon,
    path: '/notifications',
    label: 'Xabarlar',
  },
  {
    icon: UserIcon,
    path: '/profile',
    label: 'Profil',
  },
];
