import { ArticlesTab, TutorialsTab } from 'frontends/articles';
import { ITabBody, ITabHeader } from 'types';

export const TAB_IDS = {
  articles: 'articles',
  tutorials: 'tutorials',
};

export const ARTICLES_TAB_MENUS: ITabHeader[] = [
  {
    name: 'Maqolalar',
    id: TAB_IDS.articles,
  },
  // {
  //   name: "To'plamlar",
  //   id: TAB_IDS.tutorials,
  // },
];

export const ARTICLES_TABS: ITabBody = {
  [TAB_IDS.articles]: ArticlesTab,
  [TAB_IDS.tutorials]: TutorialsTab,
};

export const DELETE_CONFIRMATION = 'tasdiqlash';
