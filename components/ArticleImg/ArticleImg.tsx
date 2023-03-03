import Image from 'next/image';
import { FC } from 'react';
import { getClassName } from 'utils';

import classes from './ArticleImg.module.scss';
import { IArticleImgProps } from './ArticleImg.types';

export const ArticleImg: FC<IArticleImgProps> = ({
  className,
  size = 'medium',
  imgUrl = 'https://images.unsplash.com/photo-1612538498456-e861df91d4d0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80',
}) => {
  const rootClassName = getClassName(
    className,
    classes['article-img'],
    classes[`article-img--${size}`],
  );

  return (
    <div className={rootClassName}>
      {imgUrl && (
        <Image
          blurDataURL={`data:${imgUrl}`}
          placeholder='blur'
          src={imgUrl}
          alt='UPPER'
          layout='fill'
          objectFit='cover'
        />
      )}
    </div>
  );
};
