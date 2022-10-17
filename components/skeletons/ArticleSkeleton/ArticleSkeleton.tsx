import { FC } from 'react';

import classes from './ArticleSkeleton.module.scss';
import { IArticleSkeletonProps } from './ArticleSkeleton.types';

export const ArticleSkeleton: FC<IArticleSkeletonProps> = (props) => {
  return (
    <div className={`${classes['article-skeleton']} ${props.className}`}>
      <div className='d-flex w-100 justify-content-between'>
        <div className='flex-1 me-2'>
          {Array(3)
            .fill('')
            .map((_, index) => (
              <p key={index} className={`${classes.text} w-100 skeleton mt-1`} />
            ))}
        </div>
        <div className={`${classes.img} skeleton`}></div>
      </div>
      <div className='d-flex align-items-center justify-content-between'>
        <div className='d-flex align-items-center'>
          <div className={`${classes.avatar} skeleton`} />
          <p className={`${classes.text} ms-1 skeleton`} />
        </div>
        <div className='d-flex'>
          {Array(5)
            .fill('')
            .map((_, index) => (
              <div key={index} className={`${classes.label} me-1 skeleton`} />
            ))}
        </div>
      </div>
    </div>
  );
};
