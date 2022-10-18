import { FC } from 'react';

import classes from './BlogSkeleton.module.scss';
import { IBlogSkeletonProps } from './BlogSkeleton.types';

export const BlogSkeleton: FC<IBlogSkeletonProps> = ({ size = 'medium', ...props }) => {
  return (
    <div className={`d-flex align-items-center ${props.className}`}>
      <div className={`${classes.author} skeleton ${classes[`author--${size}`]}`} />
      <div className='flex-1'>
        {Array(2)
          .fill('')
          .map((_, index) => (
            <p
              key={index}
              className={`${classes.text} ${classes[`text--${size}`]} w-100 skeleton`}
            />
          ))}
      </div>
    </div>
  );
};
