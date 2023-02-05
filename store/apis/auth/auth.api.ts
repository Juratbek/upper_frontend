import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { IGitHubUser } from 'types';

import { githubBaseQuery } from '../config';
import { TGetAccessTokenByCodeDto } from './auth.types';

export const commentApi = createApi({
  reducerPath: 'login',
  baseQuery: githubBaseQuery('login'),
  endpoints: (build) => ({
    getAcessTokenByCode: build.mutation<IGitHubUser, TGetAccessTokenByCodeDto>({
      query: ({ code }) => ({
        url: `oauth/access_token`,
        method: 'POST',
        params: {
          code,
          client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
          client_secret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET_ID,
        },
      }),
    }),
  }),
});

export const { useGetAcessTokenByCodeMutation } = commentApi;
