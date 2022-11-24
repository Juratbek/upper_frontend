import { ITabBody, ITabHeader } from 'types';

import { ForYouTab } from './ForYouTab/ForYouTab';
import { TopTab } from './TopTab/TopTab';

const TAB_IDS = {
  forYou: 'forYou',
  top: 'top',
};

export const HOME_TAB_MENUS: ITabHeader[] = [
  {
    name: 'Siz uchun',
    id: TAB_IDS.forYou,
    private: true,
  },
  {
    name: 'Top',
    id: TAB_IDS.top,
  },
];

export const HOME_TABS: ITabBody = {
  [TAB_IDS.forYou]: ForYouTab,
  [TAB_IDS.top]: TopTab,
};
