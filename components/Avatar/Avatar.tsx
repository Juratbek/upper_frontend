import Image from 'next/image';
import { FC } from 'react';
import { getClassName } from 'utils';

import classes from './Avatar.module.css';
import { IAvatarProps } from './Avatar.types';

export const Avatar: FC<IAvatarProps> = ({ size = 'medium' }) => {
  const className = getClassName(classes.avatar, classes[`avatar--${size}`]);

  return (
    <div className={className}>
      <Image src='/vercel.svg' alt='Vercel Logo' layout='fill' />
    </div>
  );
};
