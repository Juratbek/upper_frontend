import { Avatar, Link } from 'components/lib';
import { FC } from 'react';
import { useGetCurrentBlog } from 'store/clients/blog';
import { TNoop } from 'types';
import { ICONS } from 'variables';

import classes from './Profile.module.scss';

const PenIcon = ICONS.pen;

export const Profile: FC<{ closePopover: TNoop; className?: string }> = ({
  closePopover,
  className,
}): JSX.Element => {
  const { data: currentBlog } = useGetCurrentBlog();

  return (
    <div className={className}>
      swsw
      <div className={classes.profile}>
        <Avatar
          size='extra-large'
          imgUrl={currentBlog?.imgUrl}
          className={classes['profile--pick']}
        />
        <div className='flex-1'>
          <h3 className={classes['profile--name']}>{currentBlog?.name}</h3>
          <p className={classes['profile--bio']}>{currentBlog?.bio}</p>
        </div>
        <Link href='/settings/profile' className={classes['pen-icon']} onClick={closePopover}>
          <PenIcon />
        </Link>
      </div>
    </div>
  );
};
