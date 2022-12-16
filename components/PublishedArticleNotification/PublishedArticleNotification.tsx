import { Actions, Avatar, IAction } from 'components';
import { FC, useMemo } from 'react';
import { addAmazonUri, getClassName, toDateString } from 'utils';
import { NOTIFICATION_STATUSES } from 'variables';

import classes from './PublishedArticleNotification.module.scss';
import { IPublishedArticleNotificationProps } from './PublishedArticleNotification.types';

export const PublishedArticleNotification: FC<IPublishedArticleNotificationProps> = (props) => {
  const { className, article, author, status, createdDate } = props;
  const rootClassName = getClassName(
    className,
    classes['published-article-notification'],
    status === 'UNREAD' && 'notification--unread',
  );

  const markAsRead = (): void => props.markAsRead?.(props);

  const deleteNotification = (): void => props.deleteNotification?.(props);

  const actions = useMemo(() => {
    const actions: IAction[] = [{ label: "O'chirish", color: 'red', onClick: deleteNotification }];
    if (status === NOTIFICATION_STATUSES.UNREAD) {
      actions.push({
        label: "O'qilgan sifatida belgilash",
        onClick: markAsRead,
      });
    }

    return actions;
  }, []);

  const clickHandler = (): void => {
    props.onClick?.(props);
  };

  return (
    <div className={classes.container}>
      <div className={rootClassName} onClick={clickHandler}>
        <Avatar className='me-1' imgUrl={addAmazonUri(author).imgUrl} />
        {author?.name}&nbsp;
        <span className={classes.text}>
          <strong className='pointer'>&quot;{article.title}&quot;</strong>&nbsp;sarlavhali maqola
          nashr qildi
        </span>
        <span className={classes.date}>{toDateString(createdDate)}</span>
      </div>
      <div className={classes.actions}>
        <Actions
          dotsClassName={classes.dots}
          actions={actions}
          popupStyle={{ minWidth: 240 }}
          loading={props.loading}
        />
      </div>
    </div>
  );
};
