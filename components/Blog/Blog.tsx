import { Avatar } from 'components/Avatar/Avatar';
import { FC } from 'react';
import { getClassName } from 'utils';

import classes from './Blog.module.css';
import { IBlogProps } from './Blog.types';

export const Blog: FC<IBlogProps> = (props) => {
  const {
    imgUrl,
    name,
    bio,
    followersCount,
    articlesCount,
    avaratSize = 'large',
    className,
  } = props;
  const rootClassName = getClassName(classes.blog, className);

  return (
    <div className={rootClassName}>
      <div className='d-flex align-items-center mb-1'>
        <Avatar imgUrl={imgUrl} size={avaratSize} className={classes.avatar} />
        <div>
          <h2 className='m-0'>{name}</h2>
          <p className='m-0'>
            {followersCount && <span>{followersCount} kuzatuvchilar</span>}{' '}
            {articlesCount && <span>{articlesCount} maqolalar</span>}
          </p>
        </div>
      </div>
      <div>{bio && <p className={`${classes.bio} m-0`}>{bio}</p>}</div>
    </div>
  );
};
