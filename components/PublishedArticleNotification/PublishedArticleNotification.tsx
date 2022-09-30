import { Avatar } from 'components';
import Link from 'next/link';
import { FC } from 'react';
import { getClassName } from 'utils';

import classes from './PublishedArticleNotification.module.scss';
import { IPublishedArticleNotificationProps } from './PublishedArticleNotification.types';

export const PublishedArticleNotification: FC<IPublishedArticleNotificationProps> = (props) => {
  const { className, article, author } = props;
  const rootClassName = getClassName(className, classes['published-article-notification']);

  return (
    <Link href={`/articles/${article.id}`}>
      <div className={rootClassName}>
        <Avatar className='me-1' imgUrl={author.imgUrl} />
        {author?.name}&nbsp;
        <strong className='pointer'>&quot;{article.title}&quot;</strong>&nbsp;nomli maqola nashr
        qildi
      </div>
    </Link>
  );
};
