import { Navigation } from 'components/shared';
import { FC } from 'react';

import { USER_ARTICLES_NAVIGATION } from './UserArticlesNavigation.constants';

export const UserArticlesNavigation: FC = () => {
  return <Navigation items={USER_ARTICLES_NAVIGATION} />;
};
