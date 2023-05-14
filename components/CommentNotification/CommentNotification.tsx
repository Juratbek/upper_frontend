import { Link } from 'components';
import { FC } from 'react';
import { INotificationComponentProp } from 'types';
import { dateInterval, getClassName } from 'utils';
import { WEB_APP_ROOT_DIR } from 'variables';

export const CommentNotification: FC<INotificationComponentProp> = (props) => {
  const { className, article, author, status, createdDate } = props;
  const rootClassName = getClassName(className, status == 'UNREAD' && 'notification--unread');

  const clickHandler = (): void => props.onClick?.(props);

  return (
    <Link href={`${WEB_APP_ROOT_DIR}/articles/${article.id}`}>
      <div className={rootClassName} onClick={clickHandler}>
        <div>
          <strong className='pointer'>&quot;{article.title}&quot;</strong> maqolangizga{' '}
          <Link href={`${WEB_APP_ROOT_DIR}/blogs/${author.id}`} className='link'>
            <strong className='pointer'>{author.name}</strong>
          </Link>{' '}
          izoh qoldirdi
        </div>
        <time className='date'>{dateInterval(createdDate)}</time>
      </div>
    </Link>
  );
};
