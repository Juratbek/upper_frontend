import { ArticleImg, Author, Label } from 'components';
import Link from 'next/link';
import { FC } from 'react';
import { addAmazonUri, getClassName } from 'utils';
import { WEB_APP_ROOT_DIR } from 'variables';

import classes from './Article.module.scss';
import { IArticleProps } from './Article.types';

export const Article: FC<IArticleProps> = ({ article, author, redirectUrl, ...props }) => {
  const { title, content, labels = [], id, imgUrl } = article;
  const rootClassName = getClassName(classes.root, props.className);

  return (
    <div className={rootClassName}>
      <Link
        href={`${redirectUrl ?? `${WEB_APP_ROOT_DIR}/articles`}/${id}`}
        className={classes.body}
      >
        <div className={classes['text-content']}>
          <h2 className={classes.title} dangerouslySetInnerHTML={{ __html: title }} />
          <p className={classes.content} dangerouslySetInnerHTML={{ __html: content }} />
        </div>
        {imgUrl && <ArticleImg imgUrl={imgUrl} />}
      </Link>
      <div className={classes.footer}>
        <Author {...addAmazonUri(author)} />
        {labels?.map((label) => (
          <span
            key={label.id}
            style={{ marginLeft: '.3rem', marginBottom: '0.3rem', display: 'inline-block' }}
          >
            <Label>{label.name}</Label>
          </span>
        ))}
      </div>
    </div>
  );
};
