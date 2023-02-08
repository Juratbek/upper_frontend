import { createApi } from '@reduxjs/toolkit/query/react';
import {
  IPagingResponse,
  ITutorial,
  ITutorialMedium,
  ITutorialSection,
  TOptionalPagingRequest,
} from 'types';

import { baseQuery } from '../config';
import {
  IAddSectionDto,
  IChangeTutorialSelectedArticleDto,
  IEditSectionDto,
  IRemoveArticleDto,
  IRemoveSectionDto,
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
    addSection: build.mutation<ITutorialSection, IAddSectionDto>({
      query: (section) => ({
        url: 'add-section',
        method: 'PUT',
        body: section,
      }),
    }),
    editSection: build.mutation<ITutorialSection, IEditSectionDto>({
      query: (body) => ({
        url: 'edit-section',
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
  useAddSectionMutation: useAddTutorialSectionMutation,
  useEditSectionMutation: useEditTutorialSectionMutation,
  useChangeArticleMutation: useChangeTutorialSelectedArticleMutation,
  usePublishMutation: usePublishTutorialMutation,
  useRemoveArticleMutation: useRemoveTutorialArticleMutation,
  useRemoveSectionMutation,
} = tutorialApi;
