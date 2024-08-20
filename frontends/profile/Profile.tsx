import { Avatar } from 'components/lib';
import { FC } from 'react';
import { useGetCurrentBlog } from 'store/clients/blog';

import { LogOut } from './log-out/LogOut';
import { Menu } from './menu/Menu';
import classes from './Profile.module.scss';

export const Profile: FC = () => {
  const { data: currentBlog } = useGetCurrentBlog();
  return (
    <>
      <div className={`${classes['profile-container']} ${classes.container}`}>
        {currentBlog && (
          <Avatar name={currentBlog.name} size='extra-large' imgUrl={currentBlog.imgUrl} />
        )}
        <div>
          <h3 className={classes.name}>{currentBlog?.name}</h3>
          <p className={classes.bio}>{currentBlog?.bio}</p>
        </div>
      </div>
      <Menu />
      <LogOut className={classes.container} />
    </>
  );
};
