import { ArticleImg, Author } from 'components';
import { Link } from 'components/lib';
import { FC } from 'react';
import { getClassName } from 'utils';

import classes from './PublishedArticle.module.scss';
import { IPublishedArticleProps } from './PublishedArticle.types';

export const PublishedArticle: FC<IPublishedArticleProps> = ({ article, ...props }) => {
  const { title, content, id, imgUrl } = article;

  return (
    <Link
      key={id}
      href={`/articles/${id}`}
      className={getClassName(classes.article, props.className)}
    >
      {imgUrl && <ArticleImg imgUrl={imgUrl} size={'full'} className={classes['article-img']} />}

      <h2
        dangerouslySetInnerHTML={{ __html: title || 'Sarlavha kiritilmagan' }}
        className={classes['article-title']}
      ></h2>
      {!Boolean(imgUrl) && typeof content === 'string' && (
        <p dangerouslySetInnerHTML={{ __html: content }} className={classes['article-content']}></p>
      )}

      {article.author && (
        <div className={classes['article-footer']}>
          <Author {...article.author} />
        </div>
      )}
    </Link>
  );
};
