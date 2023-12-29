import { TIconComponent } from 'types';
import { ICONS } from 'variables';

export const menu: Array<{ icon: TIconComponent; text: string; path: string }> = [
  {
    icon: ICONS.write,
    text: 'Maqolalar',
    path: '/user/articles/draft',
  },
  {
    icon: ICONS.notification,
    text: 'Bildirishnomalar',
    path: '/notifications',
  },
  {
    icon: ICONS.settings,
    text: 'Sozlamalar',
    path: '/settings',
  },
  {
    icon: ICONS.moon,
    text: 'Qiyofa',
    path: '/settings/theme',
  },
];
