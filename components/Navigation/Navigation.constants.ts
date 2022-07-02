import { HomeIcon, MenuListIcon, NotificationIcon, UserIcon, WriteArticleIcon } from 'assets';

import { INavigationIcon } from './Navigation.types';

export const NAVIGATION_ICONS: INavigationIcon[] = [
  {
    Icon: HomeIcon,
    href: '/',
  },
  {
    Icon: UserIcon,
    href: 'profile',
  },
  {
    Icon: NotificationIcon,
    href: 'notifications',
  },
  {
    Icon: MenuListIcon,
    href: 'articles',
  },
  {
    Icon: WriteArticleIcon,
    href: 'write_article',
  },
];
