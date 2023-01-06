import { FC } from 'react';
import { INotificationComponentProp } from 'types';
import { getClassName } from 'utils';

export const MessageNotification: FC<INotificationComponentProp> = (props) => {
  const { className, message = '', status } = props;
  const rootClassName = getClassName(className, status === 'UNREAD' && 'notification--unread');

  return (
    <div className={rootClassName}>
      <div dangerouslySetInnerHTML={{ __html: message }} />
    </div>
  );
};
