import { Button, Tooltip } from 'components';
import { useAuth, useDevice, useTheme } from 'hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { useAppDispatch } from 'store';
import { useLazyGetBlogNotificationsCountQuery } from 'store/apis';
import { openLoginModal, openSidebar } from 'store/states';
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
    return isAuthenticated ? NAVIGATION_ICONS : NAVIGATION_ICONS.filter((icon) => !icon.private);
  }, [isAuthenticated]);

  const clickHandler = (navigationIcon: INavigationIcon): void => {
    const { isPrivateRoute, href, loginModalTitle } = navigationIcon;
    if (!isAuthenticated && isPrivateRoute) dispatch(openLoginModal(loginModalTitle));
    else
      router.route !== `${WEB_APP_ROOT_DIR}${href}` && router.push(`${WEB_APP_ROOT_DIR}/${href}`);
  };

  const loginClickHandler = (): void => {
    dispatch(openLoginModal());
  };

  const openSidebarHandler = (): void => {
    dispatch(openSidebar());
  };

  const writeArticleHandler = (): void => {
    dispatch(openLoginModal("Maqola yozish uchun profilingizga kiring, yoki ro'yxatdan o'ting"));
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
    [isMobile, isAuthenticated],
  );

  return (
    <div className={classes.navigation}>
      <div
        className={`${classes.navigation} ${classes.positioned}`}
        style={{ backgroundColor: themeColors.bg }}
      >
        <Link href={WEB_APP_ROOT_DIR}>
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
          <Link href={`${WEB_APP_ROOT_DIR}/docs/write-article_introduction_quick-start`}>
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
