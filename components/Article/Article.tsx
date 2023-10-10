import { ArticleImg, Author } from 'components';
import Link from 'next/link';
import { FC } from 'react';
import { addAmazonUri, getClassName } from 'utils';
import { WEB_APP_ROOT_DIR } from 'variables';

import classes from './Article.module.scss';
import { IArticleProps } from './Article.types';

export const Article: FC<IArticleProps> = ({ article, author, ...props }) => {
  const { title, content, id, imgUrl } = article;
  const rootClassName = getClassName(classes.root, props.className);

  return (
    <div className={rootClassName}>
      <Link href={`${WEB_APP_ROOT_DIR}/articles/${id}`} className={classes.body}>
        <div className='flex-1'>
          <h2 className={classes.title} dangerouslySetInnerHTML={{ __html: title }} />
          <p className={classes.content} dangerouslySetInnerHTML={{ __html: content }} />
        </div>
        {imgUrl && <ArticleImg imgUrl={imgUrl} />}
      </Link>
      <div className={classes.footer}>{author && <Author {...addAmazonUri(author)} />}</div>
    </div>
  );
};
