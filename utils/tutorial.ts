import { TUTORIAL_BUCKET_URL } from 'store/apis';

export const addTutorialAmazonUri = <T extends { imgUrl: string }>(blog: T): T => {
  const imgUrl = blog.imgUrl;
  if (!imgUrl || imgUrl.startsWith('http')) return blog;
  return {
    ...blog,
    imgUrl: `${TUTORIAL_BUCKET_URL}${imgUrl}`,
  };
};
