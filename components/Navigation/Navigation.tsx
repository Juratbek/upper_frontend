import { Button, LogoutModal, Tooltip } from 'components';
import { useAuth, useDevice, useTheme } from 'hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { useAppDispatch } from 'store';
import { useLazyGetBlogNotificationsCountQuery } from 'store/apis';
import { openLoginModal, openLogoutModal, openRegisterModal, openSidebar } from 'store/states';
import { ICONS, NOTIFICATION_STATUSES } from 'variables';

import { NavItem } from './components';
import { NAVIGATION_ICONS } from './Navigation.constants';
import classes from './Navigation.module.scss';
import { INavigationIcon } from './Navigation.types';

const LogOutIcon = ICONS.logOut;
const Logo = ICONS.logo;
const Burger = ICONS.burger;

export const Navigation = (): JSX.Element => {
  const { isAuthenticated } = useAuth();
  const { themeColors } = useTheme();
  const [fetchBlogNotificationsCount, fetchBlogNotificationsCountRes] =
    useLazyGetBlogNotificationsCountQuery();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isMobile } = useDevice();

  const icons = useMemo(() => {
    return isAuthenticated ? NAVIGATION_ICONS : NAVIGATION_ICONS.filter((icon) => !icon.private);
  }, [isAuthenticated]);

  const logOut = (): void => {
    dispatch(openLogoutModal());
  };

  const clickHandler = (navigationIcon: INavigationIcon): void => {
    const { isPrivateRoute, href, loginModalTitle } = navigationIcon;
    if (!isAuthenticated && isPrivateRoute) dispatch(openLoginModal(loginModalTitle));
    else router.route !== href && router.push(href);
  };

  const registerClickHandler = (): void => {
    dispatch(openRegisterModal());
  };

  const loginClickHandler = (): void => {
    dispatch(openLoginModal());
  };

  const openSidebarHandler = (): void => {
    dispatch(openSidebar());
  };

  useEffect(() => {
    isAuthenticated && fetchBlogNotificationsCount(NOTIFICATION_STATUSES.UNREAD);
  }, [isAuthenticated]);

  const buttons = useMemo(
    () => (
      <div className={isMobile && !isAuthenticated ? 'd-flex align-items-center' : 'd-none'}>
        <Button color='outline-dark' className='me-xs-1' onClick={registerClickHandler}>
          Ro&apos;yxatdan o&apos;tish
        </Button>
        <Button onClick={loginClickHandler}>Kirish</Button>
      </div>
    ),
    [isMobile, isAuthenticated],
  );

  return (
    <div className={classes.navigation}>
      <LogoutModal />
      <div className={`${classes.navigation} ${classes.positioned}`}>
        <Link href='/'>
          <a className={classes.logo}>
            <Logo color={themeColors.icon} />
          </a>
        </Link>
        <div className={classes.icons}>
          {icons.map((navigationIcon) => {
            const { icon, tooltip, href } = navigationIcon;
            const Icon = ICONS[icon];
            return (
              <Tooltip tooltip={tooltip} invisible={isMobile} key={icon}>
                <NavItem
                  onClick={(): void => clickHandler(navigationIcon)}
                  icon={Icon}
                  className='pointer'
                  active={href === router.pathname}
                  badge={icon === 'notification' && fetchBlogNotificationsCountRes.data}
                />
              </Tooltip>
            );
          })}
        </div>
        <div className={classes['third-block']}>
          <div className={`${classes.logOut} ${classes.icon} pointer`} onClick={logOut}>
            {isAuthenticated && (
              <Tooltip tooltip='Profildan chiqish' invisible={isMobile}>
                <LogOutIcon color={themeColors.icon} />
              </Tooltip>
            )}
          </div>
          {buttons}
          <div className={`${classes.burger} ${classes.icon}`} onClick={openSidebarHandler}>
            <Burger />
          </div>
        </div>
      </div>
    </div>
  );
};
