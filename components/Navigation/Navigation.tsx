import { useAuth } from 'hooks';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useAppDispatch } from 'store';
import { openLoginModal } from 'store/states';
import { ICONS } from 'variables';

import { NavItem } from './components';
import { NAVIGATION_ICONS } from './Navigation.constants';
import classes from './Navigation.module.scss';

const LogOutIcon = ICONS.logOut;
const Logo = ICONS.logo;

export const Navigation = (): JSX.Element => {
  const { isAuthenticated, unauthenticate } = useAuth();
  const { pathname } = useRouter();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const clickHandler = (href: string, authNeeded: boolean | undefined): void => {
    if (!isAuthenticated && authNeeded) dispatch(openLoginModal());
    else router.route !== href && router.push(href);
  };

  const icons = useMemo(() => {
    return isAuthenticated ? NAVIGATION_ICONS : NAVIGATION_ICONS.filter((icon) => !icon.private);
  }, [isAuthenticated]);

  const logOut = (): void => {
    unauthenticate();
  };

  return (
    <div className={classes.navigation}>
      <div className={`${classes.navigation} ${classes.positioned}`}>
        <span className={classes.logo}>
          <Logo />
        </span>
        <div className={classes.icons}>
          {icons.map(({ icon, href, authNeeded }, index) => {
            const Icon = ICONS[icon];
            return (
              <NavItem
                onClick={(): void => clickHandler(href, authNeeded)}
                key={index}
                icon={Icon}
                className='pointer'
                isActive={href === pathname}
              />
            );
          })}
        </div>
        <div className={`${classes.icon} pointer`} onClick={logOut}>
          {isAuthenticated && <LogOutIcon />}
        </div>
      </div>
    </div>
  );
};
