import { OutputBlockData } from '@editorjs/editorjs';
import { ARTICLE_BUCKET_URL } from 'store/apis';
import { IArticle, IArticleResult } from 'types';

export const validateArticle = (article: IArticle, blocks: OutputBlockData[]): string => {
  const title = blocks.find((block) => block.type === 'header')?.data.text;
  const mainImg = blocks.find((block) => block.type === 'unsplash' || block.type === 'image');
  if (!mainImg) return 'Kamida bitta rasm bo`lishi kerak';
  if (!title) return 'Maqola sarlavhasini kiriting';
  if (article.labels.length === 0) return 'Iltimos teglarni tanlang';
  return '';
};

export const addUriToArticleImages = (articles: IArticleResult[] = []): IArticleResult[] =>
  articles.map((article) => {
    const imgUrl = article.imgUrl;
    if (!imgUrl || imgUrl === 'null' || imgUrl.startsWith('http')) return article;
    return { ...article, imgUrl: `${ARTICLE_BUCKET_URL}${imgUrl}` };
  });

export const addUriToImageBlocks = (blocks: OutputBlockData[]): OutputBlockData[] =>
  blocks.map((block) => {
    if (block.type === 'image')
      return { ...block, data: { file: { url: `${ARTICLE_BUCKET_URL}${block.data.file.url}` } } };
    return block;
  });

export const removeAmazonUriFromImgBlocks = (blocks: OutputBlockData[]): OutputBlockData[] =>
  blocks.map((block) => {
    if (block.type !== 'image') return block;
    const img = block.data.file;
    const imgUrl = img.url as string;
    if (imgUrl.startsWith(ARTICLE_BUCKET_URL)) {
      const imgUrlWithoutUri = imgUrl.replaceAll(ARTICLE_BUCKET_URL, '');
      return {
        ...block,
        data: {
          file: {
            ...img,
            url: imgUrlWithoutUri,
          },
        },
      };
    }
    return block;
  });
