import NextHead from 'next/head';
import { FC } from 'react';

import { IHeadProps } from './Head.types';

export const Head: FC<IHeadProps> = (props) => {
  const { title, imgUrl, description, type, url, author, publishedDate } = props;
  return (
    <NextHead>
      <meta property='og:site_name' content='UPPER' />
      <meta property='og:title' content={title} />
      <meta property='og:image' content={imgUrl} />
      <meta property='og:description' content={description || ''} />
      <meta property='og:type' content={type || ''} />
      <meta property='og:locale' content='uz' />
      <meta property='og:url' content={url} />
      <meta name='author' content={author || ''} />
      <meta name='published_date' content={publishedDate || ''} />
      <meta name='description' content={description || ''} key='description' />
      <title key='title'>{title}</title>
      {props.children}
    </NextHead>
  );
};
