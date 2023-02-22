import { IHeadProps } from 'components';
import { BLOG_BUCKET_URL } from 'store/apis';
import { IBlog, ILink, TIcon } from 'types';

import { addAmazonBucketUri } from './common';

export const addAmazonUri = <T extends { imgUrl: string }>(blog: T): T =>
  addAmazonBucketUri(blog, BLOG_BUCKET_URL);

const https = 'https://';
const http = 'http://';

const LINK_DOMAINS: Partial<{ [name in TIcon]: string }> = {
  telegram: 't.me',
};

export const addLinkPrefix = (linkObject: ILink): string => {
  const { link, type } = linkObject;
  if (link.startsWith('t.me')) return `https://${link}`;

  if (link.startsWith(https) || link.startsWith(http) || link.startsWith('//')) return link;
  const domain = LINK_DOMAINS[type];

  if (domain)
    return link.startsWith('/') ? `https://${domain}${link}` : `https://${domain}/${link}`;

  return `//${link}`;
};

export const convertBlogToHeadProp = (blog: IBlog): IHeadProps => {
  const { name, imgUrl, bio } = blog;
  return {
    title: name,
    imgUrl,
    url: '',
    description: bio,
  };
};
