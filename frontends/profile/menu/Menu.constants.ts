import { MoonIcon, NotificationIcon, SettingsIcon, WriteIcon } from 'components/icons';
import { TIconComponent } from 'components/icons';

export const menu: Array<{ icon: TIconComponent; text: string; path: string }> = [
  {
    icon: WriteIcon,
    text: 'Maqolalar',
    path: '/user/articles/draft',
  },
  {
    icon: NotificationIcon,
    text: 'Xabarlar',
    path: '/notifications',
  },
  {
    icon: SettingsIcon,
    text: 'Sozlamalar',
    path: '/settings',
  },
  {
    icon: MoonIcon,
    text: 'Qiyofa',
    path: '/settings/theme',
  },
];
