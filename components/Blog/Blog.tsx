import { Avatar } from 'components/Avatar/Avatar';
import Link from 'next/link';
import { FC, useCallback } from 'react';
import { getClassName } from 'utils';
import { ICONS } from 'variables';

import classes from './Blog.module.scss';
import { IBlogProps } from './Blog.types';

export const Blog: FC<IBlogProps> = ({ imgUrl, name, bio, avaratSize = 'large', ...props }) => {
  const { className, isLink, id, links = [] } = props;
  const rootClassName = getClassName(classes.blog, className);

  const prefixHttp = (link: string): string => {
    const protocol = 'https://';
    if (!link.startsWith(protocol) && !link.startsWith('//')) return protocol + link;
    return link;
  };

  const getBlog = useCallback(
    (className?: string) => (
      <div className={`d-flex align-items-center mb-1 ${className}`}>
        <Avatar imgUrl={imgUrl} size={avaratSize} className={classes.avatar} />
        <div className='position-relative'>
          <h2 className='m-0'>{name}</h2>
          <div className={classes['social-media-links']}>
            {links.map((link) => {
              const Icon = ICONS[link.type];
              return (
                <a
                  key={link.link}
                  className={classes.icon}
                  href={prefixHttp(link.link)}
                  target='_blank'
                  rel='noreferrer'
                >
                  <Icon />
                </a>
              );
            })}
          </div>
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
