import { Avatar } from 'components/Avatar/Avatar';
import Link from 'next/link';
import { FC } from 'react';

import classes from './Follower.module.scss';
import { IFollowerProps } from './Follower.types';

export const Follower: FC<IFollowerProps> = ({ imgUrl, className, name, id }) => {
  return (
    <div className={className}>
      <Link href={`/blogs/${id}`}>
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
