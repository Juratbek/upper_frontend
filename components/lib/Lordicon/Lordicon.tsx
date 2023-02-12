import Image, { ImageProps } from 'next/image';
import { FC } from 'react';

import classes from './Lordicon.module.scss';

export const Lordicon: FC<ImageProps> = ({ className, ...props }) => {
  return (
    <div className={className}>
      <Image {...props} />
      {!props.hidden && (
        <a className={classes.link} href='https://lordicon.com/'>
          Animated icons by Lordicon.com
        </a>
      )}
    </div>
  );
};
