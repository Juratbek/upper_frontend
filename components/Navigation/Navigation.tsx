import { Button, Tooltip } from 'components';
import { useAuth, useDevice, useTheme } from 'hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { useAppDispatch } from 'store';
import { useLazyGetBlogNotificationsCountQuery } from 'store/apis';
import { openAuthModal, openSidebar } from 'store/states';
import { ICONS, WEB_APP_ROOT_DIR } from 'variables';

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
    return isAuthenticated
      ? NAVIGATION_ICONS
      : NAVIGATION_ICONS.filter((icon) => !icon.isShownAfterAuthentication);
  }, [isAuthenticated]);

  const clickHandler = (navigationIcon: INavigationIcon): void => {
    const { href, message, isPrivateRoute } = navigationIcon;
    if (!isAuthenticated && isPrivateRoute) {
      dispatch(openAuthModal(message));
    } else {
      router.route !== `${WEB_APP_ROOT_DIR}${href}` && router.push(`${WEB_APP_ROOT_DIR}/${href}`);
    }
  };

  const loginClickHandler = (): void => {
    dispatch(openAuthModal());
  };

  const openSidebarHandler = (): void => {
    dispatch(openSidebar());
  };

  const writeArticleHandler = (): void => {
    dispatch(openAuthModal("Maqola yozish uchun profilingizga kiring, yoki ro'yxatdan o'ting"));
  };
  useEffect(() => {
    isAuthenticated && fetchBlogNotificationsCount();
  }, [isAuthenticated]);

  const buttons = useMemo(
    () => (
      <div className={isMobile && !isAuthenticated ? 'd-flex align-items-center' : 'd-none'}>
        <Button color='outline-dark' className='me-xs-1' onClick={writeArticleHandler}>
          Maqola yozish
        </Button>
        <Button onClick={loginClickHandler}>Kirish</Button>
      </div>
    ),
    [isMobile, isAuthenticated, writeArticleHandler],
  );

  return (
    <div className={classes.navigation}>
      <div
        className={`${classes.navigation} ${classes.positioned}`}
        style={{ backgroundColor: themeColors.bg }}
      >
        <Link href={WEB_APP_ROOT_DIR} className={classes.logo}>
          <Logo color={themeColors.icon} />
        </Link>
        <div className={classes.icons} style={{ backgroundColor: themeColors.bg }}>
          {icons.map((navigationIcon) => {
            const { icon, tooltip, href } = navigationIcon;
            const Icon = ICONS[icon];
            const isNavActive = WEB_APP_ROOT_DIR + href === router.pathname;
            const notificationsCount =
              icon === 'notification' && fetchBlogNotificationsCountRes.data;
            return (
              <Tooltip tooltip={tooltip} invisible={isMobile} key={icon}>
                {isAuthenticated ? (
                  <Link href={`${WEB_APP_ROOT_DIR}/${href}`}>
                    <NavItem
                      icon={Icon}
                      className='pointer'
                      active={isNavActive}
                      badge={notificationsCount}
                    />
                  </Link>
                ) : (
                  <NavItem
                    onClick={(): void => clickHandler(navigationIcon)}
                    icon={Icon}
                    className='pointer'
                    active={isNavActive}
                    badge={notificationsCount}
                  />
                )}
              </Tooltip>
            );
          })}
        </div>
        <div className={classes['third-block']}>
          <Link
            href={`${WEB_APP_ROOT_DIR}/docs/write-article_introduction_quick-start`}
            className={`${classes.help} ${classes.icon} pointer`}
          >
            <HelpIcon color={themeColors.icon} />
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
