import { ICONS } from 'variables';

import { INavigation } from './Navigation.types';

export const NAVIGATION: INavigation[] = [
  {
    href: '',
    icon: ICONS.home,
    text: 'Bosh sahifa',
  },
  {
    href: '/posts',
    icon: ICONS.home,
    text: 'Lenta',
  },
  {
    href: '/notifications',
    icon: ICONS.notification,
    text: 'Xabarlar',
  },
  {
    href: '/search',
    icon: ICONS.search,
    text: 'Qidirish',
  },
];
