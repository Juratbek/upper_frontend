import { ARTICLE_BUCKET_URL } from 'store/apis';
import { IPublishedArticleItem } from 'types';

export const addAmazonBucketUrl = <T extends IPublishedArticleItem>(article: T): T => {
  const imgUrl = article.imgUrl;
  if (!imgUrl || imgUrl === 'null' || imgUrl.startsWith('http')) return article;
  return { ...article, imgUrl: `${ARTICLE_BUCKET_URL}${imgUrl}` };
};
