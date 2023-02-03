import { FC } from 'react';

import classes from './NotificationSkeleton.module.scss';
import { INotificationSkeletonProps } from './NotificationSkeleton.type';

export const NotificationSkeleton: FC<INotificationSkeletonProps> = ({
  size = 'medium',
  ...props
}) => {
  const sizeClassName = classes[`author--${size}`];
  const textSizeClassName = classes[`text--${size}`];
  return (
    <div className={`d-flex align-items-center ${props.className}`}>
      <div className={`${classes.author} skeleton ${sizeClassName}`} />
      <div className='flex-1'>
        <p className={`${classes.text} ${textSizeClassName} w-100 skeleton`} />
        <p className={`${classes.text} ${textSizeClassName} w-30 skeleton`} />
      </div>
    </div>
  );
};
