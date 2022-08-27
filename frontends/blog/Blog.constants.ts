import { ITabBody, ITabHeader } from 'types';

import { AboutTab } from './AboutTab/AboutTab';
import { ArticlesTab } from './ArticlesTab/ArticlesTab';
import { FollowersTab } from './FollowersTab/FollowersTab';

const TAB_IDS = {
  articles: 'articles',
  followers: 'followers',
  about: 'about',
};

export const BLOG_TAB_MENUS: ITabHeader[] = [
  {
    name: 'Maqolalar',
    id: TAB_IDS.articles,
  },
  {
    name: 'Kuzatuvchilar',
    id: TAB_IDS.followers,
  },
  {
    name: 'Blog haqida',
    id: TAB_IDS.about,
  },
];

export const BLOG_TABS: ITabBody = {
  [TAB_IDS.articles]: ArticlesTab,
  [TAB_IDS.followers]: FollowersTab,
  [TAB_IDS.about]: AboutTab,
};
