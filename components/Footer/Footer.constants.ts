import { ICONS } from 'variables';

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
  {
    text: "Qo'llanma",
    url: '/docs/write-article_introduction_quick-start',
  },
  {
    text: 'Biz haqimizda',
    url: '/about-us',
  },
  {
    text: 'Jamoa',
    url: '/team',
  },
];

export const MEDIA_ICONS: IMediaIcon[] = [
  {
    icon: ICONS.telegram,
    url: 'https://t.me/upperuz_bot',
  },
  {
    icon: ICONS.linkedIn,
    url: 'https://linkedin',
  },
];
