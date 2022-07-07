import { Avatar } from 'components';
import { FC } from 'react';
import { getClassName } from 'utils';

import classes from './SidebarBlog.module.css';
import { ISidebarBlogProps } from './SidebarBlog.types';

export const SidebarBlog: FC<ISidebarBlogProps> = (props) => {
  const { className, name, followersCount, articlesCount, bio } = props;
  const rootClassName = getClassName(classes['sidebar-blog'], className);

  return (
    <div className={rootClassName}>
      <div className='d-flex align-items-center'>
        <Avatar imgUrl='' size='medium' />
        <div>
          <h4 className='m-0'>{name}</h4>
          <p className={`m-0 ${classes['details']}`}>
            {followersCount && <span>{followersCount} kuzatuvchilar</span>}&nbsp;&nbsp;
            {articlesCount && <span>{articlesCount} maqolalar</span>}
          </p>
        </div>
      </div>
      {bio && <p className='mt-1'>{bio}</p>}
    </div>
  );
};
