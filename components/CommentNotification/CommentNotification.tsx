import { Link } from 'components/lib';
import { FC } from 'react';
import { INotificationComponentProp } from 'types';
import { dateInterval, getClassName } from 'utils';
import { WEB_APP_ROOT_DIR } from 'variables';

export const CommentNotification: FC<INotificationComponentProp> = (props) => {
  const { className, article, author, status, createdDate, message } = props;
  const rootClassName = getClassName(className, status == 'UNREAD' && 'notification--unread');

  const clickHandler = (): void => props.onClick?.(props);

  return (
    <Link href={`${WEB_APP_ROOT_DIR}/articles/${article.id}`}>
      <div className={rootClassName} onClick={clickHandler}>
        <div>
          <strong
            className='pointer'
            dangerouslySetInnerHTML={{ __html: `&quot;${article.title}&quot;` }}
          />{' '}
          maqolangizga{' '}
          <Link href={`${WEB_APP_ROOT_DIR}/blogs/${author.id}`} className='link'>
            <strong className='pointer'>{author.name}</strong>
          </Link>{' '}
          izoh qoldirdi
        </div>
        <div>
          <strong>Izoh:</strong> {message}
        </div>
        <time className='date'>{dateInterval(createdDate)}</time>
      </div>
    </Link>
  );
};
