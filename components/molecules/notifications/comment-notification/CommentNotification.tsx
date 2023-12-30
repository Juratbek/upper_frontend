import { Link } from 'components/lib';
import { FC } from 'react';
import { getClassName } from 'utils/common';
import { dateInterval } from 'utils/date';
import { ICONS } from 'variables/icons';

import classes from '../Notification.module.scss';
import { INotificationComponentProp } from '../Notification.types';
import styles from './CommentNotification.module.scss';

const CommentIcon = ICONS.comment;

export const CommentNotification: FC<INotificationComponentProp> = (props) => {
  const { className, article, author, status, createdDate, message } = props;
  const rootClassName = getClassName(classes.root, className, status == 'UNREAD' && classes.unread);

  return (
    <Link href={`/articles/${article.id}`} className={rootClassName}>
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
