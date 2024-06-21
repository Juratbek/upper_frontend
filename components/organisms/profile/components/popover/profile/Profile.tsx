import { Avatar, Link } from 'components/lib';
import { FC } from 'react';
import { useGetCurrentBlog } from 'store/clients/blog';
import { TNoop } from 'types';

import classes from './Profile.module.scss';

export const Profile: FC<{ closePopover: TNoop; className?: string }> = ({
  closePopover,
  className,
}): JSX.Element => {
  const { data: currentBlog } = useGetCurrentBlog();

  return (
    <div className={className}>
      <Link href='/settings/profile' className={classes.profile} onClick={closePopover}>
        <Avatar
          size='extra-large'
          imgUrl={currentBlog?.imgUrl}
          className={classes['profile--pick']}
        />
        <div className='flex-1'>
          <h3 className={classes['profile--name']}>{currentBlog?.name}</h3>
          <p className={classes['profile--bio']}>{currentBlog?.bio}</p>
        </div>
      </Link>
    </div>
  );
};
