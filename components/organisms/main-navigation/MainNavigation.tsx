import { FC, useMemo } from 'react';
import { useNotificationsCount } from 'store/clients/notification';
import { ICONS } from 'variables/icons';

import { INavigation, Navigation } from '../navigation';

export const MainNavigation: FC = () => {
  const { data: notificationsCount } = useNotificationsCount();

  const items = useMemo(
    (): INavigation[] => [
      {
        href: '',
        icon: ICONS.home,
        text: 'Bosh sahifa',
      },
      {
        href: '/posts',
        icon: ICONS.home,
        text: 'Lenta',
      },
      {
        href: '/notifications',
        icon: ICONS.notification,
        text: 'Xabarlar',
        badge: notificationsCount,
      },
      {
        href: '/user/articles/draft',
        icon: ICONS.write,
        text: 'Maqolalaringiz',
      },
    ],
    [notificationsCount],
  );

  return <Navigation items={items} />;
};
