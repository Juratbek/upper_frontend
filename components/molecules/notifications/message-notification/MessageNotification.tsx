import { FC } from 'react';
import { dateInterval, getClassName } from 'utils';

import { INotificationComponentProp } from '../Notification.types';
import classes from './MessageNotification.module.scss';

export const MessageNotification: FC<INotificationComponentProp> = (props) => {
  const { className, message = '', status, createdDate } = props;
  const rootClassName = getClassName(className, status === 'UNREAD' && 'notification--unread');

  return (
    <div className={rootClassName}>
      <div dangerouslySetInnerHTML={{ __html: message }} />
      <span className={classes.date}>{dateInterval(createdDate)}</span>
    </div>
  );
};
