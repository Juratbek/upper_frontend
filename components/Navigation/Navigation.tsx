import { Button, Tooltip } from 'components';
import { useAuth, useDevice, useTheme } from 'hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { useAppDispatch } from 'store';
import { useLazyGetBlogNotificationsCountQuery } from 'store/apis';
import { openLoginModal, openRegisterModal, openSidebar } from 'store/states';
import { ICONS } from 'variables';

import { NavItem } from './components';
import { NAVIGATION_ICONS } from './Navigation.constants';
import classes from './Navigation.module.scss';
import { INavigationIcon } from './Navigation.types';

const HelpIcon = ICONS.help;
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
    isAuthenticated && fetchBlogNotificationsCount();
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
      <div
        className={`${classes.navigation} ${classes.positioned}`}
        style={{ backgroundColor: themeColors.bg }}
      >
        <Link href='/'>
          <a className={classes.logo}>
            <Logo color={themeColors.icon} />
          </a>
        </Link>
        <div className={classes.icons} style={{ backgroundColor: themeColors.bg }}>
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
          <Link href='/docs/write-article_introduction_quick-start'>
            <a className={`${classes.help} ${classes.icon} pointer`}>
              <HelpIcon color={themeColors.icon} />
            </a>
          </Link>
          {buttons}
          <div className={`${classes.burger} ${classes.icon}`} onClick={openSidebarHandler}>
            <Burger color={themeColors.icon} />
          </div>
        </div>
      </div>
    </div>
  );
};
