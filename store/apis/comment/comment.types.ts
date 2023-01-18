import { TOptionalPagingRequest } from 'types';

export type TGetByArticleIdDto = TOptionalPagingRequest<{ articleId: number }>;
