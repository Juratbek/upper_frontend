import { ArticleImg, Author } from 'components';
import { FC } from 'react';
import { getClassName } from 'utils/common';

import classes from './SidebarArticle.module.css';
import { ISidebarArticleProps } from './SidebarArticle.types';

export const SidebarArticle: FC<ISidebarArticleProps> = ({ className, title, author }) => {
  const rootClassName = getClassName(className, classes['sidebar-article']);

  return (
    <div className={rootClassName}>
      <div className={classes.title}>
        <h4 className='m-0 mb-1'>{title}</h4>
        {author && <Author {...author} />}
      </div>
      <ArticleImg imgUrl={''} size='small' />
    </div>
  );
};
