import { ArticlesTab } from 'frontends/articles';
import { ITabBody, ITabHeader } from 'types';

const TAB_IDS = {
  published: 'published',
  draft: 'draft',
  saved: 'saved',
  others: 'deleted',
};

export const ARTICLES_TAB_MENUS: ITabHeader[] = [
  {
    name: 'Chop etilgan',
    id: TAB_IDS.published,
  },
  {
    name: 'Qoralama',
    id: TAB_IDS.draft,
  },
  {
    name: 'Saqlanganlar',
    id: TAB_IDS.saved,
  },
  {
    name: 'Boshqalar',
    id: TAB_IDS.others,
  },
];

export const ARTICLES_TABS: ITabBody = {
  [TAB_IDS.published]: ArticlesTab,
  [TAB_IDS.draft]: ArticlesTab,
  [TAB_IDS.saved]: ArticlesTab,
  [TAB_IDS.others]: ArticlesTab,
};
