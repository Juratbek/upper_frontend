import { ArticleImg, Author } from 'components';
import Link from 'next/link';
import { FC } from 'react';
import { addAmazonUri, getClassName } from 'utils';
import { WEB_APP_ROOT_DIR } from 'variables/common';
import { ICONS } from 'variables/icons';

import classes from './PublishedArticle.module.scss';
import { IPublishedArticleProps } from './PublishedArticle.types';

const SaveIcon = ICONS.save;
const ShareIcon = ICONS.share;

export const PublishedArticle: FC<IPublishedArticleProps> = ({ article, author, ...props }) => {
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
      <div className={classes.footer}>
        {author && <Author {...addAmazonUri(author)} />}
        <div className={classes.actions}>
          <span className={classes['action-icon']}>
            <SaveIcon />
          </span>
          <span className={classes['action-icon']}>
            <ShareIcon />
          </span>
        </div>
      </div>
    </div>
  );
};
