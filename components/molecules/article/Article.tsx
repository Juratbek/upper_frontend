import { Link } from 'components/lib';
import { FC } from 'react';

import classes from './Article.module.scss';
import { IArticleProps } from './Article.types';

export const Article: FC<IArticleProps> = ({ article }) => {
  const { title, id, content } = article;

  return (
    <Link className={classes.root} href={`/user/articles/${id}`}>
      <h3
        className={classes.title}
        dangerouslySetInnerHTML={{ __html: title || 'Sarlavha kiritilmagan' }}
      />
      {Boolean(content) && (
        <p className={classes.content} dangerouslySetInnerHTML={{ __html: content ?? '' }} />
      )}
    </Link>
  );
};
