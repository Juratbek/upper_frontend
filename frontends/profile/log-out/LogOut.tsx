import { useAuth } from 'hooks';
import { FC } from 'react';
import { ICONS } from 'variables';

import classes from './LogOut.module.scss';

const LogOutIcon = ICONS.logOut;

export const LogOut: FC<{ className: string }> = ({ className }) => {
  const { unauthenticate } = useAuth();

  return (
    <button className={`${classes.root} ${className}`} onClick={unauthenticate}>
      <div className={classes['icon-container']}>
        <LogOutIcon width={24} height={24} />
      </div>
      <p className={classes.text}>Profildan chiqish</p>
    </button>
  );
};
