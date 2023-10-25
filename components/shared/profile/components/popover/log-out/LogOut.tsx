import { useAuth } from 'hooks';
import { ICONS } from 'variables';

import classes from './LogOut.module.scss';

const LogOut = ICONS.logOut;

export const LogOutBtn = (): JSX.Element => {
  const { unauthenticate } = useAuth();

  return (
    <div className={classes['log-out']} onClick={unauthenticate}>
      <span className={classes.icon}>
        <LogOut />
      </span>
      <p className={classes.text}>Profildan chiqish</p>
    </div>
  );
};
