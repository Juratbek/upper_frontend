import { LogOutIcon } from 'components/icons';
import { WEB_APP_ROOT_DIR } from 'constants/common';
import { useAppRouter, useAuth } from 'hooks';
import { FC } from 'react';

import classes from './LogOut.module.scss';

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
          <LogOutIcon />
        </span>
        <p className={classes.text}>Profildan chiqish</p>
      </div>
    </div>
  );
};
