import { Link } from 'components';
import { FC } from 'react';
import { INotificationComponentProp } from 'types';
import { dateInterval, getClassName } from 'utils';

import classes from './LikeNotification.module.css';

export const LikeNotification: FC<INotificationComponentProp> = (props) => {
  const { className, author, article, status, createdDate } = props;
  const rootClassName = getClassName(
    className,
    classes['like-notification'],
    status == 'UNREAD' && 'notification--unread',
  );

  const clickHandler = (): void => props.onClick?.(props);

  return (
    <Link href={`/articles/${article.id}`}>
      <div className={rootClassName} onClick={clickHandler}>
        <div>
          <strong className='pointer'>&quot;{article.title}&quot;</strong> maqolangiz{' '}
          <Link href={`/blogs/${author.id}`} className='link'>
            <strong className='pointer'>{author.name}ga</strong>
          </Link>{' '}
          yoqdi
        </div>
        <time className='date'>{dateInterval(createdDate)}</time>
      </div>
    </Link>
  );
};
