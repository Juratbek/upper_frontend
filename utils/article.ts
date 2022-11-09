import { OutputBlockData } from '@editorjs/editorjs';
import { ARTICLE_BUCKET_URL } from 'store/apis';
import { IArticle, ISidebarArticle } from 'types';
import { BLOCK_TYPES } from 'variables';

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

export const addUriToArticleImages = <T extends ISidebarArticle>(articles: T[] = []): T[] =>
  articles.map((article) => {
    const imgUrl = article.imgUrl;
    if (!imgUrl || imgUrl === 'null' || imgUrl.startsWith('http')) return article;
    return { ...article, imgUrl: `${ARTICLE_BUCKET_URL}${imgUrl}` };
  });

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

export const removeAmazonUriFromImgBlocks = (blocks: OutputBlockData[]): OutputBlockData[] =>
  blocks.map((block) => {
    const blockType = block.type;
    if (blockType === BLOCK_TYPES.image) {
      const img = block.data.file;
      const imgUrl = img.url as string;
      if (!imgUrl || !imgUrl.startsWith(ARTICLE_BUCKET_URL)) return block;
      const imgUrlWithoutUri = imgUrl.replaceAll(ARTICLE_BUCKET_URL, '');

      return { ...block, data: { ...block.data, file: { ...img, url: imgUrlWithoutUri } } };
    }

    if (blockType === BLOCK_TYPES.unsplash) {
      const data = block.data;
      const url = data.url as string;
      if (!url || !url.startsWith(ARTICLE_BUCKET_URL)) return block;
      const imgUrlWithoutUri = url.replaceAll(ARTICLE_BUCKET_URL, '');
      return { ...block, data: { ...data, url: imgUrlWithoutUri } };
    }

    return block;
  });
