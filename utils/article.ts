import { OutputBlockData } from '@editorjs/editorjs';
import { IHeadProps } from 'components';
import { ARTICLE_BUCKET_URL } from 'store/apis';
import { IArticle, ISidebarArticle } from 'types';
import { BLOCK_TYPES } from 'variables';

import { compressDataImage, compressUnsplashImage } from './image';

export const validateArticle = (article: IArticle, blocks: OutputBlockData[]): string => {
  const title = blocks.find((block) => block.type === BLOCK_TYPES.header)?.data.text;
  const mainImg = blocks.find(
    (block) => block.type === BLOCK_TYPES.unsplash || block.type === BLOCK_TYPES.image,
  );
  if (!mainImg) return 'Kamida bitta rasm bo`lishi kerak';
  if (!title) return 'Maqola sarlavhasini kiriting';
  if (article.labels.length === 0) return 'Iltimos teglarni tanlang';
  return '';
};

export const addAmazonBucketUriToArticle = <T extends ISidebarArticle>(article: T): T => {
  const imgUrl = article.imgUrl;
  if (!imgUrl || imgUrl === 'null' || imgUrl.startsWith('http')) return article;
  return { ...article, imgUrl: `${ARTICLE_BUCKET_URL}${imgUrl}` };
};

export const addUriToArticleImages = <T extends ISidebarArticle>(articles: T[] = []): T[] =>
  articles.map(addAmazonBucketUriToArticle);

export const addUriToImageBlocks = (blocks: OutputBlockData[]): OutputBlockData[] =>
  blocks.map((block) => {
    const blockType = block.type;
    if (blockType === BLOCK_TYPES.image) {
      const data = block.data;
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
  blocks: OutputBlockData[],
): Promise<[OutputBlockData[], boolean]> => {
  let isReset = false;

  const updatedBlocks = blocks.map(async (block): Promise<OutputBlockData> => {
    const blockType = block.type;

    if (blockType === BLOCK_TYPES.image) {
      const img = block.data.file;
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
  const { title, imgUrl = '', content, author, publishedDate } = article;
  return {
    title,
    imgUrl,
    url: '',
    description: content,
    author: author.name,
    publishedDate,
    type: 'article',
  };
};
