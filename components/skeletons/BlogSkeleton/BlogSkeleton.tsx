import { FC } from 'react';

import classes from './BlogSkeleton.module.scss';
import { IBlogSkeletonProps } from './BlogSkeleton.types';

export const BlogSkeleton: FC<IBlogSkeletonProps> = ({ size = 'medium', ...props }) => {
  const sizeClassName = classes[`author--${size}`];

  return (
    <div className={`d-flex align-items-center ${props.className}`}>
      <div className={`${classes.author} skeleton ${sizeClassName}`} />
      <div className='flex-1'>
        {Array(2)
          .fill('')
          .map((_, index) => {
            const textSizeClassName = classes[`text--${size}`];
            return (
              <p key={index} className={`${classes.text} ${textSizeClassName} w-100 skeleton`} />
            );
          })}
      </div>
    </div>
  );
};
