import { MoonIcon, NotificationIcon, SettingsIcon, WriteIcon } from 'components/icons';

import { ThemeMenu } from '../theme-menu/ThemeMenu';
import { IMenuListItem } from './MenuList.types';

export const MENU_LIST_ITEMS: IMenuListItem[] = [
  {
    icon: WriteIcon,
    text: 'Maqolalaringiz',
    href: '/user/articles/draft',
  },
  // {
  //   icon: ICONS.save,
  //   text: 'Saqlangan maqolalar',
  //   href: '/saved-articles',
  // },
  {
    icon: NotificationIcon,
    text: 'Xabarlar',
    href: '/notifications',
  },
  {
    icon: SettingsIcon,
    text: 'Sozlamalar',
    href: '/settings/profile',
  },
  {
    icon: MoonIcon,
    text: 'Qiyofa',
    menu: ThemeMenu,
  },
];
