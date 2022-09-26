import { ArticleImg, Author } from 'components';
import Link from 'next/link';
import { FC } from 'react';
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
          <h4 className='m-0 mb-1 pointer'>{title}</h4>
        </Link>
        {author && <Author {...author} />}
      </div>
      <Link href={`/articles/${1}`}>
        <div>
          <ArticleImg imgUrl={imgUrl} size='small' className='pointer' />
        </div>
      </Link>
    </div>
  );
};
