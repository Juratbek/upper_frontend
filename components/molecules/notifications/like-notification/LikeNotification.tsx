import { LikeIcon } from 'components/icons';
import { Link } from 'components/lib';
import { FC } from 'react';
import { dateInterval, getClassName } from 'utils';

import classes from '../Notification.module.scss';
import { INotificationComponentProp } from '../Notification.types';

export const LikeNotification: FC<INotificationComponentProp> = (props) => {
  const { className, author, article, status, createdDate } = props;
  const rootClassName = getClassName(classes.root, className, status == 'UNREAD' && classes.unread);

  return (
    <Link href={`/articles/${article.id}`} className={rootClassName}>
      <h3
        className={classes.title}
        dangerouslySetInnerHTML={{
          __html: `&quot;${article.title}&quot; maqolangiz ${author.name}ga yoqdi`,
        }}
      />
      <div className={classes.footer}>
        <div className={classes['icon-box']}>
          <LikeIcon variant='fulfilled' color='#E6F2FF' />
        </div>
        <time className={`${classes.date} mt-auto`}>{dateInterval(createdDate)}</time>
      </div>
    </Link>
  );
};
