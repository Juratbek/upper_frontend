import { FollowersTab, SettingsTab, StatisticsTab } from 'frontends/profile';
import { ITabBody, ITabHeader } from 'types';

export const PROFILE_TAB_IDS = {
  followers: 'followers',
  statistics: 'statistics',
  settings: 'settings',
};

export const PROFILE_TAB_MENUS: ITabHeader[] = [
  {
    name: 'Statistikalar',
    id: PROFILE_TAB_IDS.statistics,
  },
  {
    name: 'Kuzatuvchilar',
    id: PROFILE_TAB_IDS.followers,
  },
  {
    name: 'Sozlamalar',
    id: PROFILE_TAB_IDS.settings,
  },
];

export const PROFILE_TABS: ITabBody = {
  [PROFILE_TAB_IDS.statistics]: StatisticsTab,
  [PROFILE_TAB_IDS.followers]: FollowersTab,
  [PROFILE_TAB_IDS.settings]: SettingsTab,
};
