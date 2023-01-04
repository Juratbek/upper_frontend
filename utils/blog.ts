import { IHeadProps } from 'components';
import { BLOG_BUCKET_URL } from 'store/apis';
import { IBlog, IBlogSmall, ILink } from 'types';

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
const telegramUrl = 't.me/';

export const prefixHttp = (link: string): string => {
  if (link.startsWith(https) || link.startsWith(http) || link.startsWith('//')) return link;
  return `//${link}`;
};

export const prefixTelegramLink = (links: Array<ILink>): void => {
  const targetSocialMedia = links.find((socialMedia) => socialMedia.type === 'telegram');
  if (!targetSocialMedia) return;
  const telegramLink = targetSocialMedia.link;
  if (
    telegramLink.startsWith(https) ||
    telegramLink.startsWith(http) ||
    telegramLink.startsWith(telegramUrl)
  )
    return;

  targetSocialMedia.link = `t.me/${telegramLink}`;
};

export const convertBlogToHeadProp = (blog: IBlog): IHeadProps => {
  const { name, imgUrl, bio } = blog;
  return {
    title: name,
    imgUrl,
    url: '',
    description: bio,
    type: 'blog',
  };
};
