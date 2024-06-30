import { LinkedInIcon, TelegramIcon } from 'components/icons';

import { IFooterLink, IMediaIcon } from './Footer.types';

export const LINKS: IFooterLink[] = [
  // {
  //   text: "Qo'llab quvvatlash",
  //   url: '/sponsor',
  // },
  {
    text: 'Aloqa',
    url: '/contacts',
  },
  // {
  //   text: "Qo'llanma",
  //   url: '/docs/write-article_introduction_quick-start',
  // },
  {
    text: 'Jamoa',
    url: '/team',
  },
];

export const MEDIA_ICONS: IMediaIcon[] = [
  {
    icon: TelegramIcon,
    url: 'https://t.me/upperuz_bot',
  },
  {
    icon: LinkedInIcon,
    url: 'https://linkedin',
  },
];
