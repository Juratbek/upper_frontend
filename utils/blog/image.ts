import { BLOG_BUCKET_URL } from 'store/apis';

export const addBlogAmazonUrl = <T>(data: { imgUrl: string } | string): T => {
  if (typeof data === 'string') {
    return `${BLOG_BUCKET_URL}${data}` as T;
  }

  if (typeof data === 'object' && Object.hasOwn(data, 'imgUrl')) {
    return {
      ...data,
      imgUrl: `${BLOG_BUCKET_URL}${data.imgUrl}`,
    } as T;
  }

  throw new Error('Unsupported data type. Data should be string or object with imageUrl property');
};
