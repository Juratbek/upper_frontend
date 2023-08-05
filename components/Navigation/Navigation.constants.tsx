import { INavigationIcon } from './Navigation.types';

export const NAVIGATION_ICONS: INavigationIcon[] = [
  {
    icon: 'home',
    href: '',
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
    isShownAfterAuthentication: true,
  },
  {
    icon: 'notification',
    href: '/notifications',
    isPrivateRoute: true,
    tooltip: 'Xabarlar',
    isShownAfterAuthentication: true,
  },
  {
    icon: 'pen',
    href: '/articles',
    isPrivateRoute: true,
    tooltip: 'Maqolalaringiz',
    message: 'Maqola yozish uchun shaxsiy profilingizga kiring',
  },
  // {
  //   icon: 'steps',
  //   href: '/user/tutorials',
  //   tooltip: "To'plamlar",
  // },
];
