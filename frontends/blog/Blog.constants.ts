import { ITabBody, ITabHeader } from 'types';

import { ArticlesTab } from './ArticlesTab/ArticlesTab';

const TAB_IDS = {
  articles: 'articles',
  followers: 'followers',
  top: 'top',
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
    name: 'Top',
    id: TAB_IDS.top,
  },
];

export const BLOG_TABS: ITabBody = {
  [TAB_IDS.articles]: ArticlesTab,
  [TAB_IDS.followers]: ArticlesTab,
  [TAB_IDS.top]: ArticlesTab,
};
