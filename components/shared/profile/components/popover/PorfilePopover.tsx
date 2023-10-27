import { forwardRef } from 'react';
import { TNoop } from 'types';

import { LogOutBtn } from './log-out/LogOut';
import { MenuList } from './menu-list/MenuList';
import { Profile } from './profile/Profile';
import classes from './ProfilePopover.module.scss';

export const ProfilePopover = forwardRef<HTMLDivElement, { close: TNoop }>(function Component(
  { close },
  ref,
) {
  return (
    <div className={classes.root} ref={ref}>
      <Profile closePopover={close} className={classes['vertical-padding']} />
      <MenuList closePopover={close} itemClassName={classes['vertical-padding']} />
      <LogOutBtn className={classes['vertical-padding']} />
    </div>
  );
});
