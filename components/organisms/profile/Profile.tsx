import { Avatar } from 'components/lib';
import { useClickOutside } from 'hooks';
import { useCallback, useState } from 'react';
import { useGetCurrentBlog } from 'store/clients/blog';
import { ICONS } from 'variables';

import { ProfilePopover } from './components/popover/PorfilePopover';
import classes from './Profile.module.scss';

const NextIcon = ICONS.next;

export const Profile = (): JSX.Element => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const { data: currentBlog } = useGetCurrentBlog();

  const closePopover = useCallback(() => setIsPopoverOpen(false), []);

  const [rootRef] = useClickOutside(closePopover, '#profile-btn');

  const profileBtnClickHandler = (): void => setIsPopoverOpen((prev) => !prev);

  return (
    <div className={classes.root}>
      <button className={classes.profile} onClick={profileBtnClickHandler} id='profile-btn'>
        <Avatar imgUrl={currentBlog?.imgUrl} size='micro' />
        <span className={classes.icon}>
          <NextIcon width={6} height={10} />
        </span>
      </button>
      <ProfilePopover ref={rootRef} close={closePopover} isOpen={isPopoverOpen} />
    </div>
  );
};
