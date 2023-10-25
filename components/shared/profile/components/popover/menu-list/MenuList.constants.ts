import { ICONS } from 'variables';

import { IMenuListItem } from './MenuList.types';

export const MENU_LIST_ITEMS: IMenuListItem[] = [
  {
    icon: ICONS.write,
    text: 'Maqolalaringiz',
    href: '/user/articles',
  },
  {
    icon: ICONS.save,
    text: 'Saqlangan maqolalar',
    href: '/saved-articles',
  },
  {
    icon: ICONS.notification,
    text: 'Bildirishnomalar',
    href: '/notifications',
  },
  {
    icon: ICONS.settings,
    text: 'Sozlamalar',
    href: '/settings',
  },
  {
    icon: ICONS.loon,
    text: 'Qiyofa',
  },
];
