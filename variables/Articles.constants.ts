import { ArticlesTab } from 'frontends/articles';
import { ITabBody, ITabHeader } from 'types';

export const TAB_IDS = {
  published: 'published',
  draft: 'draft',
  saved: 'saved',
  deleted: 'deleted',
};

export const ARTICLES_TAB_MENUS: ITabHeader[] = [
  {
    name: 'Nashr etilgan',
    id: TAB_IDS.published,
  },
  {
    name: 'Qoralama',
    id: TAB_IDS.draft,
  },
  {
    name: 'Saqlangan',
    id: TAB_IDS.saved,
  },
  {
    name: 'O`chirilgan',
    id: TAB_IDS.deleted,
  },
];

export const ARTICLES_TABS: ITabBody = {
  [TAB_IDS.published]: ArticlesTab,
  [TAB_IDS.draft]: ArticlesTab,
  [TAB_IDS.saved]: ArticlesTab,
  [TAB_IDS.deleted]: ArticlesTab,
};
