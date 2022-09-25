import { Avatar } from 'components';
import { Divider } from 'components/Divider/Divider';
import { FC } from 'react';
import { toDateString } from 'utils';

import classes from './Comment.module.scss';
import { TCommentProps } from './Comment.types';

export const Comment: FC<TCommentProps> = ({ author, date, message }) => {
  return (
    <>
      <div className={classes.comment}>
        <div className={classes.author}>
          <Avatar imgUrl='' size='small' />
          <div className='ms-1'>
            <h4 className='m-0'>{author.name}</h4>
            <p className={`m-0 ${classes.date}`}>{toDateString(date)}</p>
          </div>
        </div>
        <div className={classes.message}>{message}</div>
      </div>
      <Divider className='w-90 mx-auto' />
    </>
  );
};
