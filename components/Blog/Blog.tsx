import { Avatar } from 'components/Avatar/Avatar';
import { FC } from 'react';

import classes from './Blog.module.css';
import { IBlogProps } from './Blog.types';

export const Blog: FC<IBlogProps> = ({ imgUrl, name, bio, followers, articles }) => {
  return (
    <div className={classes.blog}>
      <Avatar imgUrl={imgUrl} size='medium' />
      <div>
        <div className='d-flex align-items-end'>
          <h2 className={`${classes.name} my-1`}>{name}</h2>
          <p className='my-1'>
            {followers && <span>{followers} kuzatuvchilar</span>}{' '}
            {articles && <span>{articles} maqolalar</span>}
          </p>
        </div>
        {bio && <p className={`${classes.bio} m-0`}>{bio}</p>}
      </div>
    </div>
  );
};
