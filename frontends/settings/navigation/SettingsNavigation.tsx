import { Navigation } from 'components/shared';
import { FC } from 'react';

import { SETTINGS_NAVIGATION } from './SettingsNavigation.constants';

export const SettingsNavigation: FC = () => {
  return <Navigation items={SETTINGS_NAVIGATION} />;
};
