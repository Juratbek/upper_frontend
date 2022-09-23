import { Avatar } from 'components';
import Link from 'next/link';
import { FC } from 'react';
import { getClassName } from 'utils';

import classes from './SidebarBlog.module.css';
import { ISidebarBlogProps } from './SidebarBlog.types';

export const SidebarBlog: FC<ISidebarBlogProps> = (props) => {
  const { className, name, followersCount, articlesCount, bio, id } = props;
  const rootClassName = getClassName(classes['sidebar-blog'], className);

  return (
    <div className={rootClassName}>
      <Link href={`/blogs/${id}`}>
        <div className='d-flex align-items-center pointer'>
          <Avatar imgUrl='' size='medium' className={classes.avatar} />
          <div>
            <h4 className='m-0'>{name}</h4>
            <p className={`m-0 ${classes['details']}`}>
              {followersCount ? (
                <span>
                  {followersCount} kuzatuvchi{followersCount > 1 && 'lar'}&nbsp;&nbsp;
                </span>
              ) : (
                ''
              )}
              {articlesCount ? (
                <span>
                  {articlesCount} maqola{articlesCount > 1 && 'lar'}
                </span>
              ) : (
                ''
              )}
            </p>
          </div>
        </div>
      </Link>
      {bio && <p className='mt-1'>{bio}</p>}
    </div>
  );
};
