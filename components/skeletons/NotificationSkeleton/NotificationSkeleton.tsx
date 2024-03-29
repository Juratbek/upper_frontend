import { FC } from 'react';

import classes from './NotificationSkeleton.module.scss';
import { INotificationSkeletonProps } from './NotificationSkeleton.type';

export const NotificationSkeleton: FC<INotificationSkeletonProps> = (props) => {
  return (
    <div className={`d-flex align-items-center ${props.className}`}>
      <div className={`${classes.author} skeleton`} />
      <div className='flex-1'>
        <p className={`${classes.text} w-100 skeleton`} />
        <p className={`${classes.text} w-30 skeleton`} />
      </div>
    </div>
  );
};
