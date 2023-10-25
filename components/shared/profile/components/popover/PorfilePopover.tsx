import { Avatar } from 'components/lib';
import { forwardRef } from 'react';
import { ICONS } from 'variables';

import { LogOutBtn } from './log-out/LogOut';
import { MenuList } from './menu-list/MenuList';
import classes from './ProfilePopover.module.scss';

const PenIcon = ICONS.pen;

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
