import { ITabBody, ITabHeader } from 'types';

import PublishedArticlesTab from './PublishedArticlesTab/PublishedArticlesTab';
import SavedArticlesTab from './SavedArticlesTab/SavedArticlesTab';

export const TAB_IDS = {
  publishedArticles: 'publishedArticles',
  savedArticles: 'savedArticles',
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
];

export const ARTICLES_TABS: ITabBody = {
  [TAB_IDS.publishedArticles]: PublishedArticlesTab,
  [TAB_IDS.savedArticles]: SavedArticlesTab,
};

export const DELETE_CONFIRMATION = 'tasdiqlash';
