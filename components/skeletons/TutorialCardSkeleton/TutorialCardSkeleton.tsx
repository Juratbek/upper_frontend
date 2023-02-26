import { FC } from 'react';

import classes from './TutorialCardSkeleton.module.scss';
import { ITutorialCardSkeletonProps } from './TutorialCardSkeleton.types';

export const TutorialCardSkeleton: FC<ITutorialCardSkeletonProps> = (props) => {
  return (
    <div className={props.className}>
      <div className={`${classes.img} skeleton`} />
      <div className={`${classes.label} mt-1 skeleton`} />
      <div className='d-flex align-items-center mt-1'>
        <div className={`${classes.avatar} skeleton`} />
        <p className={`${classes.text} ms-1 skeleton`} />
      </div>
    </div>
  );
};
