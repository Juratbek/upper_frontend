import { ITabHeader } from 'types';

export const BLOG_TAB_IDS = {
  articles: 'articles',
  followers: 'followers',
  about: 'about',
};

export const BLOG_TAB_MENUS: ITabHeader[] = [
  {
    name: 'Maqolalar',
    id: BLOG_TAB_IDS.articles,
  },
  {
    name: 'Obunachilar',
    id: BLOG_TAB_IDS.followers,
  },
  {
    name: 'Blog haqida',
    id: BLOG_TAB_IDS.about,
  },
];
