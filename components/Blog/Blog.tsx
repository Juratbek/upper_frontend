import { Avatar } from 'components/Avatar/Avatar';
import { FC } from 'react';

import classes from './Blog.module.css';
import { IBlogProps } from './Blog.types';

export const Blog: FC<IBlogProps> = ({ imgUrl, name, bio, followersCount, articlesCount }) => {
  return (
    <div className={classes.blog}>
      <Avatar imgUrl={imgUrl} size='large' />
      <div>
        <div className='d-flex align-items-end'>
          <h2 className={`${classes.name} my-1`}>{name}</h2>
          <p className='my-1'>
            {followersCount && <span>{followersCount} kuzatuvchilar</span>}{' '}
            {articlesCount && <span>{articlesCount} maqolalar</span>}
          </p>
        </div>
        {bio && <p className={`${classes.bio} m-0`}>{bio}</p>}
      </div>
    </div>
  );
};
