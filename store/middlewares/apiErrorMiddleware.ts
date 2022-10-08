import { AnyAction, isRejectedWithValue, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { blogApi } from 'store/apis';
import { IBlogRegisterResponse } from 'store/apis/blog/blog.types';
import { openLoginModal, unauthenticate } from 'store/states';
import { REFRESH_TOKEN } from 'variables';

export const apiErrorMiddleware: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const status: number = action.payload?.status;
    if (status === 401) {
      const { dispatch, getState } = api;
      const refreshToken = localStorage.getItem(REFRESH_TOKEN);
      if (!refreshToken) {
        dispatch(openLoginModal());
        dispatch(unauthenticate());
        return next(action);
      }
      const state = getState();
      //   console.log('🚀 ~ file: apiErrorMiddleware.ts ~ line 19 ~ state', state);
      const requestUrl = action.meta.baseQueryMeta.request.url as string;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const reducerPath = requestUrl.replace(process.env.NEXT_PUBLIC_BASE_URL!, '').split('/')[1];
      const reducerApi = state[reducerPath];
      const reducerQueries = reducerApi.queries;
      const queryCacheKey = action.meta.arg.queryCacheKey;
      const query = reducerQueries[queryCacheKey];
      console.log('🚀 ~ file: apiErrorMiddleware.ts ~ line 28 ~ blogApi.reducer', blogApi.reducer);
      //   console.log('🚀 ~ file: apiErrorMiddleware.ts ~ line 27 ~ query', query);
      const res = dispatch(
        blogApi.endpoints.getNewToken.initiate(refreshToken) as unknown as AnyAction,
      ) as unknown as Promise<{
        data: IBlogRegisterResponse;
      }>;
    }
  }
  return next(action);
};
