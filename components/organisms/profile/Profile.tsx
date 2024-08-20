import { NextIcon } from 'components/icons';
import { Avatar } from 'components/lib';
import { useClickOutside } from 'hooks';
import { useCallback, useState } from 'react';
import { useGetCurrentBlog } from 'store/clients/blog';

import { ProfilePopover } from './components/popover/PorfilePopover';
import classes from './Profile.module.scss';

export const Profile = (): JSX.Element => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const { data: currentBlog } = useGetCurrentBlog();

  const closePopover = useCallback(() => setIsPopoverOpen(false), []);

  const [rootRef] = useClickOutside(closePopover, '#profile-btn');

  const profileBtnClickHandler = (): void => setIsPopoverOpen((prev) => !prev);

  return (
    <div className={classes.root} id='header-profile'>
      <button className={classes.profile} onClick={profileBtnClickHandler} id='profile-btn'>
        {currentBlog && <Avatar imgUrl={currentBlog.imgUrl} name={currentBlog.name} size='micro' />}
        <span className={classes.icon}>
          <NextIcon width={24} height={24} />
        </span>
      </button>
      <ProfilePopover ref={rootRef} close={closePopover} isOpen={isPopoverOpen} />
    </div>
  );
};
