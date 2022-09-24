import { Avatar } from 'components';
import Link from 'next/link';
import { FC } from 'react';
import { getClassName } from 'utils';

import classes from './SidebarBlog.module.css';
import { ISidebarBlogProps } from './SidebarBlog.types';

export const SidebarBlog: FC<ISidebarBlogProps> = (props) => {
  const { className, name, bio, id } = props;
  const rootClassName = getClassName(classes['sidebar-blog'], className);

  return (
    <div className={rootClassName}>
      <Link href={`/blogs/${id}`}>
        <div className='d-flex pointer'>
          <Avatar imgUrl='' size='medium' className={classes.avatar} />
          <div>
            <h4 className='m-0'>{name}</h4>
            {bio && <p className={classes.bio}>{bio}</p>}
          </div>
        </div>
      </Link>
    </div>
  );
};
