import Image from 'next/image';
import { FC } from 'react';
import { getClassName } from 'utils';

import classes from './ArticleImg.module.css';
import { IArticleImgProps } from './ArticleImg.types';

export const ArticleImg: FC<IArticleImgProps> = ({ className, size = 'medium' }) => {
  const rootClassName = getClassName(
    className,
    classes['article-img'],
    classes[`article-img--${size}`],
  );

  return (
    <div className={rootClassName}>
      <Image src='/vercel.svg' alt='Vercel Logo' layout='fill' />
    </div>
  );
};
