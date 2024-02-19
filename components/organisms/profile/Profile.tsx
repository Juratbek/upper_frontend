import { Avatar } from 'components/lib';
import { useClickOutside } from 'hooks';
import { useCallback, useEffect, useState } from 'react';
import { useGetCurrentBlog } from 'store/clients/blog';
import { ICONS } from 'variables';

import { ProfilePopover } from './components/popover/PorfilePopover';
import classes from './Profile.module.scss';

const NextIcon = ICONS.next;

export const Profile = (): JSX.Element => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const { data: currentBlog } = useGetCurrentBlog();
  const [imgUrl, setImgUrl] = useState<string | undefined>(currentBlog?.imgUrl);

  useEffect(() => {
    if (currentBlog) {
      const imgUrl = currentBlog?.imgUrl;
      setImgUrl(imgUrl);
    }
  }, [currentBlog]);

  const closePopover = useCallback(() => setIsPopoverOpen(false), []);

  const [rootRef] = useClickOutside(closePopover, '#profile-btn');

  const profileBtnClickHandler = (): void => setIsPopoverOpen((prev) => !prev);

  return (
    <div className={classes.root}>
      <button className={classes.profile} onClick={profileBtnClickHandler} id='profile-btn'>
        <Avatar imgUrl={imgUrl ?? ''} size='micro' />
        <span className={classes.icon}>
          <NextIcon width={24} height={24} />
        </span>
      </button>
      <ProfilePopover ref={rootRef} close={closePopover} isOpen={isPopoverOpen} />
    </div>
  );
};
