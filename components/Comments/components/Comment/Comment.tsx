import { Avatar } from 'components';
import { Divider } from 'components/Divider/Divider';
import Link from 'next/link';
import { FC } from 'react';
import { toDateString } from 'utils';

import classes from './Comment.module.scss';
import { TCommentProps } from './Comment.types';

export const Comment: FC<TCommentProps> = ({ author, date, text }) => {
  return (
    <>
      <div className={classes.comment}>
        <div className={classes.author}>
          <Avatar imgUrl={author.imgUrl} size='small' />
          <div className='ms-1'>
            <Link href={`/blogs/${author.id}`}>
              <h5 className='m-0 link pointer'>{author.name}</h5>
            </Link>
            <p className={`m-0 ${classes.date}`}>{toDateString(date)}</p>
          </div>
        </div>
        <div className={classes.message}>{text}</div>
      </div>
      <Divider className='w-90 mx-auto' />
    </>
  );
};
