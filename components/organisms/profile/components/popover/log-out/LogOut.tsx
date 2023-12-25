import { useAuth } from 'hooks';
import { FC } from 'react';
import { ICONS } from 'variables';

import classes from './LogOut.module.scss';

const LogOut = ICONS.logOut;

export const LogOutBtn: FC<{ className?: string }> = ({ className }) => {
  const { unauthenticate } = useAuth();

  return (
    <div className={`${classes['log-out']} ${className}`} onClick={unauthenticate}>
      <span className={classes.icon}>
        <LogOut />
      </span>
      <p className={classes.text}>Profildan chiqish</p>
    </div>
  );
};
