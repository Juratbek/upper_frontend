import { OutputBlockData } from '@editorjs/editorjs';
import { IArticle } from 'types';

export const validateArticle = (article: IArticle, blocks: OutputBlockData[]): string => {
  const title = blocks.find((block) => block.type === 'header')?.data.text;
  const mainImg = blocks.find((block) => block.type === 'unsplash');
  if (!mainImg) return 'Kamida bitta rasm bo`lishi kerak';
  if (!title) return 'Maqola sarlavhasini kiriting';
  if (article.labels.length === 0) return 'Iltimos teglarni tanlang';
  return '';
};
