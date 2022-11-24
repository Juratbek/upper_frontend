import { Button, LogoutModal, Tooltip } from 'components';
import { useAuth, useDevice } from 'hooks';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { useAppDispatch } from 'store';
import { useLazyGetBlogNotificationsCountQuery } from 'store/apis';
import { openLoginModal, openLogoutModal, openRegisterModal, openSidebar } from 'store/states';
import { ICONS, NOTIFICATION_STATUSES } from 'variables';

import { NavItem } from './components';
import { NAVIGATION_ICONS } from './Navigation.constants';
import classes from './Navigation.module.scss';

const LogOutIcon = ICONS.logOut;
const Logo = ICONS.logo;
const Burger = ICONS.burger;

export const Navigation = (): JSX.Element => {
  const { isAuthenticated } = useAuth();
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
          Ro`yxatdan o`tish
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
        <span className={classes.logo}>
          <Logo />
        </span>
        <div className={classes.icons}>
          {icons.map(({ icon, href, authNeeded, tooltip }) => {
            const Icon = ICONS[icon];
            return (
              <Tooltip tooltip={tooltip} invisible={isMobile} key={icon}>
                <NavItem
                  onClick={(): void => clickHandler(href, authNeeded)}
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
                <LogOutIcon />
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
