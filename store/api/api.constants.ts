import { articleApi } from '../article/article.api';
import { blogApi } from '../blog/blog.api';

export const BASE_URL = 'https://backend.uper.uz';

export const REDUCER_PATHS: Record<string, string> = {
  blog: blogApi.reducerPath,
  article: articleApi.reducerPath,
};
