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
  {
    icon: 'pen',
    href: '/write-article',
    isPrivateRoute: true,
    tooltip: 'Maqola yozish',
    loginModalTitle: <h2 className='mb-1 mt-0'>Maqola yozish uchun ro&apos;yxatdan o&apos;ting</h2>,
  },
];
