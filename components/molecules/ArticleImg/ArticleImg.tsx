import Image from 'next/image';
import { FC } from 'react';
import { getClassName } from 'utils';
import { isDomainRegistered } from 'utils/image/is-domain-registered';

import classes from './ArticleImg.module.scss';
import { IArticleImgProps } from './ArticleImg.types';

export const ArticleImg: FC<IArticleImgProps> = ({ className, size = 'medium', imgUrl }) => {
  const rootClassName = getClassName(
    className,
    classes['article-img'],
    classes[`article-img--${size}`],
  );

  if (!imgUrl) return;
  const isAllowedDomain = isDomainRegistered(imgUrl);

  if (isAllowedDomain)
    return (
      <div className={rootClassName}>
        <Image
          blurDataURL={`data:${imgUrl}`}
          placeholder='blur'
          src={imgUrl}
          alt='UPPER'
          layout='fill'
          objectFit='cover'
        />
      </div>
    );

  return (
    <div className={rootClassName}>
      <img src={imgUrl} className={classes.img} />
    </div>
  );
};
