import { TUTORIAL_BUCKET_URL } from 'store/apis';
import { ITutorialSection } from 'types';

import { addAmazonBucketUri } from './common';

export const addTutorialAmazonUri = <T extends { imgUrl: string }>(tutorial: T): T =>
  addAmazonBucketUri(tutorial, TUTORIAL_BUCKET_URL);

export const removeSection = (
  sections: ITutorialSection[],
  sectionId: string,
): ITutorialSection[] => sections.filter((section) => section.id !== sectionId);
