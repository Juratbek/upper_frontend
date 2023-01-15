import { createApi } from '@reduxjs/toolkit/dist/query/react';
import {
  IPagingResponse,
  ITutorial,
  ITutorialMedium,
  ITutorialSection,
  TOptionalPagingRequest,
} from 'types';

import { baseQuery } from '../config';
import { IAddSectionDto, IEditSectionDto } from './tutorials.types';

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
      query: (section) => ({
        url: 'edit-section',
        method: 'PUT',
        body: section,
      }),
    }),
    getAll: build.query<IPagingResponse<ITutorialMedium>, TOptionalPagingRequest>({
      query: () => 'list',
    }),
    getById: build.query<ITutorial, number>({
      query: (id) => id.toString(),
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
} = tutorialApi;
