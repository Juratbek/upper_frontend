import { useAuth } from 'hooks';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useAppDispatch } from 'store';
import { openLoginModal } from 'store/states';
import { ICONS } from 'variables';

import { NAVIGATION_ICONS } from './Navigation.constants';
import classes from './Navigation.module.scss';

const LogOutIcon = ICONS.logOut;
const Logo = ICONS.logo;

export const Navigation = (): JSX.Element => {
  const { isAuthenticated, unauthenticate } = useAuth();
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
              <div
                key={index}
                onClick={(): void => clickHandler(href, authNeeded)}
                className='pointer'
              >
                <a className={classes.icon}>
                  <Icon />
                </a>
              </div>
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
