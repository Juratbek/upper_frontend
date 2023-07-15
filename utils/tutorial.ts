import { TUTORIAL_BUCKET_URL } from 'store/apis';
import { ITutorialSection } from 'types';

import { addAmazonBucketUri } from './common';

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
    const articles = section.items;
    section.items = articles.filter((item) => item.id !== articleId);
    return section;
  });

export const validateTutorial = (
  sections: ITutorialSection[],
): {
  isValid: boolean;
  message: string;
  cause?: 'empty-section' | 'article-not-assigned' | 'empty-tuturial';
  sectionId?: string;
  itemId?: string;
} => {
  const res = { isValid: true, message: '' };
  // checking if tutorial has sections
  if (sections.length < 1) {
    return { isValid: false, message: "Bo'limlar qo'shilmagan", cause: 'empty-tuturial' };
  }

  // checking sections
  for (const section of sections) {
    const { items } = section;

    // checking if all sections have at least one item
    if (items && items.length === 0) {
      return {
        isValid: false,
        message: `"${section.name}" bo'limiga maqolalar qo'shilmagan`,
        cause: 'empty-section',
      };
    }

    // checking if all section items have been assigned to articles
    for (const item of items) {
      if (!item.articleId) {
        return {
          isValid: false,
          message: `"${section.name}" bo'limida "${item.name}" uchun maqola biriktirilmagan`,
          sectionId: section.id,
          itemId: item.id,
          cause: 'article-not-assigned',
        };
      }
    }
  }

  return res;
};
