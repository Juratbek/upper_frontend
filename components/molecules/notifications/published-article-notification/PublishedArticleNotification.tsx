import { Avatar, Link } from 'components/lib';
import { FC } from 'react';
import { addAmazonUri, dateInterval, getClassName } from 'utils';

import { INotificationComponentProp } from '../Notification.types';
import classes from './PublishedArticleNotification.module.scss';

export const PublishedArticleNotification: FC<INotificationComponentProp> = (props) => {
  const { className, article, author, createdDate } = props;

  const rootClassName = getClassName(classes.root, className);

  return (
    <div className={rootClassName}>
      <Link href={`/articles/${article.id}`} className={classes.body}>
        <h3 className={classes.title}>{article.title}</h3>
      </Link>
      <div className={classes.footer}>
        <div className={classes.author}>
          <Avatar imgUrl={addAmazonUri(author).imgUrl} />
          <span className={classes['author-name']}>{author.name}</span>
        </div>
        <span className={classes.date}>{dateInterval(createdDate)}</span>
      </div>
    </div>
  );
};
