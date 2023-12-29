import { Link } from 'components/lib';
import { FC } from 'react';
import { dateInterval, getClassName } from 'utils';
import { ICONS, WEB_APP_ROOT_DIR } from 'variables';

import classes from '../Notification.module.scss';
import { INotificationComponentProp } from '../Notification.types';
import styles from './CommentNotification.module.scss';

const CommentIcon = ICONS.comment;

export const CommentNotification: FC<INotificationComponentProp> = (props) => {
  const { className, article, author, status, createdDate, message } = props;
  const rootClassName = getClassName(className, status == 'UNREAD' && classes.unread);

  return (
    <Link href={`${WEB_APP_ROOT_DIR}/articles/${article.id}`} className={rootClassName}>
      <h3
        dangerouslySetInnerHTML={{
          __html: `${author.name} &quot;${article.title}&quot; maqolangizga fikr bildirdi`,
        }}
        className={classes.title}
      />
      <div className={classes.footer}>
        <div className='d-flex align-items-center'>
          <div className={classes['icon-box']}>
            <CommentIcon variant='fulfilled' color='#E6F2FF' />
          </div>
          <p className={styles['comment-text']}>{message}</p>
        </div>
        <time className={`${classes.date} mt-auto`}>{dateInterval(createdDate)}</time>
      </div>
    </Link>
  );
};
