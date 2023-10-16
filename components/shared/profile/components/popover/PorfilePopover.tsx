import { Avatar } from 'components/lib';
import { useAuth } from 'hooks';
import { forwardRef } from 'react';
import { ICONS } from 'variables';

import { MenuList } from './menu-list/MenuList';
import classes from './ProfilePopover.module.scss';

const PenIcon = ICONS.pen;
const LogOut = ICONS.logOut;

export const ProfilePopover = forwardRef<HTMLDivElement>(function Component(_, ref) {
  return (
    <div className={classes.root} ref={ref}>
      <Profile />
      <MenuList />
      <LogOutBtn />
    </div>
  );
});

const Profile = (): JSX.Element => (
  <div className={classes.profile}>
    <Avatar size='large' imgUrl='' className={classes['profile--pick']} />
    <div className='flex-1'>
      <h3 className={classes['profile--name']}>Og’abek Yusuf</h3>
      <p className={classes['profile--bio']}>ogabekyusuf...@gmail.com</p>
    </div>
    <div className={classes['pen-icon']}>
      <PenIcon />
    </div>
  </div>
);

const LogOutBtn = (): JSX.Element => {
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
