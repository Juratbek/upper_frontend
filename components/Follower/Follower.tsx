import { Avatar } from 'components';
import Link from 'next/link';
import { FC } from 'react';
import { WEB_APP_ROOT_DIR } from 'variables';

import classes from './Follower.module.scss';
import { IFollowerProps } from './Follower.types';

export const Follower: FC<IFollowerProps> = ({ imgUrl, className, name, id }) => {
  return (
    <div className={className}>
      <Link href={`${WEB_APP_ROOT_DIR}/blogs/${id}`}>
        <a>
          <div className={`d-flex align-items-center mb-1 pointer`}>
            <Avatar imgUrl={imgUrl} size='medium' className={classes.avatar} />
            <h4 className='m-0'>{name}</h4>
          </div>
        </a>
      </Link>
    </div>
  );
};
