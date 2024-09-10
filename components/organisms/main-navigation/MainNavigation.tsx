import { HomeIcon, NotificationIcon, WriteIcon } from 'components/icons';
import { FC, useMemo } from 'react';
import { useNotificationsCount } from 'store/clients/notification';

import { INavigation, Navigation } from '../navigation';

export const MainNavigation: FC = () => {
  const { data } = useNotificationsCount();
  const { count: notificationsCount } = data ?? {};

  const items = useMemo(
    (): INavigation[] => [
      {
        href: '',
        icon: HomeIcon,
        text: 'Bosh sahifa',
      },
      // {
      //   href: '/posts',
      //   icon: ICONS.home,
      //   text: 'Lenta',
      // },
      {
        href: '/notifications',
        icon: NotificationIcon,
        text: 'Xabarlar',
        badge: Number(notificationsCount) > 9 ? '9+' : notificationsCount,
      },
      {
        href: '/user/articles/draft',
        icon: WriteIcon,
        text: 'Maqolalaringiz',
      },
    ],
    [notificationsCount],
  );

  return <Navigation items={items} />;
};
