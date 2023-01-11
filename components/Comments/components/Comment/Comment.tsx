import { Avatar } from 'components';
import { Divider } from 'components/Divider/Divider';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { toDateString } from 'utils';

import classes from './Comment.module.scss';
import { TCommentProps } from './Comment.types';

export const Comment: FC<TCommentProps> = ({ author, date, text }) => {
  const router = useRouter();
  const clickHandler = (): void => {
    router.push(`/blogs/${author.id}`);
  };
  return (
    <>
      <div className={classes.comment}>
        <div className={classes.author}>
          <Avatar imgUrl={author.imgUrl} size='small' />
          <div className='ms-1'>
            <h5 onClick={clickHandler} className='m-0 link pointer'>
              {author.name}
            </h5>
            <p className={`m-0 ${classes.date}`}>{toDateString(date)}</p>
          </div>
        </div>
        <div className={classes.message}>{text}</div>
      </div>
      <Divider className='w-90 mx-auto' />
    </>
  );
};
