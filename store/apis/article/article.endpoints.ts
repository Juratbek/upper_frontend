import {
  EndpointBuilder,
  MutationDefinition,
} from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { IArticle, TArticleStatus } from 'types';

import { TBaseQuery } from '../config';
import { ICreateArticleDto, IUpdateArticleDto } from './article.types';

type TMutationDefinition<TResult, TQueryArg, TReducerPath extends string> = MutationDefinition<
  TQueryArg,
  TBaseQuery,
  never,
  TResult,
  TReducerPath
>;

type TEndpointBuilder<TReducerPath extends string> = EndpointBuilder<
  TBaseQuery,
  never,
  TReducerPath
>;

type TArticleEndpointBuilder = TEndpointBuilder<'article'>;

type TArticleMutationDefinition<TResult, TQueryArg> = TMutationDefinition<
  TResult,
  TQueryArg,
  'article'
>;

export const create = (
  build: TArticleEndpointBuilder,
): TArticleMutationDefinition<IArticle, ICreateArticleDto> =>
  build.mutation({
    query: (body) => ({
      url: 'create',
      method: 'POST',
      body,
    }),
  });

export const update = (
  build: TArticleEndpointBuilder,
): TArticleMutationDefinition<IArticle, IUpdateArticleDto> =>
  build.mutation({
    query: (body) => ({
      url: 'update',
      method: 'POST',
      body,
    }),
  });

export const likeDislike = (
  build: TArticleEndpointBuilder,
): TArticleMutationDefinition<void, { id: number; value: -1 | 1 }> =>
  build.mutation({
    query: ({ id, value }) => ({
      url: `like-dislike/${id}?value=${value}`,
      method: 'POST',
    }),
  });

export const incrementViewCount = (
  build: TArticleEndpointBuilder,
): TArticleMutationDefinition<void, number> =>
  build.mutation({
    query: (id) => ({
      url: `increment-view-count/${id}`,
      method: 'POST',
    }),
  });

export const updateStatus = (
  build: TArticleEndpointBuilder,
): TArticleMutationDefinition<IArticle, { id: number; status: TArticleStatus }> =>
  build.mutation({
    query: ({ id, status }) => ({
      url: `update-status/${id}`,
      method: 'POST',
      body: { status },
    }),
  });
