import { Avatar, Link } from 'components/lib';
import { FC } from 'react';
import { addAmazonUri } from 'utils/blog';
import { getClassName } from 'utils/common';
import { dateInterval } from 'utils/date';

import classes from '../Notification.module.scss';
import { INotificationComponentProp } from '../Notification.types';
import styles from './PublishedArticleNotification.module.scss';

export const PublishedArticleNotification: FC<INotificationComponentProp> = (props) => {
  const { className, article, author, createdDate, status } = props;

  const rootClassName = getClassName(classes.root, className, status == 'UNREAD' && classes.unread);

  return (
    <Link href={`/articles/${article.id}`} className={rootClassName}>
      <h3 className={classes.title} dangerouslySetInnerHTML={{ __html: article.title }} />
      <div className={`${classes.footer} align-items-center`}>
        <div className={styles.author}>
          <Avatar imgUrl={addAmazonUri(author).imgUrl} />
          <span className={styles['author-name']}>{author.name}</span>
        </div>
        <span className={classes.date}>{dateInterval(createdDate)}</span>
      </div>
    </Link>
  );
};
