import { Link } from 'components/lib';
import { FC } from 'react';
import { dateInterval, getClassName } from 'utils';
import { WEB_APP_ROOT_DIR } from 'variables';

import { INotificationComponentProp } from '../Notification.types';

export const LikeNotification: FC<INotificationComponentProp> = (props) => {
  const { className, author, article, status, createdDate } = props;
  const rootClassName = getClassName(className, status == 'UNREAD' && 'notification--unread');

  return (
    <Link href={`${WEB_APP_ROOT_DIR}/articles/${article.id}`}>
      <div className={rootClassName}>
        <div>
          <strong
            className='pointer'
            dangerouslySetInnerHTML={{ __html: `&quot;${article.title}&quot;` }}
          />{' '}
          maqolangiz{' '}
          <Link href={`${WEB_APP_ROOT_DIR}/blogs/${author.id}`} className='link'>
            <strong className='pointer'>{author.name}</strong>ga
          </Link>{' '}
          yoqdi
        </div>
        <time className='date'>{dateInterval(createdDate)}</time>
      </div>
    </Link>
  );
};
