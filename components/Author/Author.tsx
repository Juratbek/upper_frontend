import { Avatar, Link } from 'components/lib';
import { FC } from 'react';

import classes from './Author.module.scss';
import { IAuthorProps } from './Author.types';

export const Author: FC<IAuthorProps> = ({ name, imgUrl, id }) => {
  return (
    <Link href={`/blogs/${id}`} className='link'>
      <div className={classes.blog}>
        <Avatar imgUrl={imgUrl} size='micro' className={classes.avatar} />
        <h5 className={classes.name}>{name}</h5>
      </div>
    </Link>
  );
};
