import { ArticlesTab, BlogsTab } from 'frontends/search';
import { ITabBody, ITabHeader, TAction, TIcon } from 'types';

import { ACTION_TYPES } from './common';
import { ICON_TYPES } from './icons';

const TAB_IDS = {
  articles: 'articles',
  blogs: 'blogs',
};

export const SEARCH_TAB_MENUS: ITabHeader[] = [
  {
    name: 'Maqolalar',
    id: TAB_IDS.articles,
  },
  {
    name: 'Bloglar',
    id: TAB_IDS.blogs,
  },
];

export const SEARCH_TABS: ITabBody = {
  [TAB_IDS.articles]: ArticlesTab,
  [TAB_IDS.blogs]: BlogsTab,
};

export const SEARCH_PAGE_ARTICLE_ACTIONS: TAction[] = [
  ACTION_TYPES.notInterested,
  ACTION_TYPES.report,
];

export const SEARCH_PAGE_ARTICLE_ICONS: TIcon[] = [ICON_TYPES.save];
