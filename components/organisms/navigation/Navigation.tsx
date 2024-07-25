import { WEB_APP_ROOT_DIR } from 'constants/common';
import { useRouter } from 'next/router';
import { FC } from 'react';

import { NavItem } from './components/item';
import { INavigation } from './Navigation.types';

export const Navigation: FC<{ items?: INavigation[] }> = ({ items = [] }) => {
  const { pathname } = useRouter();

  return items.map((item) => {
    const isActive = WEB_APP_ROOT_DIR + item.href === pathname;
    return <NavItem {...item} active={isActive} key={item.text} />;
  });
};
