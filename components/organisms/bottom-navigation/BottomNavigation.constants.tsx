import { ICONS } from 'variables/icons';

import { IButton } from './BottomNavigation.types';

export const leftButtons: IButton[] = [
  {
    icon: ICONS.home,
    path: '/',
    label: 'Asosiy',
  },
  {
    icon: ICONS.write,
    path: '/user/articles/draft',
    label: 'Maqolalaringiz',
  },
];

export const rightButtons: IButton[] = [
  {
    icon: ICONS.notification,
    path: '/notifications',
    label: 'Xabarlar',
  },
  {
    icon: ICONS.user,
    path: '/profile',
    label: 'Profil',
  },
];
