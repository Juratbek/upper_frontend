import { TRootState } from 'store/store';
import { IBlogMedium } from 'types';

export const getArticleAuthor = (store: TRootState): IBlogMedium | null => store.readArticle.author;
