import { ITabBody, ITabHeader } from 'types';

import { ForYouTab } from './ForYouTab/ForYouTab';
import { TopTab } from './TopTab/TopTab';

export const HOME_TAB_IDS = {
  forYou: 'forYou',
  top: 'top',
};

export const HOME_TAB_MENUS: ITabHeader[] = [
  {
    name: 'Siz uchun',
    id: HOME_TAB_IDS.forYou,
    private: true,
    defaultSelected: true,
  },
  {
    name: 'Top',
    id: HOME_TAB_IDS.top,
    defaultSelected: false,
  },
];

export const HOME_TABS: ITabBody = {
  [HOME_TAB_IDS.forYou]: ForYouTab,
  [HOME_TAB_IDS.top]: TopTab,
};
