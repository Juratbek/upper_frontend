import { Avatar } from 'components/Avatar/Avatar';
import Link from 'next/link';
import { FC, useCallback } from 'react';
import { getClassName } from 'utils';

import classes from './Blog.module.scss';
import { IBlogProps } from './Blog.types';

export const Blog: FC<IBlogProps> = ({ imgUrl, name, bio, avaratSize = 'large', ...props }) => {
  const { className, isLink, id } = props;
  const rootClassName = getClassName(classes.blog, className);

  const getBlog = useCallback(
    (className?: string) => (
      <div className={`d-flex align-items-center mb-1 ${className}`}>
        <Avatar imgUrl={imgUrl} size={avaratSize} className={classes.avatar} />
        <div>
          <h2 className='m-0'>{name}</h2>
        </div>
      </div>
    ),
    [name, imgUrl],
  );

  return (
    <div className={rootClassName}>
      {isLink ? (
        <Link href={`/blogs/${id}`}>
          <a>{getBlog('pointer')}</a>
        </Link>
      ) : (
        getBlog()
      )}
      <div>{bio && <p className={`${classes.bio} m-0`}>{bio}</p>}</div>
    </div>
  );
};
