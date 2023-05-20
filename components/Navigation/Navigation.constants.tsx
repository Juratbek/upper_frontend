import { INavigationIcon } from './Navigation.types';

export const NAVIGATION_ICONS: INavigationIcon[] = [
  {
    icon: 'home',
    href: '/',
    tooltip: 'Asosiy sahifa',
  },
  {
    icon: 'search',
    href: '/search',
    tooltip: 'Qidirish',
  },
  {
    icon: 'user',
    href: '/profile',
    isPrivateRoute: true,
    tooltip: 'Profilingiz',
  },
  {
    icon: 'notification',
    href: '/notifications',
    isPrivateRoute: true,
    tooltip: 'Habarlar',
  },
  {
    icon: 'menuList',
    href: '/articles',
    isPrivateRoute: true,
    tooltip: 'Maqolalaringiz',
  },
];
