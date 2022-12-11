import { Avatar } from 'components';
import { FC } from 'react';
import { addAmazonUri, getClassName } from 'utils';

import classes from './PublishedArticleNotification.module.scss';
import { IPublishedArticleNotificationProps } from './PublishedArticleNotification.types';

export const PublishedArticleNotification: FC<IPublishedArticleNotificationProps> = (props) => {
  const { className, article, author, status } = props;
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
      <strong className='pointer'>&quot;{article.title}&quot;</strong>&nbsp;nomli maqola nashr qildi
    </div>
  );
};
