import { IHeadProps } from 'components/lib';
import { IBlog, ILink } from 'types';

const https = 'https://';
const http = 'http://';

const LINK_DOMAINS: Record<string, string> = {
  telegram: 't.me',
} as const;

export const addLinkPrefix = (linkObject: ILink): string => {
  const { link, type } = linkObject;
  // if link starts with http, https or // it should already be valid
  if (link.startsWith(https) || link.startsWith(http) || link.startsWith('//')) return link;

  // if link is telegram username check its validity
  if (type === 'telegram') {
    if (link.startsWith('@')) return `https://${LINK_DOMAINS[type]}/${link.replace('@', '')}`;
    if (link.startsWith('t.me')) return `https://${link}`;
  }

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
