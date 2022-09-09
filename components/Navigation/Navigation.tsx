import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';
import { useAppDispatch } from 'store';
import { openLoginModal } from 'store/states';
import { ICONS } from 'variables';

import { NAVIGATION_ICONS } from './Navigation.constants';
import classes from './Navigation.module.scss';

export const Navigation = (): JSX.Element => {
  const { status: authStatus } = useSession();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const clickHandler = (href: string, authNeeded: boolean | undefined): void => {
    if (authNeeded) dispatch(openLoginModal());
    else router.route !== href && router.push(href);
  };

  const icons = useMemo(() => {
    return authStatus === 'authenticated'
      ? NAVIGATION_ICONS
      : NAVIGATION_ICONS.filter((icon) => !icon.private);
  }, [authStatus]);

  return (
    <div className={classes.navigation}>
      <div className={`${classes.navigation} ${classes.positioned}`}>
        <span>logo</span>
        <div className={classes.icons}>
          {icons.map(({ icon, href, authNeeded, ...props }, index) => {
            const Icon = ICONS[icon];
            return (
              <div
                key={index}
                onClick={(): void => clickHandler(href, authNeeded)}
                className='pointer'
              >
                <a className={classes.icon}>
                  <Icon {...props} />
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
