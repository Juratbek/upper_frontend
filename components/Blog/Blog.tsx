import Image from 'next/image';
import { FC } from 'react';

import classes from './Blog.module.css';
import { IBlogProps } from './Blog.types';

export const Blog: FC<IBlogProps> = ({ name }) => {
  return (
    <div className={classes.blog}>
      <div className={classes.avatar}>
        <Image src='/vercel.svg' alt='Vercel Logo' width={32} height={32} />
      </div>
      <h4 className='m-0'>{name}</h4>
    </div>
  );
};
