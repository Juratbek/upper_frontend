import { IHeadProps } from 'components';
import { BLOG_BUCKET_URL } from 'store/apis';
import { IBlog, IBlogSmall, ILink, TIcon } from 'types';

export const addAmazonUri = <T extends IBlogSmall>(blog: T): T => {
  const imgUrl = blog.imgUrl;
  if (!imgUrl || imgUrl.startsWith('http')) return blog;
  return {
    ...blog,
    imgUrl: `${BLOG_BUCKET_URL}${imgUrl}`,
  };
};

const https = 'https://';
const http = 'http://';

const LINK_DOMAINS: Partial<{ [name in TIcon]: string }> = {
  telegram: 't.me',
};

export const addLinkPrefix = (linkObject: ILink): string => {
  const { link, type } = linkObject;
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
