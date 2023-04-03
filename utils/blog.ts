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
  let checkedLink = '';
  if (type === 'telegram') checkedLink = link.replace('@', '');
  else checkedLink = link;
  if (checkedLink.startsWith('t.me')) return `https://${checkedLink}`;

  if (checkedLink.startsWith(https) || checkedLink.startsWith(http) || checkedLink.startsWith('//'))
    return checkedLink;
  const domain = LINK_DOMAINS[type];

  if (domain)
    return checkedLink.startsWith('/')
      ? `https://${domain}${checkedLink}`
      : `https://${domain}/${checkedLink}`;

  return `//${checkedLink}`;
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
