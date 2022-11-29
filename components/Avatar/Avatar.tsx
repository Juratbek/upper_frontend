import Image from 'next/image';
import { FC } from 'react';
import { getClassName } from 'utils';

import classes from './Avatar.module.scss';
import { IAvatarProps } from './Avatar.types';

export const Avatar: FC<IAvatarProps> = ({ size = 'medium', imgUrl, ...props }) => {
  const className = getClassName(classes.avatar, classes[`avatar--${size}`], props.className);

  return (
    <div className={className}>
      {imgUrl ? (
        <Image src={imgUrl} alt='UPPER' layout='fill' objectFit='cover' />
      ) : (
        <Image src='/social_medi_logo.png' alt='UPPER' layout='fill' />
      )}
    </div>
  );
};
