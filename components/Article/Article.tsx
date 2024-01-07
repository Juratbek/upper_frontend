import { ArticleImg, Author } from 'components';
import { useTheme } from 'hooks';
import Link from 'next/link';
import { FC } from 'react';
import { addAmazonUri, getClassName } from 'utils';
import { WEB_APP_ROOT_DIR } from 'variables';

import classes from './Article.module.scss';
import { IArticleProps } from './Article.types';

export const Article: FC<IArticleProps> = ({ article, author, redirectUrl, ...props }) => {
  const { title, content, id, imgUrl } = article;
  const { theme } = useTheme();
  return (
    <Link key={id} href={`${WEB_APP_ROOT_DIR}/articles/${id}`}>
      <a className={getClassName(classes.article, classes[theme], props.className)}>
        {imgUrl && <ArticleImg imgUrl={imgUrl} size={'full'} className={classes['article-img']} />}

        <h2
          dangerouslySetInnerHTML={{ __html: title || 'Sarlavha kiritilmagan' }}
          className={classes['article-title']}
        ></h2>
        <p dangerouslySetInnerHTML={{ __html: content }} className={classes['article-content']}></p>

        <div className={classes['article-footer']}>
          {author && <Author {...addAmazonUri(author)} />}
        </div>
      </a>
    </Link>
  );
};
