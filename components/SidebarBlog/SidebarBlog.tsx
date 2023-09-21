import { Avatar } from 'components';
import Link from 'next/link';
import { FC } from 'react';
import { useAppDispatch } from 'store';
import { closeSidebar } from 'store/states';
import { getClassName } from 'utils';
import { WEB_APP_ROOT_DIR } from 'variables';

import classes from './SidebarBlog.module.css';
import { ISidebarBlogProps } from './SidebarBlog.types';

export const SidebarBlog: FC<ISidebarBlogProps> = (props) => {
  const dispatch = useAppDispatch();
  const { className, name, bio, id, imgUrl } = props;
  const rootClassName = getClassName(classes['sidebar-blog'], className);
  const closeSidebarHandler = (): void => {
    dispatch(closeSidebar());
  };

  return (
    <div className={rootClassName}>
      <Link href={`${WEB_APP_ROOT_DIR}/blogs/${id}`}>
        <a>
          <div className='d-flex pointer' onClick={closeSidebarHandler}>
            <Avatar imgUrl={imgUrl} size='medium' className={classes.avatar} />
            <div className='d-flex align-items-center'>
              <div>
                <h4 className='m-0'>{name}</h4>
                {bio && <p className={classes.bio}>{bio}</p>}
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};
