import { INavigationIcon } from './Navigation.types';

export const NAVIGATION_ICONS: INavigationIcon[] = [
  {
    icon: 'home',
    href: '/',
  },
  {
    icon: 'search',
    href: '/search',
  },
  {
    icon: 'user',
    href: '/profile',
    private: true,
  },
  {
    icon: 'notification',
    href: '/notifications',
    private: true,
  },
  {
    icon: 'menuList',
    href: '/articles',
    private: true,
  },
  {
    icon: 'pen',
    href: '/write-article',
    authNeeded: true,
  },
];
