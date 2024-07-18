import { Avatar } from 'components/lib';
import { WEB_APP_ROOT_DIR } from 'constants/common';
import Link from 'next/link';
import { FC } from 'react';

import classes from './Follower.module.scss';
import { IFollowerProps } from './Follower.types';

export const Follower: FC<IFollowerProps> = ({ imgUrl, className, name, id }) => {
  return (
    <div className={className}>
      <Link href={`${WEB_APP_ROOT_DIR}/blogs/${id}`}>
        <div className={`d-flex align-items-center mb-1 pointer`}>
          <Avatar imgUrl={imgUrl} size='medium' className={classes.avatar} />
          <h4 className='m-0'>{name}</h4>
        </div>
      </Link>
    </div>
  );
};
