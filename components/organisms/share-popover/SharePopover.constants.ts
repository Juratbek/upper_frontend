import { LinkedInIcon, TelegramIcon } from 'components/icons';

import { IMediaIcon } from './Footer.types';

export const MEDIA_ICONS: IMediaIcon[] = [
  {
    icon: TelegramIcon,
    url: 'https://t.me/share/url?url=',
    name: 'Telegram',
  },
  {
    icon: LinkedInIcon,
    url: 'https://linkedin.com/sharing/share-offsite/?url=',
    name: 'LinkedIn',
  },
];
