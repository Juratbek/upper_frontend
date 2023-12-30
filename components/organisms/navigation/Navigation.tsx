import { Divider } from 'components/lib';
import { useRouter } from 'next/router';
import { FC, Fragment } from 'react';
import { WEB_APP_ROOT_DIR } from 'variables';

import { NavItem } from './components/item';
import { INavigation } from './Navigation.types';

export const Navigation: FC<{ items?: INavigation[] }> = ({ items = [] }) => {
  const { pathname } = useRouter();

  return (
    <>
      {items.map((item, index) => {
        const isActive = WEB_APP_ROOT_DIR + item.href === pathname;
        return (
          <Fragment key={item.text}>
            <NavItem {...item} active={isActive} key={item.text} />
            {index + 1 !== items.length && <Divider color='tertiary' my={4} />}
          </Fragment>
        );
      })}
    </>
  );
};
