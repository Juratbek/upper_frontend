import { IHeadProps } from 'components';
import { BLOG_BUCKET_URL } from 'store/apis';
import { IBlog, IBlogSmall } from 'types';

export const addAmazonUri = <T extends IBlogSmall>(blog: T): T => {
  const imgUrl = blog.imgUrl;
  if (!imgUrl || imgUrl.startsWith('http')) return blog;
  return {
    ...blog,
    imgUrl: `${BLOG_BUCKET_URL}${imgUrl}`,
  };
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
