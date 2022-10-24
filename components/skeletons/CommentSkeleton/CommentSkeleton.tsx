import { FC, HTMLAttributes } from 'react';

import classes from './CommentSkeleton.module.scss';

export const CommentSkeleton: FC<HTMLAttributes<HTMLDivElement>> = ({ className }) => {
  return (
    <div className={className}>
      <div className='d-flex align-items-center'>
        <div className={`${classes.avatar} skeleton me-1`} />
        <p className={`${classes.text} m-0 skeleton`} />
      </div>
      <p className={`${classes.text} my-1 w-100 skeleton`} />
    </div>
  );
};
