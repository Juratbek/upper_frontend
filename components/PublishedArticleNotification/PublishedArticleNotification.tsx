import { Actions, Avatar } from 'components';
import { FC } from 'react';
import { addAmazonUri, getClassName, toDateString } from 'utils';

import classes from './PublishedArticleNotification.module.scss';
import { IPublishedArticleNotificationProps } from './PublishedArticleNotification.types';

export const PublishedArticleNotification: FC<IPublishedArticleNotificationProps> = (props) => {
  const { className, article, author, status, createdDate } = props;
  const rootClassName = getClassName(
    className,
    classes['published-article-notification'],
    status === 'UNREAD' && 'notification--unread',
  );

  const clickHandler = (): void => {
    props.onClick?.(props);
  };

  return (
    <div className={rootClassName} onClick={clickHandler}>
      <Avatar className='me-1' imgUrl={addAmazonUri(author).imgUrl} />
      {author?.name}&nbsp;
      <span className={classes.text}>
        <strong className='pointer'>&quot;{article.title}&quot;</strong>&nbsp;sarlavhali maqola
        nashr qildi
      </span>
      <span className={classes.date}>{toDateString(createdDate)}</span>
      <div className={classes.actions} onClick={(e): void => e.stopPropagation()}>
        <Actions actions={[{ label: "O'qilgan sifatida belgilash" }]} />
      </div>
    </div>
  );
};
