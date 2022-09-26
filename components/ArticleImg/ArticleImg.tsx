import Image from 'next/image';
import { FC } from 'react';
import { getClassName } from 'utils';

import classes from './ArticleImg.module.css';
import { IArticleImgProps } from './ArticleImg.types';

export const ArticleImg: FC<IArticleImgProps> = ({ className, size = 'medium', imgUrl }) => {
  const rootClassName = getClassName(
    className,
    classes['article-img'],
    classes[`article-img--${size}`],
  );

  return (
    <div className={rootClassName}>
      {imgUrl ? (
        <Image src={imgUrl} alt='Vercel Logo' layout='fill' objectFit='contain' />
      ) : (
        <Image src='/vercel.svg' alt='Vercel Logo' layout='fill' />
      )}
    </div>
  );
};
