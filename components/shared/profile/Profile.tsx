import { Avatar } from 'components/lib';
import { useClickOutside } from 'hooks';
import { useState } from 'react';
import { ICONS } from 'variables';

import { ProfilePopover } from './components/popover/PorfilePopover';
import classes from './Profile.module.scss';

const NextIcon = ICONS.next;

export const Profile = (): JSX.Element => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [rootRef] = useClickOutside(() => setIsPopoverOpen(false), '#profile-btn');

  const profileBtnClickHandler = (): void => setIsPopoverOpen((prev) => !prev);

  return (
    <div className={classes.root}>
      <div className={classes.profile} onClick={profileBtnClickHandler} id='profile-btn'>
        <Avatar imgUrl='' />
        <span className={classes.icon}>
          <NextIcon width={6} height={10} />
        </span>
      </div>
      {isPopoverOpen && <ProfilePopover ref={rootRef} />}
    </div>
  );
};
