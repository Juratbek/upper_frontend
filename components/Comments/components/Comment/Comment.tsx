import { Avatar, Button, Divider } from 'components';
import { useAuth } from 'hooks';
import Link from 'next/link';
import { FC } from 'react';
import { useAppDispatch } from 'store';
import { closeCommentsSidebar } from 'store/states';
import { addAmazonUri, dateInterval } from 'utils';

import classes from './Comment.module.scss';
import { TCommentProps } from './Comment.types';

export const Comment: FC<TCommentProps> = ({ author, date, text }) => {
  const dispatch = useAppDispatch();
  const { currentBlog } = useAuth();

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
            <p className={`m-0 ${classes.date}`}>{dateInterval(date)}</p>
          </div>
        </div>
        {/* {currentBlog?.id === 1 && (
          <Button className={classes['edit-button']} size='small' color='light'>
            O&apos;zgartirish
          </Button>
        )} */}
        <div className={classes.message}>{text}</div>
      </div>
      <Divider className='w-90 mx-auto' />
    </>
  );
};
