import { useAppRouter, useAuth } from 'hooks';
import { FC } from 'react';
import { WEB_APP_ROOT_DIR } from 'variables';
import { ICONS } from 'variables/icons';

import classes from './LogOut.module.scss';

const LogOut = ICONS.logOut;

export const LogOutBtn: FC<{ className?: string }> = ({ className }) => {
  const { unauthenticate } = useAuth();
  const { pathname, push } = useAppRouter();

  const logOutHandler = () => {
    unauthenticate();
    const pagePath = pathname.replace(WEB_APP_ROOT_DIR, '');
    if (pagePath.startsWith('/user')) {
      push('/');
    }
  };

  return (
    <div className={`${classes['log-out']} ${className}`} onClick={logOutHandler}>
      <div className={classes.body}>
        <span className={classes.icon}>
          <LogOut />
        </span>
        <p className={classes.text}>Profildan chiqish</p>
      </div>
    </div>
  );
};
