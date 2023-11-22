import { Avatar } from 'components/lib';
import { FC } from 'react';
import { INotificationComponentProp } from 'types';
import { addAmazonUri, dateInterval, getClassName } from 'utils';

import classes from './PublishedArticleNotification.module.scss';

export const PublishedArticleNotification: FC<INotificationComponentProp> = (props) => {
  const { className, article, author, createdDate } = props;

  const rootClassName = getClassName(classes.root, className);

  return (
    <div className={rootClassName}>
      <div className={classes.body}>
        <h3 className={classes.title}>{article.title} monli maqola nashr qilindi</h3>
      </div>
      <div className={classes.footer}>
        <Avatar imgUrl={addAmazonUri(author).imgUrl} />
        <span className={classes.date}>{dateInterval(createdDate)}</span>
      </div>
    </div>
  );
};
