import { ArticlesTab } from 'frontends/articles';
import { ITabBody, ITabHeader } from 'types';

import { ARTICLE_STATUSES } from './article';

export const TAB_IDS = {
  published: 'published',
  draft: 'draft',
  saved: 'saved',
  deleted: 'deleted',
};

export const ARTICLES_TAB_MENUS: ITabHeader[] = [
  {
    name: 'Nashr qilingan',
    id: ARTICLE_STATUSES.PUBLISHED,
  },
  {
    name: 'Saqlangan',
    id: ARTICLE_STATUSES.SAVED,
  },
];

export const ARTICLES_TABS: ITabBody = {
  [ARTICLE_STATUSES.PUBLISHED]: ArticlesTab,
  [ARTICLE_STATUSES.SAVED]: ArticlesTab,
};
