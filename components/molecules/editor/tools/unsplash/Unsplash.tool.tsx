import { FC } from 'react';

import { IToolProps } from '../tool.types';
import cls from './Unsplash.module.scss';
import { IUnsplashData } from './Unsplash.types';

export const Unsplash: FC<IToolProps<IUnsplashData>> = ({ data }) => {
  const { unsplash } = data;
  return (
    <div>
      <img className={cls.img} src={data.url} alt='Image from unsplash' />
      {unsplash && (
        <div className={cls.author}>
          <a href='https://unsplash.com/?utm_source=udas&utm_medium=referral'>Unsplash</a>da{' '}
          <a href={`${unsplash.profileLink}?utm_source=udas&utm_medium=referral`}>
            {unsplash.author}
          </a>{' '}
          tomonidan
        </div>
      )}
    </div>
  );
};
