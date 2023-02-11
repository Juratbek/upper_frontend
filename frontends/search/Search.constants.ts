import { ITabBody, ITabHeader, TIcon } from 'types';

import { ArticlesTab, BlogsTab, TutorialsTab } from './components';

export const SEARCH_PAGE_TAB_IDS = {
  articles: 'articles',
  tutorials: 'tutorials',
  blogs: 'blogs',
};

export const SEARCH_TAB_MENUS: ITabHeader[] = [
  {
    name: 'Maqolalar',
    id: SEARCH_PAGE_TAB_IDS.articles,
  },
  {
    name: "To'plamlar",
    id: SEARCH_PAGE_TAB_IDS.tutorials,
  },
  {
    name: 'Bloglar',
    id: SEARCH_PAGE_TAB_IDS.blogs,
  },
];

export const SEARCH_TABS: ITabBody = {
  [SEARCH_PAGE_TAB_IDS.articles]: ArticlesTab,
  [SEARCH_PAGE_TAB_IDS.blogs]: BlogsTab,
  [SEARCH_PAGE_TAB_IDS.tutorials]: TutorialsTab,
};

export const SEARCH_PAGE_ARTICLE_ICONS: TIcon[] = ['save'];
