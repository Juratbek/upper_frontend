import { TUTORIAL_BUCKET_URL } from 'store/apis';
import { ITutorialSection } from 'types';

import { addAmazonBucketUri } from './common/common';

export const addTutorialAmazonUri = <T extends { imgUrl: string }>(tutorial: T): T =>
  addAmazonBucketUri(tutorial, TUTORIAL_BUCKET_URL);

export const removeSection = (
  sections: ITutorialSection[],
  sectionId: string,
): ITutorialSection[] => sections.filter((section) => section.id !== sectionId);

export const removeArticle = (
  sections: ITutorialSection[],
  articleId: string,
): ITutorialSection[] =>
  sections.map((section) => {
    const articles = section.articles;
    section.articles = articles.filter((article) => article.id !== articleId);
    return section;
  });

export const validateTutorial = (
  sections: ITutorialSection[],
): {
  isValid: boolean;
  message: string;
  cause?: 'empty-section' | 'article-not-assigned' | 'empty-tuturial';
  sectionId?: string;
  articleId?: string;
} => {
  const res = { isValid: true, message: '' };
  // checking if tutorial has sections
  if (sections.length < 1) {
    return { isValid: false, message: "Bo'limlar qo'shilmagan", cause: 'empty-tuturial' };
  }
  for (const section of sections) {
    const articles = section.articles;
    // checking if all sections have at least one article
    if (articles.length === 0) {
      return {
        isValid: false,
        message: `"${section.name}" bo'limiga maqolalar qo'shilmagan`,
        cause: 'empty-section',
      };
    }

    // checking if all articles has been assigned to a published article
    for (const article of articles) {
      if (!article.articleId) {
        return {
          isValid: false,
          message: `"${section.name}" bo'limida "${article.name}" uchun maqola biriktirilmagan`,
          sectionId: section.id,
          articleId: article.id,
          cause: 'article-not-assigned',
        };
      }
    }
  }

  return res;
};
