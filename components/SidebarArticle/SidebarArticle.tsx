import { ArticleImg, Author } from 'components';
import Link from 'next/link';
import { FC } from 'react';
import { useAppDispatch } from 'store';
import { closeSidebar } from 'store/states';
import { addAmazonUri } from 'utils';
import { getClassName } from 'utils/common';
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
  const dispatch = useAppDispatch();
  const rootClassName = getClassName(className, classes['sidebar-article']);
  const closeSidebarHandler = (): void => {
    dispatch(closeSidebar());
  };
  return (
    <div className={rootClassName} onClick={closeSidebarHandler}>
      <div className={classes.body}>
        <Link href={`${WEB_APP_ROOT_DIR}/articles/${id}`}>
          <a className={classes.title + ' link'}>
            <h4 className='pointer' dangerouslySetInnerHTML={{ __html: title }} />
          </a>
        </Link>
        {author && <Author {...addAmazonUri(author)} />}
      </div>
      <Link href={`${WEB_APP_ROOT_DIR}/articles/${id}`}>
        <a>
          <div>
            <ArticleImg imgUrl={imgUrl} size='small' className='pointer' />
          </div>
        </a>
      </Link>
    </div>
  );
};
