import { ITabBody, ITabHeader } from 'types';

import PublishedArticlesTab from './PublishedArticlesTab/PublishedArticlesTab';
import SavedArticlesTab from './SavedArticlesTab/SavedArticlesTab';
import TutorialsTab from './TutorialsTab/TutorialsTab';

export const TAB_IDS = {
  publishedArticles: 'publishedArticles',
  savedArticles: 'savedArticles',
  tutorials: 'tutorials',
};

export const ARTICLES_TAB_MENUS: ITabHeader[] = [
  {
    name: 'Saqlangan',
    id: TAB_IDS.savedArticles,
  },
  {
    name: 'Nashr qilingan',
    id: TAB_IDS.publishedArticles,
  },
  // {
  //   name: "To'plamlar",
  //   id: TAB_IDS.tutorials,
  // },
];

export const ARTICLES_TABS: ITabBody = {
  [TAB_IDS.publishedArticles]: PublishedArticlesTab,
  [TAB_IDS.savedArticles]: SavedArticlesTab,
  [TAB_IDS.tutorials]: TutorialsTab,
};

export const DELETE_CONFIRMATION = 'tasdiqlash';
