import { Link } from 'components';
import { FC } from 'react';
import { INotificationComponentProp } from 'types';
import { getClassName } from 'utils';
import { WEB_APP_ROOT_DIR } from 'variables';

import classes from './LikeNotification.module.css';

export const LikeNotification: FC<INotificationComponentProp> = (props) => {
  const { className, author, article, status } = props;
  const rootClassName = getClassName(
    className,
    classes['like-notification'],
    status == 'UNREAD' && 'notification--unread',
  );

  const clickHandler = (): void => props.onClick?.(props);

  return (
    <Link href={`${WEB_APP_ROOT_DIR}/articles/${article.id}`}>
      <div className={rootClassName} onClick={clickHandler}>
        <div>
          <strong className='pointer'>&quot;{article.title}&quot;</strong> maqolangiz{' '}
          <Link href={`${WEB_APP_ROOT_DIR}/blogs/${author.id}`} className='link'>
            <strong className='pointer'>{author.name}ga</strong>
          </Link>{' '}
          yoqdi
        </div>
      </div>
    </Link>
  );
};
