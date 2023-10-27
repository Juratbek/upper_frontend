import { Avatar, Link } from 'components/lib';
import { FC, forwardRef } from 'react';
import { TNoop } from 'types';
import { ICONS } from 'variables';

import { LogOutBtn } from './log-out/LogOut';
import { MenuList } from './menu-list/MenuList';
import classes from './ProfilePopover.module.scss';

const PenIcon = ICONS.pen;

export const ProfilePopover = forwardRef<HTMLDivElement, { close: TNoop }>(function Component(
  { close },
  ref,
) {
  return (
    <div className={classes.root} ref={ref}>
      <Profile closePopover={close} />
      <MenuList closePopover={close} />
      <LogOutBtn />
    </div>
  );
});

const Profile: FC<{ closePopover: TNoop }> = ({ closePopover }): JSX.Element => (
  <div className={classes.profile}>
    <Avatar size='large' imgUrl='' className={classes['profile--pick']} />
    <div className='flex-1'>
      <h3 className={classes['profile--name']}>Og’abek Yusuf</h3>
      <p className={classes['profile--bio']}>ogabekyusuf...@gmail.com</p>
    </div>
    <Link href='/profile' className={classes['pen-icon']} onClick={closePopover}>
      <PenIcon />
    </Link>
  </div>
);
