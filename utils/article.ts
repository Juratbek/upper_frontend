import { IHeadProps } from 'components/lib';
import { IBlockData } from 'components/molecules';
import { ARTICLE_BUCKET_URL } from 'store/apis';
import { IArticle } from 'types';
import { BLOCK_TYPES } from 'variables';

import { compressDataImage, compressUnsplashImage } from './image';

export const validateArticle = ({
  blocks,
}: {
  blocks: IBlockData[];
}): { message: string; reason?: 'image' | 'title' | 'labels'; isValid: boolean } => {
  // check if article has a title
  const title = blocks.find((block) => block.type === BLOCK_TYPES.header)?.data.text;
  if (!title)
    return {
      message: "Maqolada kamida bitta sarlavha bo'lishi zarur",
      reason: 'title',
      isValid: false,
    };

  // return valid
  return { message: '', isValid: true };
};

export const addAmazonBucketUriToArticle = <T extends { imgUrl: string }>(article: T): T => {
  const imgUrl = article.imgUrl;
  if (!imgUrl || imgUrl === 'null' || imgUrl.startsWith('http')) return article;
  return { ...article, imgUrl: `${ARTICLE_BUCKET_URL}${imgUrl}` };
};

export const addUriToArticleImages = <T extends { imgUrl: string }>(articles: T[] = []): T[] =>
  articles.map(addAmazonBucketUriToArticle);

export const addUriToImageBlocks = (blocks: IBlockData[]): IBlockData[] =>
  blocks.map((block) => {
    const blockType = block.type;
    const data = block.data;
    if (blockType === BLOCK_TYPES.image && data.file?.url && !data.file.url.startsWith('http')) {
      return {
        ...block,
        data: { ...data, file: { url: `${ARTICLE_BUCKET_URL}${data.file.url}` } },
      };
    }

    const url = block.data.url as string;
    if (blockType === BLOCK_TYPES.unsplash && !url.startsWith('http'))
      return { ...block, data: { ...block.data, url: `${ARTICLE_BUCKET_URL}${block.data.url}` } };

    return block;
  });

export const removeAmazonUriFromImgBlocks = async (
  blocks: IBlockData[],
): Promise<[IBlockData[], boolean]> => {
  let isReset = false;

  const updatedBlocks = blocks.map(async (block): Promise<IBlockData> => {
    const blockType = block.type;

    const img = block.data?.file;
    if (blockType === BLOCK_TYPES.image && img) {
      const imgUrl = img.url as string;

      if (imgUrl.startsWith('data:')) {
        isReset = true;
        return block;
      }

      if (!imgUrl || !imgUrl.startsWith(ARTICLE_BUCKET_URL)) return block;
      const imgUrlWithoutUri = imgUrl.replaceAll(ARTICLE_BUCKET_URL, '');

      return { ...block, data: { ...block.data, file: { ...img, url: imgUrlWithoutUri } } };
    }

    if (blockType === BLOCK_TYPES.unsplash) {
      const data = block.data;
      const url = data.url as string;

      if (url.startsWith('data:')) {
        isReset = true;
        const compressedImage = await compressDataImage(url);
        return { ...block, data: { ...data, url: compressedImage } };
      }

      if (url.startsWith(ARTICLE_BUCKET_URL)) {
        const imgUrlWithoutUri = url.replaceAll(ARTICLE_BUCKET_URL, '');
        return { ...block, data: { ...data, url: imgUrlWithoutUri } };
      }

      return compressUnsplashImage(block);
    }

    if (blockType === BLOCK_TYPES.embed) {
      const data = block.data;
      const embedUrl = data.embed?.replaceAll('amp;', '');
      const sourceUrl = data.source?.replaceAll('amp;', '');

      return { ...block, data: { ...data, embed: embedUrl, source: sourceUrl } };
    }

    return block;
  });
  const results = await Promise.all(updatedBlocks);
  return [results, isReset];
};

export const convertToHeadProp = (article: IArticle): IHeadProps => {
  const { title, imgUrl = '', textContent, author, publishedDate } = article;
  return {
    title,
    imgUrl,
    url: '',
    description: textContent,
    author: author?.name,
    publishedDate,
  };
};
