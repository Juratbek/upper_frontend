import { Avatar, Divider } from 'components';
import Link from 'next/link';
import { FC } from 'react';
import { useAppDispatch } from 'store';
import { closeCommentsSidebar } from 'store/states';
import { addAmazonUri, toDateString } from 'utils';

import classes from './Comment.module.scss';
import { TCommentProps } from './Comment.types';

export const Comment: FC<TCommentProps> = ({ author, date, text }) => {
  const dispatch = useAppDispatch();

  const closeComments = (): unknown => dispatch(closeCommentsSidebar());

  return (
    <>
      <div className={classes.comment}>
        <div className={classes.author}>
          <Avatar imgUrl={addAmazonUri(author).imgUrl} size='small' />
          <div className='ms-1'>
            <Link href={`/blogs/${author.id}`}>
              <a onClick={closeComments}>
                <h5 className='m-0 link pointer'>{author.name}</h5>
              </a>
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
