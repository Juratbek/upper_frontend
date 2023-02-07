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
    const articles = section.articles;
    section.articles = articles.filter((article) => article.id !== articleId);
    return section;
  });
