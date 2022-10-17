import { FC } from 'react';

import classes from './BlogSkeleton.module.scss';
import { IBlogSkeletonProps } from './BlogSkeleton.types';

export const BlogSkeleton: FC<IBlogSkeletonProps> = (props) => {
  return (
    <div className={`d-flex ${props.className}`}>
      <div className={`${classes.author} skeleton`} />
      <div className='flex-1 ms-2'>
        {Array(2)
          .fill('')
          .map((_, index) => (
            <p key={index} className={`${classes.text} w-100 skeleton`} />
          ))}
      </div>
    </div>
  );
};
