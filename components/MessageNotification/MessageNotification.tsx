import { FC } from 'react';
import { INotificationComponentProp } from 'types';
import { dateInterval, getClassName } from 'utils';

import classes from './MessageNotification.module.scss';

export const MessageNotification: FC<INotificationComponentProp> = (props) => {
  const { className, message = '', status, createdDate } = props;
  const rootClassName = getClassName(className, status === 'UNREAD' && 'notification--unread');

  const clickHandler = (): void => {
    props.onClick?.(props);
  };

  return (
    <div className={rootClassName} onClick={clickHandler}>
      <div dangerouslySetInnerHTML={{ __html: message }} />
      <span className={classes.date}>{dateInterval(createdDate)}</span>
    </div>
  );
};
