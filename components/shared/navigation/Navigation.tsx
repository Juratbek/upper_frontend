import { Divider } from 'components/lib';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { WEB_APP_ROOT_DIR } from 'variables';

import { NavItem } from './components/item';
import { NAVIGATION } from './Navigation.constants';

export const Navigation = (): JSX.Element => {
  const { pathname } = useRouter();

  return (
    <>
      {NAVIGATION.map((item, index) => {
        const isActive = WEB_APP_ROOT_DIR + item.href === pathname;
        return (
          <Fragment key={item.text}>
            <NavItem
              active={isActive}
              key={item.text}
              href={item.href}
              icon={item.icon}
              text={item.text}
            />
            {index + 1 !== NAVIGATION.length && <Divider color='tertiary' my={4} />}
          </Fragment>
        );
      })}
    </>
  );
};
