import { ArticleImg, Author } from 'components';
import Link from 'next/link';
import { FC } from 'react';
import { addAmazonUri } from 'utils';
import { getClassName } from 'utils/common';

import classes from './SidebarArticle.module.css';
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
      <div className={classes.title}>
        <Link href={`/articles/${id}`}>
          <a>
            <h4 className='m-0 mb-1 pointer' dangerouslySetInnerHTML={{ __html: title }} />
          </a>
        </Link>
        {author && <Author {...addAmazonUri(author)} />}
      </div>
      <Link href={`/articles/${id}`}>
        <a>
          <div>
            <ArticleImg imgUrl={imgUrl} size='small' className='pointer' />
          </div>
        </a>
      </Link>
    </div>
  );
};
