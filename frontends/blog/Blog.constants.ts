import { ITabBody, ITabHeader } from 'types';

import { AboutTab } from './AboutTab/AboutTab';
import { ArticlesTab } from './ArticlesTab/ArticlesTab';
import { FollowersTab } from './FollowersTab/FollowersTab';

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
    name: 'Kuzatuvchilar',
    id: BLOG_TAB_IDS.followers,
  },
  {
    name: 'Blog haqida',
    id: BLOG_TAB_IDS.about,
  },
];

export const BLOG_TABS: ITabBody = {
  [BLOG_TAB_IDS.articles]: ArticlesTab,
  [BLOG_TAB_IDS.followers]: FollowersTab,
  [BLOG_TAB_IDS.about]: AboutTab,
};
