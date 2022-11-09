import { Button } from 'components';
import { useAuth } from 'hooks';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useAppDispatch } from 'store';
import { openLoginModal, openRegisterModal } from 'store/states';
import { getDevice } from 'utils';
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

  const icons = useMemo(() => {
    return isAuthenticated ? NAVIGATION_ICONS : NAVIGATION_ICONS.filter((icon) => !icon.private);
  }, [isAuthenticated]);

  const isMobile = useMemo(() => getDevice().isMobile, []);

  const logOut = (): void => {
    unauthenticate();
  };

  const clickHandler = (href: string, authNeeded: boolean | undefined): void => {
    if (!isAuthenticated && authNeeded) dispatch(openLoginModal());
    else router.route !== href && router.push(href);
  };

  const registerClickHandler = (): void => {
    dispatch(openRegisterModal());
  };

  const loginClickHandler = (): void => {
    dispatch(openLoginModal());
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
                active={href === pathname}
              />
            );
          })}
        </div>
        <div className={classes['third-block']}>
          <div className={`${classes.logOut} pointer`} onClick={logOut}>
            {isAuthenticated && <LogOutIcon />}
            {/* {isMobile && !isAuthenticated && (
              <>
                <Button color='outline-dark' className='me-xs-1' onClick={registerClickHandler}>
                  Ro`yxatdan o`tish
                </Button>
                <Button onClick={loginClickHandler}>Kirish</Button>
              </>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};
