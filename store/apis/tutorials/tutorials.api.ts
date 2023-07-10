import { createApi } from '@reduxjs/toolkit/query/react';
import {
  IPagingResponse,
  ITutorial,
  ITutorialMedium,
  ITutorialSection,
  ITutorialSectionItem,
  TOptionalPagingRequest,
} from 'types';

import { baseQuery } from '../config';
import {
  IChangeTutorialSelectedArticleDto,
  IRemoveArticleDto,
  IRemoveSectionDto,
  ISaveSectionDto,
  ISaveSectionItemDto,
} from './tutorials.types';

export const tutorialApi = createApi({
  reducerPath: 'tutorial',
  baseQuery: baseQuery('tutorial'),
  endpoints: (build) => ({
    create: build.mutation<ITutorial, void>({
      query: () => ({
        url: 'create',
        method: 'POST',
      }),
    }),
    changeName: build.mutation<void, { id: number; name: string }>({
      query: (body) => ({
        url: 'change-name',
        method: 'PUT',
        body,
      }),
    }),
    saveSection: build.mutation<ITutorialSection, ISaveSectionDto>({
      query: (body) => ({
        url: 'save-section',
        method: 'PUT',
        body,
      }),
    }),
    saveSectionItem: build.mutation<ITutorialSectionItem, ISaveSectionItemDto>({
      query: (body) => ({
        url: 'save-section-item',
        method: 'PUT',
        body,
      }),
    }),
    getAll: build.query<IPagingResponse<ITutorialMedium>, TOptionalPagingRequest>({
      query: () => 'list',
    }),
    getById: build.query<ITutorial, number>({
      query: (id) => id.toString(),
    }),
    changeArticle: build.mutation<void, IChangeTutorialSelectedArticleDto>({
      query: (body) => ({
        url: 'select-article',
        method: 'PUT',
        body,
      }),
    }),
    publish: build.mutation<void, FormData>({
      query: (body) => ({
        url: 'publish',
        method: 'PUT',
        body,
      }),
    }),
    removeSection: build.mutation<void, IRemoveSectionDto>({
      query: (body) => ({
        url: 'remove-section',
        method: 'PUT',
        body,
      }),
    }),
    removeArticle: build.mutation<void, IRemoveArticleDto>({
      query: (body) => ({
        url: 'remove-article',
        method: 'PUT',
        body,
      }),
    }),
  }),
});

export const {
  useLazyGetAllQuery: useLazyGetAllTutorialsQuery,
  useCreateMutation: useCreateTutorialMutation,
  useChangeNameMutation: useChangeTutorialNameMutation,
  useLazyGetByIdQuery: useLazyGetTutorialByIdQuery,
  useSaveSectionMutation: useSaveTutorialSectionMutation,
  useSaveSectionItemMutation: useSaveTutorialSectionItemMutation,
  useChangeArticleMutation: useChangeTutorialSelectedArticleMutation,
  usePublishMutation: usePublishTutorialMutation,
  useRemoveArticleMutation: useRemoveTutorialArticleMutation,
  useRemoveSectionMutation,
} = tutorialApi;
