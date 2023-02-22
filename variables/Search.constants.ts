import { ArticlesTab, BlogsTab } from 'frontends/search';
import { ITabBody, ITabHeader, TIcon } from 'types';

export const SEARCH_PAGE_TAB_IDS = {
  articles: 'articles',
  blogs: 'blogs',
};

export const SEARCH_TAB_MENUS: ITabHeader[] = [
  {
    name: 'Maqolalar',
    id: SEARCH_PAGE_TAB_IDS.articles,
  },
  {
    name: 'Bloglar',
    id: SEARCH_PAGE_TAB_IDS.blogs,
  },
];

export const SEARCH_TABS: ITabBody = {
  [SEARCH_PAGE_TAB_IDS.articles]: ArticlesTab,
  [SEARCH_PAGE_TAB_IDS.blogs]: BlogsTab,
};

export const SEARCH_PAGE_ARTICLE_ICONS: TIcon[] = ['save'];