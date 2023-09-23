import { OutputBlockData } from '@editorjs/editorjs';
import {
  EndpointBuilder,
  MutationDefinition,
} from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { IArticle, ILabel } from 'types';

import { TBaseQuery } from '../config';
import { ICreateArticleDto } from './article.types';

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

export const updateBlocks = (
  build: TArticleEndpointBuilder,
): TArticleMutationDefinition<IArticle, { id: number; blocks: OutputBlockData[] }> =>
  build.mutation({
    query: ({ id, blocks }) => ({
      url: `update-blocks/${id}`,
      method: 'POST',
      body: blocks,
    }),
  });

export const updateLabels = (
  build: TArticleEndpointBuilder,
): TArticleMutationDefinition<IArticle, { id: number; labels: ILabel[] }> =>
  build.mutation({
    query: ({ id, labels }) => ({
      url: `update-labels/${id}`,
      method: 'POST',
      body: labels,
    }),
  });
