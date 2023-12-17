import { Avatar } from 'components/lib';
import Link from 'next/link';
import { FC } from 'react';
import { WEB_APP_ROOT_DIR } from 'variables';

import classes from './Author.module.css';
import { IAuthorProps } from './Author.types';

export const Author: FC<IAuthorProps> = ({ name, imgUrl, id }) => {
  return (
    <Link href={`${WEB_APP_ROOT_DIR}/blogs/${id}`} className='link'>
      <div className={classes.blog}>
        <Avatar imgUrl={imgUrl} size='micro' className={classes.avatar} />
        <h5 className='m-0'>{name}</h5>
      </div>
    </Link>
  );
};
