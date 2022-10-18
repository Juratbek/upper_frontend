import { useAuth } from 'hooks';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useAppDispatch } from 'store';
import { openLoginModal } from 'store/states';
import { ICONS } from 'variables';

import { NAVIGATION_ICONS } from './Navigation.constants';
import classes from './Navigation.module.scss';

export const Navigation = (): JSX.Element => {
  const { isAuthenticated } = useAuth();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const clickHandler = (href: string, authNeeded: boolean | undefined): void => {
    if (!isAuthenticated && authNeeded) dispatch(openLoginModal());
    else router.route !== href && router.push(href);
  };

  const icons = useMemo(() => {
    return isAuthenticated ? NAVIGATION_ICONS : NAVIGATION_ICONS.filter((icon) => !icon.private);
  }, [isAuthenticated]);

  return (
    <div className={classes.navigation}>
      <div className={`${classes.navigation} ${classes.positioned}`}>
        <span>logo</span>
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
        <div />
      </div>
    </div>
  );
};
