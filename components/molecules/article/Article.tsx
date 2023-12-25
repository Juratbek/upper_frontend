import { Link } from 'components/lib';
import { FC } from 'react';

import classes from './Article.module.scss';
import { IArticleProps } from './Article.types';

export const Article: FC<IArticleProps> = ({ article }) => {
  const { title, id, content } = article;

  return (
    <div className={classes.root}>
      <Link className={classes.title} href={`/user/articles/${id}`}>
        <h3 dangerouslySetInnerHTML={{ __html: title || 'Sarlavha kiritilmagan' }} />
      </Link>
      {Boolean(content) && (
        <p className={classes.content} dangerouslySetInnerHTML={{ __html: content ?? '' }} />
      )}
    </div>
  );
};
