import { TRootState } from 'store/store';
import { IBlogSmall } from 'types';

export const getTutorialAuthor = (store: TRootState): IBlogSmall | undefined =>
  store.publishedTutorialSidebar.author;
