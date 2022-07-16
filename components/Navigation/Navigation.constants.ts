import { ICON_TYPES } from 'variables/icons';

import { INavigationIcon } from './Navigation.types';

export const NAVIGATION_ICONS: INavigationIcon[] = [
  {
    icon: ICON_TYPES.home,
    href: '/',
  },
  {
    icon: ICON_TYPES.search,
    href: '/search',
  },
  {
    icon: ICON_TYPES.user,
    href: '/profile',
  },
  {
    icon: ICON_TYPES.notification,
    href: '/notifications',
  },
  {
    icon: ICON_TYPES.menuList,
    href: '/articles',
  },
  {
    icon: ICON_TYPES.pen,
    href: '/write-article',
  },
];
