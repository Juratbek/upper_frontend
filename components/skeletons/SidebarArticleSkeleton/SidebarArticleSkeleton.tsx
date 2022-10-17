import { FC } from 'react';

import classes from './SidebarArticleSkeleton.module.scss';
import { ISidebarArticleSkeletonProps } from './SidebarArticleSkeleton.types';

export const SidebarArticleSkeleton: FC<ISidebarArticleSkeletonProps> = () => {
  return (
    <div className='d-flex justify-content-between'>
      <div className='flex-1 me-2'>
        {Array(2)
          .fill('')
          .map((_, index) => (
            <p key={index} className={`${classes.text} my-1 w-100 skeleton`} />
          ))}
        <div className='d-flex align-items-center'>
          <div className={`${classes.avatar} skeleton`} />
          <p className={`${classes.text} skeleton ms-1`} />
        </div>
      </div>
      <div className={`${classes.img} skeleton`}></div>
    </div>
  );
};
