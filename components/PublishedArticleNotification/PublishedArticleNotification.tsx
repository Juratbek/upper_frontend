import { Avatar } from 'components';
import { FC } from 'react';
import { getClassName } from 'utils';

import classes from './PublishedArticleNotification.module.scss';
import { IPublishedArticleNotificationProps } from './PublishedArticleNotification.types';

export const PublishedArticleNotification: FC<IPublishedArticleNotificationProps> = (props) => {
  const { className, article, author } = props;
  const rootClassName = getClassName(className, classes['published-article-notification']);

  const clickHandler = (): void => {
    props.onClick?.(props);
  };

  return (
    <div className={rootClassName} onClick={clickHandler}>
      <Avatar className='me-1' imgUrl={author.imgUrl} />
      {author?.name}&nbsp;
      <strong className='pointer'>&quot;{article.title}&quot;</strong>&nbsp;nomli maqola nashr qildi
    </div>
  );
};
