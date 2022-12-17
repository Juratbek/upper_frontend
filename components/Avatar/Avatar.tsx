import Image from 'next/image';
import { FC, useState } from 'react';
import { getClassName } from 'utils';

import { ImageModal } from '../ImageModal';
import classes from './Avatar.module.scss';
import { IAvatarProps } from './Avatar.types';

export const Avatar: FC<IAvatarProps> = ({ size = 'medium', imgUrl, ...props }) => {
  const [avatarImg, setAvatarImg] = useState<HTMLElement | null>(null);
  const className = getClassName(classes.avatar, classes[`avatar--${size}`], props.className);

  return (
    <>
      <div className={className}>
        {imgUrl ? (
          <Image
            src={imgUrl}
            alt='UPPER'
            layout='fill'
            objectFit='cover'
            onLoad={(e): void => setAvatarImg(e.target as HTMLElement)}
            style={{
              cursor: 'zoom-in',
            }}
          />
        ) : (
          <Image src='/social_medi_logo.png' alt='UPPER' layout='fill' />
        )}
      </div>
      <ImageModal images={avatarImg ? [avatarImg] : []} />
    </>
  );
};
