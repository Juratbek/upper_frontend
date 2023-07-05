import { ITabBody, ITabHeader } from 'types';

import TutorialsTab from './TutorialsTab/TutorialsTab';

export const USER_TUTORIALS_TAB_IDS = {
  saved: 'saved',
  published: 'published',
};

export const USER_TUTORIALS_TAB_MENUS: ITabHeader[] = [
  {
    name: 'Saqlangan',
    id: USER_TUTORIALS_TAB_IDS.saved,
  },
  {
    name: 'Nashr qilingan',
    id: USER_TUTORIALS_TAB_IDS.published,
  },
];

export const USER_TUTORIALS_TABS: ITabBody = {
  [USER_TUTORIALS_TAB_IDS.saved]: TutorialsTab,
  [USER_TUTORIALS_TAB_IDS.published]: TutorialsTab,
};
