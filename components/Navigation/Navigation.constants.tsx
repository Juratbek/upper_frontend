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
    private: true,
    tooltip: 'Profilingiz',
  },
  {
    icon: 'notification',
    href: '/notifications',
    private: true,
    tooltip: 'Habarlar',
  },
  {
    icon: 'menuList',
    href: '/articles',
    private: true,
    tooltip: 'Maqolalaringiz',
  },
];
