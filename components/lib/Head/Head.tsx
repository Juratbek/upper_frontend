import NextHead from 'next/head';
import { FC } from 'react';

import { IHeadProps } from './Head.types';

export const Head: FC<IHeadProps> = (props) => {
  const {
    title,
    imgUrl = '/social_medi_logo.png',
    url,
    author,
    publishedDate,
    description = '',
  } = props;
  return (
    <NextHead>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name='title' content={title} />
      <meta name='description' content={description} />
      <meta name='author' content={author ?? ''} />
      <meta name='published_date' content={publishedDate ?? ''} />

      {/* Open Graph / Facebook */}
      <meta property='og:type' content='website' />
      <meta property='og:url' content={url} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={imgUrl} />
      <meta property='og:image:width' content='1200' />
      <meta property='og:image:height' content='630' />
      <meta property='og:locale' content='uz' />
      <meta property='og:site_name' content='upper.uz' />

      {/* Twitter */}
      <meta name='twitter:card' property='twitter:card' content='summary_large_image' />
      <meta property='twitter:url' content={url} />
      <meta property='twitter:title' content={title} />
      <meta property='twitter:description' content={description} />
      <meta property='twitter:image' content={imgUrl} />

      {props.children}
    </NextHead>
  );
};
