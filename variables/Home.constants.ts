import { ArticlesTab, BlogsTab } from 'frontends/home';
import { ITabHeader } from 'types';

const TAB_IDS = {
  articles: 'articles',
  blogs: 'blogs',
};

export const HOME_TAB_MENUS: ITabHeader[] = [
  {
    name: 'Maqolalar',
    id: TAB_IDS.articles,
  },
  {
    name: 'Bloglar',
    id: TAB_IDS.blogs,
  },
];

export const HOME_TABS = [
  {
    Tab: ArticlesTab,
    id: TAB_IDS.articles,
  },
  {
    Tab: BlogsTab,
    id: TAB_IDS.blogs,
  },
];
