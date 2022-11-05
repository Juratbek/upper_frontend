import { BLOG_BUCKET_URL } from 'store/apis';
import { IBlogSmall } from 'types';

export const addAmazonUri = <T extends IBlogSmall>(blog: T): T => {
  const imgUrl = blog.imgUrl;
  if (!imgUrl || imgUrl.startsWith('http')) return blog;
  return {
    ...blog,
    imgUrl: `${BLOG_BUCKET_URL}${imgUrl}`,
  };
};
