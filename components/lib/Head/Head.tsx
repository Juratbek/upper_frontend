import NextHead from 'next/head';
import { FC, useMemo } from 'react';

import { IHeadProps } from './Head.types';

export const Head: FC<IHeadProps> = (props) => {
  const { title, imgUrl, type, url, author, publishedDate } = props;

  const description = useMemo(() => {
    const { description } = props;
    if (!description) return '';
    try {
      const div = document.createElement('div');
      div.innerHTML = description;
      return div.textContent;
    } catch (e) {
      return '';
    }
  }, [props.description]);

  return (
    <NextHead>
      <meta property='og:site_name' content='UPPER' />
      <meta property='og:title' content={title} key='og-title' />
      <meta property='og:image' content={imgUrl || '/social_medi_logo.png'} />
      <meta property='og:image:url' content={imgUrl || '/social_medi_logo.png'} />
      <meta property='og:type' content={type || ''} />
      <meta property='og:locale' content='uz' />
      <meta property='og:url' content={url} />
      <meta name='author' content={author || ''} />
      <meta name='published_date' content={publishedDate || ''} />
      <meta name='description' content={description || ''} />
      <title key='title'>{title}</title>
      {props.children}
    </NextHead>
  );
};
