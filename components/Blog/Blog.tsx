import { Avatar } from 'components';
import { useModal, useTheme } from 'hooks';
import Link from 'next/link';
import { FC, useCallback } from 'react';
import { ILink } from 'types';
import { addLinkPrefix, getClassName } from 'utils';
import { ICONS, WEB_APP_ROOT_DIR } from 'variables';

import classes from './Blog.module.scss';
import { IBlogProps } from './Blog.types';

export const Blog: FC<IBlogProps> = ({ imgUrl, name, bio, avatarSize = 'large', ...props }) => {
  const { className, isLink, id, links = [] } = props;
  const rootClassName = getClassName(classes.blog, className);

  const getBlog = useCallback(
    (className?: string) => (
      <div className={`d-flex align-items-center mb-1 ${className}`}>
        <Avatar
          imgUrl={imgUrl}
          size={avatarSize}
          className={classes.avatar}
          zoomable={!isLink ?? true}
        />
        <div className='position-relative flex-1'>
          <h2 className='m-0'>{name}</h2>
          <div className={classes['social-media-links']}>
            {links?.map((link) => (
              <a key={link.link} href={addLinkPrefix(link)} target='_blank' rel='noreferrer'>
                <HoverableIcon {...link} />
              </a>
            ))}
          </div>
        </div>
      </div>
    ),
    [name, imgUrl],
  );

  return (
    <div className={rootClassName}>
      {isLink ? (
        <Link href={`${WEB_APP_ROOT_DIR}/blogs/${id}`}>{getBlog('pointer')}</Link>
      ) : (
        getBlog()
      )}
      <div>{bio && <p className={`${classes.bio} m-0`}>{bio}</p>}</div>
    </div>
  );
};

function HoverableIcon(link: ILink): JSX.Element {
  const [isHovered, toggleIsHovered] = useModal(false);
  const { themeColors } = useTheme();
  const Icon = ICONS[link.type];

  return (
    <span className={classes.icon} onMouseEnter={toggleIsHovered} onMouseLeave={toggleIsHovered}>
      <Icon color={isHovered ? themeColors.icon : 'gray'} />
    </span>
  );
}
