import Image, { ImageProps } from 'next/image';
import { FC } from 'react';

import classes from './Lordicon.module.scss';

export const Lordicon: FC<ImageProps> = ({ className, ...props }) => {
  return (
    <div className={className}>
      <Image {...props} />
      {!props.hidden && (
        <a className={classes.link} target='_blank' href='https://lordicon.com/' rel='noreferrer'>
          Animated icons by Lordicon.com
        </a>
      )}
    </div>
  );
};
