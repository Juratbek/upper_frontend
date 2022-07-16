import { FollowersTab, SettingsTab, StatisticsTab } from 'frontends/profile';
import { ITabBody, ITabHeader } from 'types';

const TAB_IDS = {
  followers: 'followers',
  statistics: 'statistics',
  settings: 'settings',
};

export const PROFILE_TAB_MENUS: ITabHeader[] = [
  {
    name: 'Statistikalar',
    id: TAB_IDS.statistics,
  },
  {
    name: 'Kuzatuvchilar',
    id: TAB_IDS.followers,
  },
  {
    name: 'Sozlamalar',
    id: TAB_IDS.settings,
  },
];

export const PROFILE_TABS: ITabBody = {
  [TAB_IDS.statistics]: StatisticsTab,
  [TAB_IDS.followers]: FollowersTab,
  [TAB_IDS.settings]: SettingsTab,
};
