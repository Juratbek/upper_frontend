import { ArticleImg, Author } from 'components';
import Link from 'next/link';
import { FC } from 'react';
import { addAmazonUri } from 'utils';
import { getClassName } from 'utils/common/common';
import { WEB_APP_ROOT_DIR } from 'variables';

import classes from './SidebarArticle.module.scss';
import { ISidebarArticleProps } from './SidebarArticle.types';

export const SidebarArticle: FC<ISidebarArticleProps> = ({
  className,
  title,
  id,
  author,
  imgUrl,
}) => {
  const rootClassName = getClassName(className, classes['sidebar-article']);
  return (
    <div className={rootClassName}>
      <div className={classes.body}>
        <Link href={`${WEB_APP_ROOT_DIR}/articles/${id}`} className={classes.title + ' link'}>
          <h4 className='pointer' dangerouslySetInnerHTML={{ __html: title }} />
        </Link>
        {author && <Author {...addAmazonUri(author)} />}
      </div>
      <Link href={`${WEB_APP_ROOT_DIR}/articles/${id}`}>
        <ArticleImg imgUrl={imgUrl} size='small' className='pointer' />
      </Link>
    </div>
  );
};
