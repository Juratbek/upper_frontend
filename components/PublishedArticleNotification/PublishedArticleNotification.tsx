import { Actions, Avatar, IAction } from 'components';
import { useRouter } from 'next/router';
import { FC, useMemo } from 'react';
import { INotificationComponentProp } from 'types';
import { addAmazonUri, dateInterval, getClassName } from 'utils';
import { NOTIFICATION_STATUSES, WEB_APP_ROOT_DIR } from 'variables';

import classes from './PublishedArticleNotification.module.scss';

export const PublishedArticleNotification: FC<INotificationComponentProp> = (props) => {
  const { className, article, author, status, createdDate } = props;

  console.log(status);
  const rootClassName = getClassName(
    classes.container,
    className,
    status == 'UNREAD' && 'notification--unread',
  );
  const { push } = useRouter();

  const markAsRead = (): void => props.markAsRead?.(props);

  const deleteNotification = (): void => props.deleteNotification?.(props);

  const actions = useMemo(() => {
    let actions: IAction[] = [{ label: "O'chirish", color: 'red', onClick: deleteNotification }];
    if (status === NOTIFICATION_STATUSES.UNREAD) {
      actions = [{ label: "O'qilgan sifatida belgilash", onClick: markAsRead }, ...actions];
    }

    return actions;
  }, [status]);

  const clickHandler = (): void => {
    push(`${WEB_APP_ROOT_DIR}/articles/${article.id}`);
    props.onClick?.(props);
  };

  return (
    <div className={rootClassName}>
      <div className={classes['published-article-notification']} onClick={clickHandler}>
        <Avatar className='me-1' imgUrl={addAmazonUri(author).imgUrl} />
        <div>
          <div>
            {author?.name}&nbsp;
            <span className={classes.text}>
              <strong className='pointer'>&quot;{article.title}&quot;</strong>&nbsp;sarlavhali
              maqola nashr qildi
            </span>
          </div>
          <span className={classes.date}>{dateInterval(createdDate)}</span>
        </div>
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
