import { TUTORIAL_BUCKET_URL } from 'store/apis';

import { addAmazonBucketUri } from './common';

export const addTutorialAmazonUri = <T extends { imgUrl: string }>(tutorial: T): T =>
  addAmazonBucketUri(tutorial, TUTORIAL_BUCKET_URL);
