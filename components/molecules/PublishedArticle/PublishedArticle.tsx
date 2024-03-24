import { ArticleImg, Author } from 'components';
import { useTheme } from 'hooks';
import Link from 'next/link';
import { FC } from 'react';
import { getClassName } from 'utils';
import { WEB_APP_ROOT_DIR } from 'variables';

import classes from './PublishedArticle.module.scss';
import { IPublishedArticleProps } from './PublishedArticle.types';

export const PublishedArticle: FC<IPublishedArticleProps> = ({ article, ...props }) => {
  const { title, content, id, imgUrl } = article;
  const { theme } = useTheme();
  return (
    <Link
      key={id}
      href={`${WEB_APP_ROOT_DIR}/articles/${id}`}
      className={getClassName(classes.article, classes[theme], props.className)}
    >
      {imgUrl && <ArticleImg imgUrl={imgUrl} size={'full'} className={classes['article-img']} />}

      <h2
        dangerouslySetInnerHTML={{ __html: title || 'Sarlavha kiritilmagan' }}
        className={classes['article-title']}
      ></h2>
      {!Boolean(imgUrl) && (
        <p dangerouslySetInnerHTML={{ __html: content }} className={classes['article-content']}></p>
      )}

      <div className={classes['article-footer']}>
        {article.author && <Author {...article.author} />}
      </div>
    </Link>
  );
};
