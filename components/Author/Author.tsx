import { Avatar } from 'components/Avatar/Avatar';
import Link from 'next/link';
import { FC } from 'react';

import classes from './Author.module.css';
import { IAuthorProps } from './Author.types';

export const Author: FC<IAuthorProps> = ({ name, imgUrl, id }) => {
  return (
    <Link href={`/blogs/${id}`}>
      <div className={classes.blog}>
        <Avatar imgUrl={imgUrl} size='small' className={classes.avatar} />
        <h4 className='m-0'>{name}</h4>
      </div>
    </Link>
  );
};
